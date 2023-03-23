import dotenv from "dotenv";
dotenv.config({
    path: ".env.local"
  });
export default {
    port: process.env.APP_PORT,
    MONGO_URL:process.env.MONGO_URL,
    ACCESS_TOKEN_USER_PRIVATE_KEY:process.env.ACCESS_TOKEN_USER_PRIVATE_KEY,
    ACCESS_TOKEN_ADMIN_PRIVATE_KEY:process.env.ACCESS_TOKEN_ADMIN_PRIVATE_KEY,
  };