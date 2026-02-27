"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.login = login;
exports.getCurrentUser = getCurrentUser;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const api_error_1 = require("../../utils/api-error");
const auth_store_1 = require("./auth.store");
function toPublicUser(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
    };
}
function createToken(userId) {
    const options = {
        expiresIn: env_1.env.jwtExpiresIn,
    };
    return jsonwebtoken_1.default.sign({ userId }, env_1.env.jwtSecret, options);
}
async function signup(input) {
    const userStore = (0, auth_store_1.getUserStore)();
    const normalizedEmail = input.email.toLowerCase();
    const existingUser = await userStore.findByEmail(normalizedEmail);
    if (existingUser) {
        throw new api_error_1.ApiError(409, "Email already in use");
    }
    const hashedPassword = await bcryptjs_1.default.hash(input.password, 10);
    const user = await userStore.create({
        name: input.name,
        email: normalizedEmail,
        password: hashedPassword,
    });
    const publicUser = toPublicUser(user);
    return {
        token: createToken(publicUser.id),
        user: publicUser,
    };
}
async function login(input) {
    const userStore = (0, auth_store_1.getUserStore)();
    const user = await userStore.findByEmail(input.email.toLowerCase());
    if (!user) {
        throw new api_error_1.ApiError(401, "Invalid credentials");
    }
    const isPasswordValid = await bcryptjs_1.default.compare(input.password, user.password);
    if (!isPasswordValid) {
        throw new api_error_1.ApiError(401, "Invalid credentials");
    }
    const publicUser = toPublicUser(user);
    return {
        token: createToken(publicUser.id),
        user: publicUser,
    };
}
async function getCurrentUser(userId) {
    const userStore = (0, auth_store_1.getUserStore)();
    const user = await userStore.findById(userId);
    if (!user) {
        throw new api_error_1.ApiError(404, "User not found");
    }
    return toPublicUser(user);
}
//# sourceMappingURL=auth.service.js.map