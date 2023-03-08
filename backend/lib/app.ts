//npm packages
import express, { Application } from "express";
import config from "config";

// Custom Modules, Packages, Configs, etc.
import { connectDB } from "./databases/MongoDB";

const app: Application = express();
app.use(express.json());

connectDB();
export const APP_PORT = config.get("port");
export default app;
