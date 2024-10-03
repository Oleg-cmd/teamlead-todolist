import express from "express";
import { getProjectsController } from "./projects.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getProjectsController);

export default router;
