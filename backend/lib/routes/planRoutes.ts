import { Router } from "express";
import planController from "../controllers/planController";
import {
  verifyAdminToken,
  verifyUserToken
} from "../middlewares/tokens/verifyToken";

const router = Router();

router.get("/", verifyUserToken, planController.getAllPlans);

//admin
router.post("/admin", verifyAdminToken, planController.createPlanAdmin);
router.get("/admin", verifyAdminToken, planController.getAllPlansAdmin);
router.delete(
  "/admin/:id",
  verifyAdminToken,
  planController.deletePlanByIdAdmin
);

export default router;
