import { Request, Response } from "express";
import { HttpStatus } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { getMemberRoleInWorkspace } from "../services/member.service";
import { workspaceIdSchema } from "../validation/workspace.validation";
import { roleGuard } from "../utils/roleGuard";
import { createProjectSchema } from "../validation/project.validation";
import {
  createProjectService,
  getProjectsInWorkspaceService,
} from "../services/project.service";
import { Permissions } from "../enums/role.enum";

// create project controller
export const createProjectController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createProjectSchema.parse(req.body);
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

    const userId = req.user?._id;
    const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
    roleGuard(role, [Permissions.CREATE_PROJECT]);

    const { project } = await createProjectService(userId, workspaceId, body);

    return res.status(HttpStatus.CREATED).json({
      message: "Project created successfully",
      project,
    });
  }
);

// get all workspace project controller
export const getAllProjectsInWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const userId = req.user?._id;

    const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
    roleGuard(role, [Permissions.VIEW_ONLY]);

    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const pageNumber = parseInt(req.query.pageNumber as string) || 1;

    const { projects, totalCount, totalPages, skip } =
      await getProjectsInWorkspaceService(workspaceId, pageSize, pageNumber);

    return res.status(HttpStatus.OK).json({
      message: "Project fetched successfully",
      projects,
      pagination: {
        totalCount,
        pageSize,
        pageNumber,
        totalPages,
        skip,
        limit: pageSize,
      },
    });
  }
);
