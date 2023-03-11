//npm packages
import express, { Application } from "express";
import config from "config";
import cookieParser from "cookie-parser";

// Custom Modules, Packages, Configs, etc.
import { connectDB } from "./databases/MongoDB";
import { initRoutes } from "./routes/routes";

const app: Application = express();
app.use(express.json());
app.use(cookieParser())

//healthcheck
app.get("/healthcheck", (req, res) => {
  res.status(200).json("healthcheck");
});

connectDB();
initRoutes(app);
export const APP_PORT = config.get("port");
export default app;
