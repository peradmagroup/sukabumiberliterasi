"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
const auth_1 = require("./config/auth");
const node_1 = require("better-auth/node");
// Import Routes
const info_routes_1 = __importDefault(require("./routes/info.routes"));
const agenda_routes_1 = __importDefault(require("./routes/agenda.routes"));
const mitra_routes_1 = __importDefault(require("./routes/mitra.routes"));
const konsul_routes_1 = __importDefault(require("./routes/konsul.routes"));
const donasi_routes_1 = __importDefault(require("./routes/donasi.routes"));
exports.app = (0, express_1.default)();
// Middlewares
exports.app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
// Handle Netlify rewrite path
exports.app.use((req, res, next) => {
    if (req.url.startsWith('/.netlify/functions/api')) {
        req.url = req.url.replace('/.netlify/functions/api', '/api');
    }
    next();
});
// Better Auth Setup
exports.app.all("/api/auth/*", (0, node_1.toNodeHandler)(auth_1.auth));
// API Routes
exports.app.use('/api/info', info_routes_1.default);
exports.app.use('/api/agenda', agenda_routes_1.default);
exports.app.use('/api/mitra', mitra_routes_1.default);
exports.app.use('/api/konsul', konsul_routes_1.default);
exports.app.use('/api/donasi', donasi_routes_1.default);
// Health check
exports.app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Sukabumi Berliterasi API is running' });
});
// Start Server
if (process.env.NETLIFY !== 'true') {
    exports.app.listen(env_1.ENV.PORT, () => {
        console.log(`Server is running on port ${env_1.ENV.PORT}`);
    });
}
