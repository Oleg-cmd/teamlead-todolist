import express from "express";
import {
  getTasksController,
  getCountController,
  deleteTaskController,
} from "./tasks.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, getTasksController);
router.post("/count", authMiddleware, getCountController);
router.post("/delete", authMiddleware, deleteTaskController);

export default router;
