import { Router } from "express";
import authController from "../controllers/authController";

const router = Router();

router.post("/user/register", authController.registerUser);
router.post("/admin/register", authController.registerAdmin);

export default router;
