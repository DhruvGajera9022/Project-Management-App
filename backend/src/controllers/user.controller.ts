import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HttpStatus } from "../config/http.config";
import { getCurrentUseService } from "../services/user.service";

// Get current logged in user
export const getCurrentUseController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const { user } = await getCurrentUseService(userId);

    return res.status(HttpStatus.OK).json({
      message: "User fetch successfully",
      user,
    });
  }
);
