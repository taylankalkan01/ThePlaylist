import { Application } from "express";
import authRoutes from "./authRoutes";

export function initRoutes(app: any) {
  app.use("/api/v1/auth", authRoutes);
}
