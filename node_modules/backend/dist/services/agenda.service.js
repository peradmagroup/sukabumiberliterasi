"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = exports.getEvents = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const uuid_1 = require("uuid");
const getEvents = async (category) => {
    return await db_1.db.select().from(schema_1.events).orderBy((0, drizzle_orm_1.desc)(schema_1.events.date));
};
exports.getEvents = getEvents;
const createEvent = async (data) => {
    const newEvent = await db_1.db.insert(schema_1.events).values({
        id: (0, uuid_1.v4)(),
        title: data.title,
        description: data.description,
        category: data.category,
        subCategory: data.subCategory,
        date: new Date(data.date),
        timeInfo: data.timeInfo,
        location: data.location,
        organizerId: data.organizerId
    }).returning();
    return newEvent[0];
};
exports.createEvent = createEvent;
