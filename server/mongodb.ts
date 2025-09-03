import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error(
    "MONGODB_URI must be set. Did you forget to add your MongoDB connection string?",
  );
}

const client = new MongoClient(process.env.MONGODB_URI);

let db: Db;

export async function connectToMongoDB(): Promise<Db> {
  if (!db) {
    await client.connect();
    // Extract database name from connection string or use default
    const dbName = process.env.MONGODB_URI!.split('/')[3]?.split('?')[0] || 'peakgear';
    db = client.db(dbName);
    console.log(`Connected to MongoDB database: ${dbName}`);
  }
  return db;
}

export { db };