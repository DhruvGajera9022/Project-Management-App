import { Router } from "express";
import { getCurrentUseController } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/current", getCurrentUseController);

export default userRoutes;
