"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupHandler = signupHandler;
exports.loginHandler = loginHandler;
exports.meHandler = meHandler;
const api_error_1 = require("../../utils/api-error");
const auth_service_1 = require("./auth.service");
async function signupHandler(req, res, next) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new api_error_1.ApiError(400, "name, email and password are required");
        }
        const result = await (0, auth_service_1.signup)({ name, email, password });
        return res.status(201).json(result);
    }
    catch (error) {
        return next(error);
    }
}
async function loginHandler(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new api_error_1.ApiError(400, "email and password are required");
        }
        const result = await (0, auth_service_1.login)({ email, password });
        return res.status(200).json(result);
    }
    catch (error) {
        return next(error);
    }
}
async function meHandler(req, res, next) {
    try {
        if (!req.userId) {
            throw new api_error_1.ApiError(401, "Unauthorized");
        }
        const user = await (0, auth_service_1.getCurrentUser)(req.userId);
        return res.status(200).json({ user });
    }
    catch (error) {
        return next(error);
    }
}
//# sourceMappingURL=auth.controller.js.map