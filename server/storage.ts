import {
  type User,
  type UpsertUser,
  type Product,
  type InsertProduct,
  type Booking,
  type InsertBooking,
  type Waiver,
  type InsertWaiver,
  type InsertUser,
} from "@shared/schema";
import { connectToMongoDB } from "./mongodb";
import { ObjectId } from "mongodb";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  setPasswordResetToken(email: string, token: string, expiry: Date): Promise<void>;
  getUserByResetToken(token: string): Promise<User | undefined>;
  clearPasswordResetToken(userId: string): Promise<void>;
  updatePassword(userId: string, newPassword: string): Promise<void>;
  
  // Product operations
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  
  // Booking operations
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingsByUser(userId: string): Promise<Booking[]>;
  getAllBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  updateBooking(id: string, booking: Partial<InsertBooking>): Promise<Booking>;
  getBookingsByProduct(productId: string, startDate: string, endDate: string): Promise<Booking[]>;
  
  // Waiver operations
  createWaiver(waiver: InsertWaiver): Promise<Waiver>;
  getWaiverByUser(userId: string): Promise<Waiver | undefined>;
}

export class MongoStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const db = await connectToMongoDB();
    const user = await db.collection('users').findOne({ id });
    return user ? this.mapMongoUser(user) : undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const db = await connectToMongoDB();
    const user = await db.collection('users').findOne({ email });
    return user ? this.mapMongoUser(user) : undefined;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const db = await connectToMongoDB();
    const now = new Date();
    const newUser = {
      id: new ObjectId().toString(),
      ...userData,
      waiverSigned: false,
      isAdmin: false,
      createdAt: now,
      updatedAt: now
    };
    
    await db.collection('users').insertOne(newUser);
    return this.mapMongoUser(newUser);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const db = await connectToMongoDB();
    const now = new Date();
    
    const result = await db.collection('users').findOneAndUpdate(
      { id: userData.id },
      { 
        $set: { ...userData, updatedAt: now },
        $setOnInsert: { createdAt: now }
      },
      { upsert: true, returnDocument: 'after' }
    );
    
    return this.mapMongoUser(result!);
  }

  // Product operations
  async getAllProducts(): Promise<Product[]> {
    const db = await connectToMongoDB();
    const products = await db.collection('products')
      .find({ available: { $ne: false } })
      .sort({ createdAt: -1 })
      .toArray();
    
    return products.map(this.mapMongoProduct);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const db = await connectToMongoDB();
    const product = await db.collection('products').findOne({ id });
    return product ? this.mapMongoProduct(product) : undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const db = await connectToMongoDB();
    const now = new Date();
    const newProduct = {
      id: new ObjectId().toString(),
      ...product,
      available: true,
      createdAt: now,
      updatedAt: now
    };
    
    await db.collection('products').insertOne(newProduct);
    return this.mapMongoProduct(newProduct);
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product> {
    const db = await connectToMongoDB();
    const result = await db.collection('products').findOneAndUpdate(
      { id },
      { $set: { ...product, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    
    if (!result) throw new Error('Product not found');
    return this.mapMongoProduct(result);
  }

  async deleteProduct(id: string): Promise<void> {
    const db = await connectToMongoDB();
    await db.collection('products').updateOne(
      { id },
      { $set: { available: false } }
    );
  }

  // Booking operations
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const db = await connectToMongoDB();
    const now = new Date();
    const newBooking = {
      id: new ObjectId().toString(),
      ...booking,
      createdAt: now,
      updatedAt: now
    };
    
    await db.collection('bookings').insertOne(newBooking);
    return this.mapMongoBooking(newBooking);
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    const db = await connectToMongoDB();
    const bookings = await db.collection('bookings')
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();
    
    return bookings.map(this.mapMongoBooking);
  }

  async getAllBookings(): Promise<Booking[]> {
    const db = await connectToMongoDB();
    const bookings = await db.collection('bookings')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return bookings.map(this.mapMongoBooking);
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    const db = await connectToMongoDB();
    const booking = await db.collection('bookings').findOne({ id });
    return booking ? this.mapMongoBooking(booking) : undefined;
  }

  async updateBooking(id: string, booking: Partial<InsertBooking>): Promise<Booking> {
    const db = await connectToMongoDB();
    const result = await db.collection('bookings').findOneAndUpdate(
      { id },
      { $set: { ...booking, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    
    if (!result) throw new Error('Booking not found');
    return this.mapMongoBooking(result);
  }

  async getBookingsByProduct(productId: string, startDate: string, endDate: string): Promise<Booking[]> {
    const db = await connectToMongoDB();
    const bookings = await db.collection('bookings').find({
      productId,
      $or: [
        { endDate: { $gte: startDate } },
        { startDate: { $lte: endDate } }
      ]
    }).toArray();
    
    return bookings.map(this.mapMongoBooking);
  }

  // Waiver operations
  async createWaiver(waiver: InsertWaiver): Promise<Waiver> {
    const db = await connectToMongoDB();
    const newWaiver = {
      id: new ObjectId().toString(),
      ...waiver,
      signedAt: new Date()
    };
    
    await db.collection('waivers').insertOne(newWaiver);
    
    // Update user's waiver status
    await db.collection('users').updateOne(
      { id: waiver.userId },
      { $set: { waiverSigned: true } }
    );
    
    return this.mapMongoWaiver(newWaiver);
  }

  async getWaiverByUser(userId: string): Promise<Waiver | undefined> {
    const db = await connectToMongoDB();
    const waiver = await db.collection('waivers').findOne({ userId });
    return waiver ? this.mapMongoWaiver(waiver) : undefined;
  }

  // Password reset operations
  async setPasswordResetToken(email: string, token: string, expiry: Date): Promise<void> {
    const db = await connectToMongoDB();
    await db.collection('users').updateOne(
      { email },
      { 
        $set: { 
          resetToken: token,
          resetTokenExpiry: expiry,
          updatedAt: new Date()
        }
      }
    );
  }

  async getUserByResetToken(token: string): Promise<User | undefined> {
    const db = await connectToMongoDB();
    const user = await db.collection('users').findOne({ 
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }
    });
    return user ? this.mapMongoUser(user) : undefined;
  }

  async clearPasswordResetToken(userId: string): Promise<void> {
    const db = await connectToMongoDB();
    await db.collection('users').updateOne(
      { id: userId },
      { 
        $unset: { 
          resetToken: "",
          resetTokenExpiry: ""
        },
        $set: {
          updatedAt: new Date()
        }
      }
    );
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    const db = await connectToMongoDB();
    await db.collection('users').updateOne(
      { id: userId },
      { 
        $set: { 
          password: newPassword,
          updatedAt: new Date()
        }
      }
    );
  }

  // Helper methods to map MongoDB documents to TypeScript types
  private mapMongoUser(doc: any): User {
    return {
      id: doc.id,
      email: doc.email,
      password: doc.password,
      firstName: doc.firstName,
      lastName: doc.lastName,
      profileImageUrl: doc.profileImageUrl,
      waiverSigned: doc.waiverSigned || false,
      isAdmin: doc.isAdmin || false,
      resetToken: doc.resetToken || null,
      resetTokenExpiry: doc.resetTokenExpiry || null,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }

  private mapMongoProduct(doc: any): Product {
    return {
      id: doc.id,
      name: doc.name,
      description: doc.description,
      category: doc.category,
      dailyRate: doc.dailyRate,
      securityDeposit: doc.securityDeposit,
      specifications: doc.specifications,
      compatibleCars: doc.compatibleCars,
      images: doc.images,
      available: doc.available !== false,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }

  private mapMongoBooking(doc: any): Booking {
    return {
      id: doc.id,
      userId: doc.userId,
      productId: doc.productId,
      startDate: doc.startDate,
      endDate: doc.endDate,
      totalCost: doc.totalCost,
      deliveryOption: doc.deliveryOption,
      deliveryFee: doc.deliveryFee,
      status: doc.status,
      paymentStatus: doc.paymentStatus,
      notes: doc.notes,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }

  private mapMongoWaiver(doc: any): Waiver {
    return {
      id: doc.id,
      userId: doc.userId,
      ipAddress: doc.ipAddress,
      signedAt: doc.signedAt,
      waiverContent: doc.waiverContent
    };
  }
}

export const storage = new MongoStorage();
