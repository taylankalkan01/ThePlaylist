import { Router } from "express";
import planController from "../controllers/planController";
import {
  verifyAdminToken,
  verifyUserToken
} from "../middlewares/tokens/verifyToken";

const router = Router();

router.get("/", verifyUserToken, planController.getAllPlans);
router.get("/:id", verifyUserToken, planController.getPlanById);

//admin
router.post("/admin", verifyAdminToken, planController.createPlanAdmin);
router.get("/admin", verifyAdminToken, planController.getAllPlansAdmin);
router.get("/admin/:id", verifyAdminToken, planController.getPlanByIdAdmin);
router.delete(
  "/admin/:id",
  verifyAdminToken,
  planController.deletePlanByIdAdmin
);
router.delete("/admin", verifyAdminToken, planController.deleteAllPlansAdmin);

export default router;
