import { app } from "./app";
import { connectDatabase } from "./config/db";
import { env } from "./config/env";

async function bootstrap() {
  try {
    await connectDatabase();
    app.listen(env.port, () => {
      console.log(`Server is running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

bootstrap();
