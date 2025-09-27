import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated, isAdmin } from "./auth";
import { insertProductSchema, insertBookingSchema, insertWaiverSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // User endpoint is now handled in auth.ts

  // Product routes
  app.get('/api/products', async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get('/api/products/:id', async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get('/api/admin/products', isAdmin, async (req, res) => {
    try {
      const products = await storage.getAllProductsAdmin();
      res.json(products);
    } catch (error) {
      console.error("Error fetching admin products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.post('/api/products', isAdmin, async (req: any, res) => {
    try {
      const validatedProduct = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedProduct);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(400).json({ message: "Invalid product data" });
    }
  });

  app.put('/api/products/:id', isAdmin, async (req: any, res) => {
    try {
      const updates = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(req.params.id, updates);
      res.json(product);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(400).json({ message: "Failed to update product" });
    }
  });

  app.delete('/api/products/:id', isAdmin, async (req: any, res) => {
    try {
      await storage.deleteProduct(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Booking routes
  app.post('/api/bookings', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const bookingData = { ...req.body, userId };
      const validatedBooking = insertBookingSchema.parse(bookingData);
      
      // Check for booking conflicts
      const conflictingBookings = await storage.getBookingsByProduct(
        validatedBooking.productId,
        validatedBooking.startDate,
        validatedBooking.endDate
      );
      
      if (conflictingBookings.length > 0) {
        return res.status(409).json({ message: "Product not available for selected dates" });
      }
      
      const booking = await storage.createBooking(validatedBooking);
      res.status(201).json(booking);
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(400).json({ message: "Invalid booking data" });
    }
  });

  app.get('/api/bookings', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const bookings = await storage.getBookingsByUser(userId);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.get('/api/admin/bookings', isAdmin, async (req: any, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching all bookings:", error);
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.put('/api/bookings/:id', isAuthenticated, async (req: any, res) => {
    try {
      const updates = insertBookingSchema.partial().parse(req.body);
      const booking = await storage.updateBooking(req.params.id, updates);
      res.json(booking);
    } catch (error) {
      console.error("Error updating booking:", error);
      res.status(400).json({ message: "Failed to update booking" });
    }
  });

  // Check product availability
  app.get('/api/products/:id/availability', async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      if (!startDate || !endDate) {
        return res.status(400).json({ message: "Start date and end date are required" });
      }
      
      const bookings = await storage.getBookingsByProduct(
        req.params.id,
        startDate as string,
        endDate as string
      );
      
      res.json({ available: bookings.length === 0 });
    } catch (error) {
      console.error("Error checking availability:", error);
      res.status(500).json({ message: "Failed to check availability" });
    }
  });


  // Waiver routes
  app.post('/api/waivers', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const waiverData = { 
        ...req.body, 
        userId,
        ipAddress: req.ip 
      };
      const validatedWaiver = insertWaiverSchema.parse(waiverData);
      const waiver = await storage.createWaiver(validatedWaiver);
      res.status(201).json(waiver);
    } catch (error) {
      console.error("Error creating waiver:", error);
      res.status(400).json({ message: "Invalid waiver data" });
    }
  });

  app.get('/api/waivers/check', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const waiver = await storage.getWaiverByUser(userId);
      res.json({ signed: !!waiver });
    } catch (error) {
      console.error("Error checking waiver:", error);
      res.status(500).json({ message: "Failed to check waiver status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
