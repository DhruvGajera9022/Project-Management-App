import { Router } from "express";
import {
  createTaskController,
  getAllTasksController,
  updateTaskController,
} from "../controllers/task.controller";
const taskRoutes = Router();

taskRoutes.post(
  "/project/:projectId/workspace/:workspaceId/create",
  createTaskController
);

taskRoutes.get("/workspace/:workspaceId/all", getAllTasksController);

taskRoutes.put(
  "/:id/project/:projectId/workspace/:workspaceId/update",
  updateTaskController
);

export default taskRoutes;
