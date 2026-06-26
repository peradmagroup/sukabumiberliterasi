"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)({
    origin: env_1.ENV.BETTER_AUTH_URL,
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Better Auth Setup
app.all("/api/auth/*", (0, node_1.toNodeHandler)(auth_1.auth));
// API Routes
app.use('/api/info', info_routes_1.default);
app.use('/api/agenda', agenda_routes_1.default);
app.use('/api/mitra', mitra_routes_1.default);
app.use('/api/konsul', konsul_routes_1.default);
app.use('/api/donasi', donasi_routes_1.default);
// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Sukabumi Berliterasi API is running' });
});
// Start Server
app.listen(env_1.ENV.PORT, () => {
    console.log(`Server is running on port ${env_1.ENV.PORT}`);
});
