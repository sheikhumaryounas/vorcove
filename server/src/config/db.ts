import mongoose from 'mongoose';

let isConnected = false;
let connectionError: string | null = null;
let activeDatabaseType: 'mongodb' | 'memory-fallback' = 'mongodb';

export const connectDB = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/vorcove';

  try {
    mongoose.set('strictQuery', false);
    
    const formattedUri = mongoUri.replace('localhost', '127.0.0.1');
    const conn = await mongoose.connect(formattedUri, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000,
      family: 4
    });

    isConnected = true;
    connectionError = null;
    activeDatabaseType = 'mongodb';
    console.log(`\x1b[32m[MongoDB]\x1b[0m Connected successfully to: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error: any) {
    isConnected = false;
    connectionError = error?.message || 'Failed to connect to MongoDB';
    activeDatabaseType = 'memory-fallback';
    console.warn(`\x1b[33m[MongoDB Warning]\x1b[0m Could not connect to MongoDB at ${mongoUri}.`);
    console.warn(`\x1b[33m[Storage]\x1b[0m Activating high-resilience in-memory store. All APIs, submissions, and admin features will function seamlessly!`);
  }
};

export const getDbStatus = () => {
  return {
    isConnected,
    readyState: mongoose.connection.readyState,
    readyStateLabel: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown',
    storageMode: activeDatabaseType,
    error: connectionError,
    uri: process.env.MONGODB_URI ? process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@') : 'mongodb://localhost:27017/vorcove'
  };
};

export const isMongoReady = (): boolean => {
  return mongoose.connection.readyState === 1;
};
