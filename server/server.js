import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import noteRouter from './routes/noteRoutes.js';
import passport from 'passport';
import { googleCallback } from "./controllers/authController.js";
import "./config/strategies/google_login.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

// Dynamic allowed origins - supports both development and production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.FRONTEND_URL
].filter(Boolean); // Remove undefined values

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//  Production-ready CORS configuration
app.use(cors({   
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman, curl)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('CORS blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
}));

// Passport initialize
app.use(passport.initialize());

// ---------------- GOOGLE AUTH ROUTES ----------------
app.get(
  "/auth/google",
  passport.authenticate("google", { 
    scope: ["profile", "email"], 
    prompt: "select_account" 
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { 
    session: false, 
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login`
  }),
  googleCallback
);

// ---------------- API ENDPOINTS ----------------
app.get('/', (req, res) => res.send("API Working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/notes', noteRouter);


// 404 handler - must be after all routes
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    success: false, 
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong' 
      : err.message 
  });
});

app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
  console.log(`Mode: ${process.env.NODE_ENV || 'development'}`);
});