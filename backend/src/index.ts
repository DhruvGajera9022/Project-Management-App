import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import { config } from "./config/app.config";
import connectDatabase from "./config/database.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { HttpStatus } from "./config/http.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { BadRequestException } from "./utils/appError";
import { ErrorCodeEnum } from "./enums/errorCode.enum";

import "./config/passport.config";
import passport from "passport";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { isAuthenticated } from "./middlewares/isAuthenticated.middleware";
import workspaceRoutes from "./routes/workspace.routes";
import memberRoutes from "./routes/member.routes";
import projectRoutes from "./routes/projects.routes";
import taskRoutes from "./routes/task.routes";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: config.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    },
  })
);
app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

// Error handler middleware
app.use(errorHandler);

// Initialize passport auth
app.use(passport.initialize());
app.use(passport.session());

// Testing route
app.get(
  `/`,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    throw new BadRequestException(
      "This is a bad request",
      ErrorCodeEnum.INTERNAL_SERVER_ERROR
    );
    return res.status(HttpStatus.OK).json({
      message: "Hello Subscribe to the channel & share",
    });
  })
);

// Initialize all routes
app.use(`${config.BASE_PATH}/auth`, authRoutes);
app.use(`${config.BASE_PATH}/user`, isAuthenticated, userRoutes);
app.use(`${config.BASE_PATH}/workspace`, isAuthenticated, workspaceRoutes);
app.use(`${config.BASE_PATH}/member`, isAuthenticated, memberRoutes);
app.use(`${config.BASE_PATH}/project`, isAuthenticated, projectRoutes);
app.use(`${config.BASE_PATH}/task`, isAuthenticated, taskRoutes);

// Start the server
app.listen(config.PORT, async () => {
  console.log(`Server started on port ${config.PORT}`);
  await connectDatabase();
});
