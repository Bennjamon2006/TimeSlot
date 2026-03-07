import { Router } from "express";
import adminController from "@/controllers/admin.controller";

const adminRouter = Router();

adminRouter.get("/stats", adminController.getStats);

export default adminRouter;
