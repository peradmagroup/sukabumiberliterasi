import { pgTable, text, timestamp, varchar, integer, decimal, boolean } from "drizzle-orm/pg-core";

// Users (Better Auth)
export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  role: varchar("role", { length: 50 }).default('user'),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull()
});

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull().references(() => users.id),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull()
});

export const accounts = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull().references(() => users.id),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  expiresAt: timestamp("expiresAt"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull()
});

export const verifications = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull()
});

// Articles
export const articles = pgTable("article", {
  id: text("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  summary: text("summary"),
  type: varchar("type", { length: 50 }).notNull(), // 'Utama', 'Terkini'
  category: varchar("category", { length: 50 }).notNull(), // 'Tips', 'Komunitas', 'Teknologi', 'Berita'
  imageUrl: varchar("imageUrl", { length: 255 }),
  authorId: text("authorId").references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Events
export const events = pgTable("event", {
  id: text("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 50 }).notNull(), // 'Kelas Bahasa', 'Kolaborasi', 'Roadshow'
  subCategory: varchar("subCategory", { length: 100 }), 
  date: timestamp("date").notNull(),
  timeInfo: varchar("timeInfo", { length: 100 }),
  location: varchar("location", { length: 255 }),
  organizerId: text("organizerId").references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Partners
export const partners = pgTable("partner", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // 'Perpustakaan', 'TBM', 'Komunitas'
  description: text("description"),
  address: text("address"),
  latitude: decimal("latitude"),
  longitude: decimal("longitude"),
  rating: decimal("rating"),
  imageUrl: varchar("imageUrl", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Complaints
export const complaints = pgTable("complaint", {
  id: text("id").primaryKey(),
  userId: text("userId").references(() => users.id),
  type: varchar("type", { length: 100 }).notNull(), // 'Aduan Fasilitas', 'Konsultasi Buku', etc
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).default('Pending').notNull(), // 'Pending', 'Resolved'
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Donations
export const donationRequests = pgTable("donation_request", {
  id: text("id").primaryKey(),
  userId: text("userId").references(() => users.id),
  name: varchar("name", { length: 255 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 20 }).notNull(),
  bookCount: integer("bookCount").notNull(),
  address: text("address").notNull(),
  status: varchar("status", { length: 50 }).default('Pending').notNull(), // 'Pending', 'Scheduled', 'Completed'
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const dropoffLocations = pgTable("dropoff_location", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  address: text("address").notNull(),
  operationalHours: varchar("operationalHours", { length: 255 }),
  imageUrl: varchar("imageUrl", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
