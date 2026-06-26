"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocations = exports.getPartnerById = exports.getPartners = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const getPartners = async (type) => {
    return await db_1.db.select().from(schema_1.partners).orderBy((0, drizzle_orm_1.desc)(schema_1.partners.createdAt));
};
exports.getPartners = getPartners;
const getPartnerById = async (id) => {
    const result = await db_1.db.select().from(schema_1.partners).where((0, drizzle_orm_1.eq)(schema_1.partners.id, id));
    return result[0];
};
exports.getPartnerById = getPartnerById;
const getLocations = async () => {
    return await db_1.db.select({
        id: schema_1.partners.id,
        name: schema_1.partners.name,
        latitude: schema_1.partners.latitude,
        longitude: schema_1.partners.longitude,
        type: schema_1.partners.type
    }).from(schema_1.partners);
};
exports.getLocations = getLocations;
