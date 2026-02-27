import mongoose from "mongoose";
import { env } from "./env";

export async function connectDatabase() {
  if (env.authStorage !== "mongo") {
    console.log("AUTH_STORAGE=file: skipping MongoDB connection");
    return;
  }

  if (!env.mongoUri) {
    throw new Error("MONGODB_URI is required for mongo storage");
  }

  await mongoose.connect(env.mongoUri);
}
