import { Router } from "express";
import {
  createTaskController,
  updateTaskController,
} from "../controllers/task.controller";
const taskRoutes = Router();

taskRoutes.post(
  "/project/:projectId/workspace/:workspaceId/create",
  createTaskController
);

taskRoutes.put(
  "/:id/project/:projectId/workspace/:workspaceId/update",
  updateTaskController
);

export default taskRoutes;
