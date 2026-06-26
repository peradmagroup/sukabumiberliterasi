"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocations = exports.getPartnerById = exports.getPartners = void 0;
const env_1 = require("../config/env");
const sync_1 = require("csv-parse/sync");
const getPartners = async (type) => {
    try {
        if (!env_1.ENV.GOOGLE_SHEET_CSV_URL) {
            return [];
        }
        const response = await fetch(env_1.ENV.GOOGLE_SHEET_CSV_URL);
        if (!response.ok)
            throw new Error('Failed to fetch partners from Google Sheets');
        const csvData = await response.text();
        const records = (0, sync_1.parse)(csvData, { columns: true, skip_empty_lines: true });
        // Map the records to our expected format
        let partners = records.map((record, index) => ({
            id: String(index),
            name: record['Nama Mitra'] || record['Name'] || record['Nama'] || 'Mitra ' + index,
            description: record['Deskripsi'] || record['Description'] || '',
            type: record['Kategori'] || record['Type'] || 'Kolaborator',
            logoUrl: record['Logo URL'] || record['Logo'] || 'https://placehold.co/400x400?text=' + (record['Nama Mitra'] || 'Mitra').substring(0, 2),
            latitude: parseFloat(record['Latitude']) || -6.9200, // default Sukabumi approx
            longitude: parseFloat(record['Longitude']) || 106.9200,
            createdAt: new Date().toISOString()
        }));
        if (type) {
            partners = partners.filter((p) => p.type.toLowerCase() === type.toLowerCase());
        }
        return partners;
    }
    catch (err) {
        console.error("Error fetching Google Sheets for partners:", err);
        return [];
    }
};
exports.getPartners = getPartners;
const getPartnerById = async (id) => {
    const partners = await (0, exports.getPartners)();
    return partners.find((p) => p.id === id);
};
exports.getPartnerById = getPartnerById;
const getLocations = async () => {
    const partners = await (0, exports.getPartners)();
    return partners.map((p) => ({
        id: p.id,
        name: p.name,
        latitude: p.latitude,
        longitude: p.longitude,
        type: p.type
    }));
};
exports.getLocations = getLocations;
