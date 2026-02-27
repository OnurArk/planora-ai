"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.post("/signup", auth_controller_1.signupHandler);
authRouter.post("/login", auth_controller_1.loginHandler);
authRouter.get("/me", auth_middleware_1.requireAuth, auth_controller_1.meHandler);
//# sourceMappingURL=auth.routes.js.map