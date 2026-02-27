"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const api_error_1 = require("../utils/api-error");
function errorHandler(err, _req, res, _next) {
    if (err instanceof api_error_1.ApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: "Internal server error" });
}
//# sourceMappingURL=error.middleware.js.map