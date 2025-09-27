import bcrypt from "bcryptjs";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import MongoStore from "connect-mongodb-session";
import crypto from "crypto";
import { storage } from "./storage";
import { sendPasswordResetEmail, sendWelcomeEmail } from "./email";

// Simple in-memory rate limiter for forgot password
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_ATTEMPTS = 3; // Max 3 attempts per 15 minutes

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);
  
  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    // Reset or create new record
    rateLimitMap.set(identifier, { count: 1, lastReset: now });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX_ATTEMPTS) {
    return false; // Rate limit exceeded
  }
  
  record.count++;
  return true;
}

// Function to invalidate all sessions for a user from MongoDB session store
async function invalidateAllUserSessions(userId: string): Promise<void> {
  try {
    const { MongoClient } = await import('mongodb');
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    
    const db = client.db();
    const sessionsCollection = db.collection('sessions');
    
    // Delete all sessions that contain this userId in their session data
    const result = await sessionsCollection.deleteMany({
      'session.userId': userId
    });
    
    console.log(`Invalidated ${result.deletedCount} sessions for user:`, userId);
    
    await client.close();
  } catch (error) {
    console.error('Failed to invalidate user sessions:', error);
    // Don't throw error as this shouldn't fail the password reset
  }
}

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const mongoStore = MongoStore(session);
  const sessionStore = new mongoStore({
    uri: process.env.MONGODB_URI!,
    collection: 'sessions',
    expires: sessionTtl,
  });
  return session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-here',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: sessionTtl,
    },
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());

  // Register endpoint
  app.post("/api/register", async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const newUser = await storage.createUser({
        email,
        password: hashedPassword,
        firstName: firstName || '',
        lastName: lastName || '',
      });

      // Set session
      req.session.userId = newUser.id;

      // Send welcome email
      try {
        await sendWelcomeEmail(email, firstName || 'there');
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
        // Don't fail registration if email fails
      }

      // Return user without password
      const { password: _, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Login endpoint
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Set session
      req.session.userId = user.id;

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Logout endpoint
  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      res.clearCookie('connect.sid');
      res.json({ message: "Logged out successfully" });
    });
  });

  // Get current user endpoint
  app.get("/api/auth/user", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Password reset request endpoint
  app.post("/api/auth/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      // Rate limiting: check both IP and email to prevent abuse
      const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
      const rateLimitKey = `${clientIp}:${email}`;
      
      if (!checkRateLimit(rateLimitKey)) {
        return res.status(429).json({ 
          message: "Too many password reset attempts. Please try again in 15 minutes." 
        });
      }

      // Check if user exists
      const user = await storage.getUserByEmail(email);
      if (!user) {
        // Don't reveal if user exists or not for security
        return res.json({ message: "If an account with that email exists, you will receive a password reset link." });
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const tokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now
      
      // Hash the token before storing (for security in case of DB leak)
      const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

      // Save hashed token to database
      await storage.setPasswordResetToken(email, hashedToken, tokenExpiry);

      // Send reset email using Brevo
      try {
        // Use trusted environment variable for base URL to prevent Host header poisoning
        const baseUrl = process.env.PUBLIC_BASE_URL || process.env.BASE_URL || 
          (process.env.NODE_ENV === 'production' ? 'https://peakgearto-website.onrender.com' : 'http://localhost:5000');
        const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;
        
        await sendPasswordResetEmail(email, resetUrl);
        console.log('Password reset email sent to:', email);
      } catch (emailError) {
        console.error("Failed to send reset email:", emailError);
        // Continue without failing the request for better UX
      }

      res.json({ message: "If an account with that email exists, you will receive a password reset link." });
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Password reset verification endpoint
  app.post("/api/auth/reset-password", async (req, res) => {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({ message: "Token and new password are required" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
      }

      // Hash the provided token to compare with stored hash
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
      
      // Find user by valid hashed token
      const user = await storage.getUserByResetToken(hashedToken);
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired reset token" });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      // Update password and clear reset token
      await storage.updatePassword(user.id, hashedPassword);
      await storage.clearPasswordResetToken(user.id);

      // Invalidate all existing sessions for this user for security
      try {
        // Clear current session if this request has one
        if (req.session.userId === user.id) {
          req.session.destroy(() => {});
        }
        
        // Invalidate all sessions for this user from the MongoDB session store
        await invalidateAllUserSessions(user.id);
        console.log('All sessions invalidated for user after password reset:', user.id);
      } catch (sessionError) {
        console.error('Failed to invalidate sessions:', sessionError);
        // Don't fail the password reset if session clearing fails
      }

      res.json({ message: "Password has been reset successfully" });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to request object (without password)
    const { password: _, ...userWithoutPassword } = user;
    req.user = userWithoutPassword as any;
    next();
  } catch (error) {
    console.error("Authentication middleware error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const isAdmin: RequestHandler = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    // Attach user to request object (without password)
    const { password: _, ...userWithoutPassword } = user;
    req.user = userWithoutPassword as any;
    next();
  } catch (error) {
    console.error("Admin authentication middleware error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Extend session interface
declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}