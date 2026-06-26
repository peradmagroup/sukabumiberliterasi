import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/literasi',
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET || 'super-secret',
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  BLOGGER_URL: process.env.BLOGGER_URL || 'https://peradma.blogspot.com',
  GOOGLE_SHEET_CSV_URL: process.env.GOOGLE_SHEET_CSV_URL || 'https://docs.google.com/spreadsheets/d/1zURsbjw4sESU9LMaSWSqWSkjHWSi0pb0_O0OCtZlWfE/export?format=csv'
};
