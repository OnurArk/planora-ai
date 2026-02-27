"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = require("./config/db");
const env_1 = require("./config/env");
async function bootstrap() {
    try {
        await (0, db_1.connectDatabase)();
        app_1.app.listen(env_1.env.port, () => {
            console.log(`Server is running on http://localhost:${env_1.env.port}`);
        });
    }
    catch (error) {
        console.error("Failed to start server", error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=index.js.map