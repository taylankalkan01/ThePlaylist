import { Router } from "express";
import authController from "../controllers/authController";

const router = Router();

router.post("/user/register", authController.registerUser);

export default router;
