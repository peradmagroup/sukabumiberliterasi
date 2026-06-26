"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitComplaint = exports.getLiveComplaints = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const uuid_1 = require("uuid");
const getLiveComplaints = async () => {
    return await db_1.db.select().from(schema_1.complaints).orderBy((0, drizzle_orm_1.desc)(schema_1.complaints.createdAt)).limit(10);
};
exports.getLiveComplaints = getLiveComplaints;
const submitComplaint = async (data, userId) => {
    const newComplaint = await db_1.db.insert(schema_1.complaints).values({
        id: (0, uuid_1.v4)(),
        userId: userId,
        type: data.type,
        message: data.message,
        status: 'Pending'
    }).returning();
    return newComplaint[0];
};
exports.submitComplaint = submitComplaint;
