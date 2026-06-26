import express from 'express';
import cors from 'cors';
import { ENV } from './config/env';
import { auth } from './config/auth';
import { toNodeHandler } from 'better-auth/node';

// Import Routes
import infoRoutes from './routes/info.routes';
import agendaRoutes from './routes/agenda.routes';
import mitraRoutes from './routes/mitra.routes';
import konsulRoutes from './routes/konsul.routes';
import donasiRoutes from './routes/donasi.routes';

export const app = express();

// Middlewares
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle Netlify rewrite path
app.use((req, res, next) => {
  if (req.url.startsWith('/.netlify/functions/api')) {
    req.url = req.url.replace('/.netlify/functions/api', '/api');
  }
  next();
});

// Better Auth Setup
app.all("/api/auth/*", toNodeHandler(auth));

// API Routes
app.use('/api/info', infoRoutes);
app.use('/api/agenda', agendaRoutes);
app.use('/api/mitra', mitraRoutes);
app.use('/api/konsul', konsulRoutes);
app.use('/api/donasi', donasiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Sukabumi Berliterasi API is running' });
});

// Start Server
if (process.env.NETLIFY !== 'true') {
  app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
  });
}
