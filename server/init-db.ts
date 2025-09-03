import { connectToMongoDB } from './mongodb';

export async function initializeDatabase() {
  try {
    const db = await connectToMongoDB();
    
    // Check if products collection exists and has data
    const productsCount = await db.collection('products').countDocuments();
    
    if (productsCount === 0) {
      console.log('Initializing MongoDB with sample products...');
      
      const sampleProducts = [
        {
          id: "43ba1d60-f186-436b-8d54-9a0815835d59",
          name: "Thule Motion XT XXL",
          description: "Extra-large cargo box perfect for long adventures. Aerodynamic design reduces wind noise and fuel consumption.",
          category: "cargo_box",
          dailyRate: "45.00",
          securityDeposit: "300.00",
          specifications: {
            dimensions: "175 x 82 x 46 cm",
            weight_capacity: "75 kg",
            capacity: "610 liters"
          },
          compatibleCars: ["SUV", "Large Sedan", "Wagon", "Crossover"],
          images: [
            "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
          ],
          available: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "f7c8d2a1-8b5e-4321-9876-5432109876ab",
          name: "Yakima SkyBox 18",
          description: "Premium rooftop cargo box with dual-side opening for easy access. Weather-resistant construction.",
          category: "cargo_box",
          dailyRate: "40.00",
          securityDeposit: "250.00",
          specifications: {
            dimensions: "158 x 84 x 46 cm",
            weight_capacity: "70 kg",
            capacity: "540 liters"
          },
          compatibleCars: ["Sedan", "SUV", "Hatchback", "Wagon"],
          images: [
            "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
          ],
          available: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "e9b7f3c2-1a4d-5678-9012-345678901234",
          name: "Thule T2 Pro XT 2-Bike",
          description: "Platform-style hitch bike rack for 2 bikes. Tool-free installation with integrated cable lock.",
          category: "bike_carrier",
          dailyRate: "35.00",
          securityDeposit: "200.00",
          specifications: {
            dimensions: "132 x 33 x 61 cm",
            weight_capacity: "27 kg per bike",
            capacity: "2 bikes"
          },
          compatibleCars: ["Any vehicle with hitch receiver"],
          images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
          ],
          available: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "a5d9c8e7-6f2b-3456-7890-123456789012",
          name: "Kuat NV 2.0 Base",
          description: "Heavy-duty 2-bike hitch rack with adjustable wheel holders. Premium build quality with lifetime warranty.",
          category: "bike_carrier",
          dailyRate: "42.00",
          securityDeposit: "275.00",
          specifications: {
            dimensions: "130 x 30 x 65 cm",
            weight_capacity: "27 kg per bike",
            capacity: "2 bikes"
          },
          compatibleCars: ["Vehicles with 1.25 or 2 inch hitch"],
          images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
          ],
          available: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      await db.collection('products').insertMany(sampleProducts);
      console.log(`Inserted ${sampleProducts.length} sample products into MongoDB`);
    } else {
      console.log(`MongoDB products collection already contains ${productsCount} products`);
    }
    
    // Create indexes for better performance
    await db.collection('products').createIndex({ available: 1 });
    await db.collection('products').createIndex({ category: 1 });
    await db.collection('users').createIndex({ id: 1 }, { unique: true });
    await db.collection('bookings').createIndex({ userId: 1 });
    await db.collection('bookings').createIndex({ productId: 1 });
    await db.collection('waivers').createIndex({ userId: 1 });
    
    console.log('MongoDB indexes created successfully');
    
  } catch (error) {
    console.error('Error initializing MongoDB:', error);
    throw error;
  }
}