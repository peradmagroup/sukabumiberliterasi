"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArticle = exports.getArticleById = exports.getArticles = void 0;
const env_1 = require("../config/env");
const getArticles = async (type, category) => {
    try {
        const url = `${env_1.ENV.BLOGGER_URL}/feeds/posts/default?alt=json`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch from blogger');
        }
        const data = await response.json();
        // Parse Blogger JSON
        const entries = data.feed.entry || [];
        const articles = entries.map((entry, index) => {
            // Find thumbnail
            const content = entry.content ? entry.content.$t : (entry.summary ? entry.summary.$t : '');
            const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
            const imageUrl = imgMatch ? imgMatch[1] : 'https://placehold.co/600x400?text=No+Image';
            let cat = 'Berita';
            if (entry.category && entry.category.length > 0) {
                cat = entry.category[0].term;
            }
            let articleType = index === 0 ? 'Utama' : 'Biasa';
            const link = entry.link?.find((l) => l.rel === 'alternate')?.href || '#';
            return {
                id: entry.id.$t,
                title: entry.title.$t,
                content: content,
                summary: content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...',
                type: articleType,
                category: cat,
                imageUrl: imageUrl,
                createdAt: entry.published.$t,
                authorId: entry.author[0]?.name?.$t || 'Blogger',
                link: link
            };
        });
        return articles;
    }
    catch (error) {
        console.error('Error fetching blogger posts:', error);
        return [];
    }
};
exports.getArticles = getArticles;
const getArticleById = async (id) => {
    const articles = await (0, exports.getArticles)();
    return articles.find((a) => a.id === id);
};
exports.getArticleById = getArticleById;
const createArticle = async (data) => {
    throw new Error("Cannot create article directly; post in Blogger instead.");
};
exports.createArticle = createArticle;
