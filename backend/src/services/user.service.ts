import UserModel from "../models/user.model";
import { BadRequestException } from "../utils/appError";

// Get current user
export const getCurrentUseService = async (userId: string) => {
  const user = await UserModel.findById(userId)
    .populate("currentWorkspace")
    .select("-password");

  if (!user) {
    throw new BadRequestException("User not found");
  }

  return { user };
};
