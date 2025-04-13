import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoute.js';
import stockRoutes from './routes/stockRoutes.js';
import sensexRoutes from './routes/sensexRoutes.js';
import { errorMiddleware } from './utils/error.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5176'],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/sensex', sensexRoutes);

app.use(errorMiddleware);

// Connect to DB
mongoose.connect(process.env.MONGO, {
}).then(() => {
  console.log("✅ Connected to MongoDB");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Test Route
app.get('/test', (req, res) => {
  res.send('🚀 Test route is working!');
});



// Start Server
app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});