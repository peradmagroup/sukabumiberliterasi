"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropoffLocations = exports.donationRequests = exports.complaints = exports.partners = exports.events = exports.articles = exports.verifications = exports.accounts = exports.sessions = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// Users (Better Auth)
exports.users = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    emailVerified: (0, pg_core_1.boolean)("emailVerified").notNull(),
    image: (0, pg_core_1.text)("image"),
    role: (0, pg_core_1.varchar)("role", { length: 50 }).default('user'),
    createdAt: (0, pg_core_1.timestamp)("createdAt").notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").notNull()
});
exports.sessions = (0, pg_core_1.pgTable)("session", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    userId: (0, pg_core_1.text)("userId").notNull().references(() => exports.users.id),
    token: (0, pg_core_1.text)("token").notNull().unique(),
    expiresAt: (0, pg_core_1.timestamp)("expiresAt").notNull(),
    ipAddress: (0, pg_core_1.text)("ipAddress"),
    userAgent: (0, pg_core_1.text)("userAgent"),
    createdAt: (0, pg_core_1.timestamp)("createdAt").notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").notNull()
});
exports.accounts = (0, pg_core_1.pgTable)("account", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    userId: (0, pg_core_1.text)("userId").notNull().references(() => exports.users.id),
    accountId: (0, pg_core_1.text)("accountId").notNull(),
    providerId: (0, pg_core_1.text)("providerId").notNull(),
    accessToken: (0, pg_core_1.text)("accessToken"),
    refreshToken: (0, pg_core_1.text)("refreshToken"),
    expiresAt: (0, pg_core_1.timestamp)("expiresAt"),
    password: (0, pg_core_1.text)("password"),
    createdAt: (0, pg_core_1.timestamp)("createdAt").notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").notNull()
});
exports.verifications = (0, pg_core_1.pgTable)("verification", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    identifier: (0, pg_core_1.text)("identifier").notNull(),
    value: (0, pg_core_1.text)("value").notNull(),
    expiresAt: (0, pg_core_1.timestamp)("expiresAt").notNull(),
    createdAt: (0, pg_core_1.timestamp)("createdAt").notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").notNull()
});
// Articles
exports.articles = (0, pg_core_1.pgTable)("article", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    title: (0, pg_core_1.varchar)("title", { length: 255 }).notNull(),
    content: (0, pg_core_1.text)("content").notNull(),
    summary: (0, pg_core_1.text)("summary"),
    type: (0, pg_core_1.varchar)("type", { length: 50 }).notNull(), // 'Utama', 'Terkini'
    category: (0, pg_core_1.varchar)("category", { length: 50 }).notNull(), // 'Tips', 'Komunitas', 'Teknologi', 'Berita'
    imageUrl: (0, pg_core_1.varchar)("imageUrl", { length: 255 }),
    authorId: (0, pg_core_1.text)("authorId").references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow().notNull(),
});
// Events
exports.events = (0, pg_core_1.pgTable)("event", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    title: (0, pg_core_1.varchar)("title", { length: 255 }).notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    category: (0, pg_core_1.varchar)("category", { length: 50 }).notNull(), // 'Kelas Bahasa', 'Kolaborasi', 'Roadshow'
    subCategory: (0, pg_core_1.varchar)("subCategory", { length: 100 }),
    date: (0, pg_core_1.timestamp)("date").notNull(),
    timeInfo: (0, pg_core_1.varchar)("timeInfo", { length: 100 }),
    location: (0, pg_core_1.varchar)("location", { length: 255 }),
    organizerId: (0, pg_core_1.text)("organizerId").references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow().notNull(),
});
// Partners
exports.partners = (0, pg_core_1.pgTable)("partner", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    type: (0, pg_core_1.varchar)("type", { length: 50 }).notNull(), // 'Perpustakaan', 'TBM', 'Komunitas'
    description: (0, pg_core_1.text)("description"),
    address: (0, pg_core_1.text)("address"),
    latitude: (0, pg_core_1.decimal)("latitude"),
    longitude: (0, pg_core_1.decimal)("longitude"),
    rating: (0, pg_core_1.decimal)("rating"),
    imageUrl: (0, pg_core_1.varchar)("imageUrl", { length: 255 }),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow().notNull(),
});
// Complaints
exports.complaints = (0, pg_core_1.pgTable)("complaint", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    userId: (0, pg_core_1.text)("userId").references(() => exports.users.id),
    type: (0, pg_core_1.varchar)("type", { length: 100 }).notNull(), // 'Aduan Fasilitas', 'Konsultasi Buku', etc
    message: (0, pg_core_1.text)("message").notNull(),
    status: (0, pg_core_1.varchar)("status", { length: 50 }).default('Pending').notNull(), // 'Pending', 'Resolved'
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow().notNull(),
});
// Donations
exports.donationRequests = (0, pg_core_1.pgTable)("donation_request", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    userId: (0, pg_core_1.text)("userId").references(() => exports.users.id),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    whatsapp: (0, pg_core_1.varchar)("whatsapp", { length: 20 }).notNull(),
    bookCount: (0, pg_core_1.integer)("bookCount").notNull(),
    address: (0, pg_core_1.text)("address").notNull(),
    status: (0, pg_core_1.varchar)("status", { length: 50 }).default('Pending').notNull(), // 'Pending', 'Scheduled', 'Completed'
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow().notNull(),
});
exports.dropoffLocations = (0, pg_core_1.pgTable)("dropoff_location", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    address: (0, pg_core_1.text)("address").notNull(),
    operationalHours: (0, pg_core_1.varchar)("operationalHours", { length: 255 }),
    imageUrl: (0, pg_core_1.varchar)("imageUrl", { length: 255 }),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow().notNull(),
});
