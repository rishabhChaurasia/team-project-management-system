import { getEnv } from "../utils/get-env";

const appConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "5000"),
  BASE_PATH: getEnv("BASE_PATH", "/api"),
  MONGO_URI: getEnv("MONGO_URI", "mongo_url"),
  SESSION_SECRET: getEnv("SESSION_SECRET", "session_secret_key"),
  SESSION_EXPIRES_AT: getEnv("SESSION_EXPIRES_AT", "1d"),
  GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID", "id"),
  GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET", "secret"),
  GOOGLE_CALLBACK_URL: getEnv("GOOGLE_CALLBACK_URL", "url..."),
  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "localhost"),
  FRONTEND_GOOGLE_CALLBACK_URL: getEnv("FRONTEND_GOOGLE_CALLBACK_URL", "url.."),
  EMAIL_HOST: getEnv("EMAIL_HOST", "smtp.gmail.com"),
  EMAIL_PORT: getEnv("EMAIL_PORT", "587"),
  EMAIL_USER: getEnv("EMAIL_USER", ""),
  EMAIL_PASS: getEnv("EMAIL_PASS", ""),
});

export const config = appConfig();
