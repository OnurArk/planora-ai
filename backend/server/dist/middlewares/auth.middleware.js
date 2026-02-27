"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const api_error_1 = require("../utils/api-error");
function requireAuth(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new api_error_1.ApiError(401, "Unauthorized"));
    }
    const token = authHeader.replace("Bearer ", "").trim();
    try {
        const payload = jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
        req.userId = payload.userId;
        return next();
    }
    catch {
        return next(new api_error_1.ApiError(401, "Invalid token"));
    }
}
//# sourceMappingURL=auth.middleware.js.map