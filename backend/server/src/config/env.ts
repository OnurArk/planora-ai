import dotenv from "dotenv";

dotenv.config();

function getEnv(name: string, fallback?: string) {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function getOptionalEnv(name: string) {
  const value = process.env[name];
  if (!value) return undefined;
  return value;
}

type AuthStorage = "file" | "mongo";

const authStorage = (process.env.AUTH_STORAGE ?? "file") as AuthStorage;
const mongoUri = getOptionalEnv("MONGODB_URI");

if (authStorage === "mongo" && !mongoUri) {
  throw new Error("MONGODB_URI is required when AUTH_STORAGE=mongo");
}

export const env = {
  port: Number(getEnv("PORT", "4000")),
  authStorage,
  mongoUri,
  fileAuthPath: getEnv("FILE_AUTH_PATH", "data/users.json"),
  jwtSecret: getEnv("JWT_SECRET"),
  jwtExpiresIn: getEnv("JWT_EXPIRES_IN", "7d"),
  corsOrigin: getEnv("CORS_ORIGIN", "http://localhost:3000"),
};
