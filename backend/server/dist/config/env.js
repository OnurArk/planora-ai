"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getEnv(name, fallback) {
    const value = process.env[name] ?? fallback;
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
}
function getOptionalEnv(name) {
    const value = process.env[name];
    if (!value)
        return undefined;
    return value;
}
const authStorage = (process.env.AUTH_STORAGE ?? "file");
const mongoUri = getOptionalEnv("MONGODB_URI");
if (authStorage === "mongo" && !mongoUri) {
    throw new Error("MONGODB_URI is required when AUTH_STORAGE=mongo");
}
exports.env = {
    port: Number(getEnv("PORT", "4000")),
    authStorage,
    mongoUri,
    fileAuthPath: getEnv("FILE_AUTH_PATH", "data/users.json"),
    jwtSecret: getEnv("JWT_SECRET"),
    jwtExpiresIn: getEnv("JWT_EXPIRES_IN", "7d"),
    corsOrigin: getEnv("CORS_ORIGIN", "http://localhost:3000"),
};
//# sourceMappingURL=env.js.map