import { PermissionType } from "../enums/role.enum";
import { UnauthorizedException } from "./appError";
import { RolePermissions } from "./role-permission";

export const roleGuard = (
  role: keyof typeof RolePermissions,
  requiredPermissions: PermissionType[]
) => {
  const permissions = RolePermissions[role];

  const hashPermissions = requiredPermissions.every((permission) =>
    permissions.includes(permission)
  );
  if (!hashPermissions) {
    throw new UnauthorizedException(
      "You do not have the necessary permission to perform this action"
    );
  }
};
