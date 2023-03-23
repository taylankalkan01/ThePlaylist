import { Application } from "express";
import authRoutes from "./authRoutes";
import planRoutes from "./planRoutes";

export function initRoutes(app: any) {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/plan", planRoutes);
}
