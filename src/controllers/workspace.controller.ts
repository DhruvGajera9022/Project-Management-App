import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { createWorkspaceSchema } from "../validation/workspace.validation";
import { HttpStatus } from "../config/http.config";
import {
  createWorkspaceService,
  getAllWorkspaceUserIsMemberService,
} from "../services/workspace.service";

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
