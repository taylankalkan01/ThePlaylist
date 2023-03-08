import dotenv from "dotenv";
dotenv.config({
    path: ".env.local"
  });
export default {
    port: process.env.APP_PORT,
    MONGO_URL:process.env.MONGO_URL
  };