import mongoose from "mongoose";
import UserModel from "../models/user.model";
import AccountModel from "../models/account.model";
import WorkspaceModel from "../models/workspace.model";
import RoleModel from "../models/roles-permission.model";
import { Roles } from "../enums/role.enum";
import { NotFoundException } from "../utils/appError";
import MemberModel from "../models/member.model";

export const loginOrCreateAccountService = async (data: {
  provider: string;
  displayName: string;
  providerId: string;
  picture?: string;
  email?: string;
}) => {
  const { providerId, provider, displayName, email, picture } = data;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    console.log("Started Session...");

    let user = await UserModel.findOne({ email }).session(session);
    if (!user) {
      //1. creating user in User model
      user = new UserModel({
        email,
        name: displayName,
        profilePicture: picture || null,
      });
      await user.save({ session });

      //2. creating account in Account model
      const account = new AccountModel({
        userId: user._id,
        provider: provider,
        providerId: providerId,
      });
      await account.save({ session });

      // 3. Create a new workspace in Workspace model
      const workspace = new WorkspaceModel({
        name: `My Workspace`,
        description: `Workspace created for ${user.name}`,
        owner: user._id,
      });
      await workspace.save({ session });

      // 4. Find role from Role model
      const ownerRole = await RoleModel.findOne({
        name: Roles.OWNER,
      }).session(session);

      if (!ownerRole) {
        throw new NotFoundException("Owner role not found");
      }

      // 5. creating member in Member model
      const member = new MemberModel({
        userId: user._id,
        workspaceId: workspace._id,
        role: ownerRole._id,
        joinedAt: new Date(),
      });
      await member.save({ session });

      user.currentWorkspace = workspace._id as mongoose.Types.ObjectId;
      await user.save({ session });
    }

    await session.commitTransaction();
    session.endSession();
    console.log("End Session...");

    return { user };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  } finally {
    session.endSession();
  }
};
