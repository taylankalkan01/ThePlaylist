import { Router } from "express";
import planController from "../controllers/planController";
import { verifyAdminToken } from "../middlewares/tokens/verifyToken";

const router = Router();

router.post("/", verifyAdminToken, planController.createPlan);

export default router;
