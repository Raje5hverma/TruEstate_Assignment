import { Router } from "express";
import { getSalesHandler } from "../controllers/sales.controller.js";

const router = Router();

router.get("/", getSalesHandler);

export default router;
