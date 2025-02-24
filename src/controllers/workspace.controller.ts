import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  createWorkspaceSchema,
  workspaceIdSchema,
} from "../validation/workspace.validation";
import { HttpStatus } from "../config/http.config";
import {
  createWorkspaceService,
  getAllWorkspaceUserIsMemberService,
  getWorkspaceAnalyticsService,
  getWorkspaceByIdService,
  getWorkspaceMembersService,
} from "../services/workspace.service";
import { getMemberRoleInWorkspace } from "../services/member.service";
import { Permissions } from "../enums/role.enum";
import { roleGuard } from "../utils/roleGuard";

// create new workspace controller
export const createWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createWorkspaceSchema.parse(req.body);

    const userId = req.user?._id;
    const { workspace } = await createWorkspaceService(userId, body);

    return res.status(HttpStatus.CREATED).json({
      message: "Workspace created successfully",
      workspace,
    });
  }
);

// users all workspace controller
export const getAllWorkspacesUserIsMemberController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const { workspaces } = await getAllWorkspaceUserIsMemberService(userId);

    return res.status(HttpStatus.OK).json({
      message: "User workspaces fetched successfully",
      workspaces,
    });
  }
);

// workspace by id controller
export const getWorkspaceByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const userId = req.user?._id;

    await getMemberRoleInWorkspace(userId, workspaceId);

    const { workspace } = await getWorkspaceByIdService(workspaceId);

    return res.status(HttpStatus.OK).json({
      message: "Workspace fetched successfully",
      workspace,
    });
  }
);

// workspace members controller
export const getWorkspaceMembersController = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const userId = req.user?._id;

    const { role } = await getMemberRoleInWorkspace(userId, workspaceId);

    roleGuard(role, [Permissions.VIEW_ONLY]);

    const { members, roles } = await getWorkspaceMembersService(workspaceId);

    return res.status(HttpStatus.OK).json({
      message: "Workspace members retrieved successfully",
      members,
      roles,
    });
  }
);

// workspace analytics controller
export const getWorkspaceAnalyticsController = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const userId = req.user?._id;

    const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
    roleGuard(role, [Permissions.VIEW_ONLY]);

    const { analytics } = await getWorkspaceAnalyticsService(workspaceId);

    return res.status(HttpStatus.OK).json({
      message: "Workspace analytics retrieved successfully",
      analytics,
    });
  }
);
