"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPickupRequest = exports.getDropoffLocations = exports.getStats = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const uuid_1 = require("uuid");
const getStats = async () => {
    // Mock aggregation for now
    return {
        bukuTerkumpul: 1250,
        tamanBaca: 15,
        donaturAktif: 85,
        perpustakaan: 33
    };
};
exports.getStats = getStats;
const getDropoffLocations = async () => {
    return await db_1.db.select().from(schema_1.dropoffLocations).orderBy((0, drizzle_orm_1.desc)(schema_1.dropoffLocations.createdAt));
};
exports.getDropoffLocations = getDropoffLocations;
const createPickupRequest = async (data, userId) => {
    const newRequest = await db_1.db.insert(schema_1.donationRequests).values({
        id: (0, uuid_1.v4)(),
        userId: userId,
        name: data.name,
        whatsapp: data.whatsapp,
        bookCount: parseInt(data.bookCount),
        address: data.address,
        status: 'Pending'
    }).returning();
    return newRequest[0];
};
exports.createPickupRequest = createPickupRequest;
