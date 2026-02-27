"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
const auth_routes_1 = require("./modules/auth/auth.routes");
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: env_1.env.corsOrigin,
}));
app.use(express_1.default.json());
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});
app.use("/api/auth", auth_routes_1.authRouter);
app.use(error_middleware_1.errorHandler);
//# sourceMappingURL=app.js.map