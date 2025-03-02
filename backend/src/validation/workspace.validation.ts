import { z } from "zod";

// Workspace schema
export const nameSchema = z
  .string()
  .trim()
  .min(1, { message: "Name is required" })
  .max(255);
export const descriptionSchema = z.string().trim().optional();
export const workspaceIdSchema = z
  .string()
  .trim()
  .min(1, { message: "Workspace ID is required" });
export const changeRoleSchema = z.object({
  roleId: z.string().trim().min(1),
  memberId: z.string().trim().min(1),
});

// Create Workspace schema
export const createWorkspaceSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
});

// Update Workspace schema
export const updateWorkspaceSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
});
