import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db';
import { seedDatabase } from './seed';
import routes from './routes';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.CORS_ORIGIN
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Custom request logger
app.use(requestLogger);

// Mount API routes
app.use('/api', routes);

// Serve static assets in production if built
const clientDistPath = path.resolve(__dirname, '../../dist');
app.use(express.static(clientDistPath));

// Fallback for SPA routing in production
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) {
      // If frontend dist is not built yet, return informative API index
      res.json({
        service: 'Vorcove MERN Backend API Server',
        status: 'online',
        endpoints: {
          health: '/api/health',
          contact: '/api/contact',
          roi: '/api/roi',
          assistant: '/api/assistant',
          demos: '/api/demos',
          caseStudies: '/api/case-studies',
          testimonials: '/api/testimonials',
          auth: '/api/auth',
          admin: '/api/admin'
        }
      });
    }
  });
});

// Centralized error handler
app.use(errorHandler);

// Bootstrap server
const startServer = async () => {
  try {
    console.log('\n========================================');
    console.log('   VORCOVE MERN BACKEND SERVER STARTUP   ');
    console.log('========================================\n');

    // Initialize Database & Seed data
    await connectDB();
    await seedDatabase();

    const server = app.listen(PORT, () => {
      console.log(`\n\x1b[32m[Vorcove Server]\x1b[0m Running on \x1b[1mhttp://localhost:${PORT}\x1b[0m`);
      console.log(`\x1b[36m[API Health]\x1b[0m   http://localhost:${PORT}/api/health`);
      console.log(`\x1b[35m[Admin User]\x1b[0m   ${process.env.ADMIN_DEFAULT_EMAIL || 'admin@vorcove.com'}`);
      console.log('========================================\n');
    });

    // Handle termination signals
    const handleShutdown = () => {
      console.log('\n[Vorcove Server] Shutting down gracefully...');
      server.close(() => {
        console.log('[Vorcove Server] Closed remaining connections.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', handleShutdown);
    process.on('SIGINT', handleShutdown);
  } catch (error) {
    console.error('[Vorcove Server Error] Failed to start:', error);
    process.exit(1);
  }
};

startServer();

export default app;
