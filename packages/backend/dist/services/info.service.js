"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArticle = exports.getArticleById = exports.getArticles = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const uuid_1 = require("uuid");
const getArticles = async (type, category) => {
    let query = db_1.db.select().from(schema_1.articles).orderBy((0, drizzle_orm_1.desc)(schema_1.articles.createdAt));
    // Note: in a real app, you would apply dynamic filters based on type and category
    // For simplicity, we just return all articles here
    return await query;
};
exports.getArticles = getArticles;
const getArticleById = async (id) => {
    const result = await db_1.db.select().from(schema_1.articles).where((0, drizzle_orm_1.eq)(schema_1.articles.id, id));
    return result[0];
};
exports.getArticleById = getArticleById;
const createArticle = async (data) => {
    const newArticle = await db_1.db.insert(schema_1.articles).values({
        id: (0, uuid_1.v4)(),
        title: data.title,
        content: data.content,
        summary: data.summary,
        type: data.type,
        category: data.category,
        imageUrl: data.imageUrl,
        authorId: data.authorId
    }).returning();
    return newArticle[0];
};
exports.createArticle = createArticle;
