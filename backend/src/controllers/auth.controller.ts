import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { config } from "../config/app.config";
import { registerSchema } from "../validation/auth.validation";
import { HttpStatus } from "../config/http.config";
import { registerUserService } from "../services/auth.service";
import passport from "passport";

// Google auth callback
export const googleLoginCallback = asyncHandler(
  async (req: Request, res: Response) => {
    const currentWorkspace = req.user?.currentWorkspace;
    if (!currentWorkspace) {
      return res.redirect(
        `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`
      );
    }

    res.redirect(`${config.FRONTEND_ORIGIN}/workspace/${currentWorkspace}`);
  }
);

// Register user
export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse({
      ...req.body,
    });

    await registerUserService(body);

    return res.status(HttpStatus.CREATED).json({
      message: "User created successfully",
    });
  }
);

// Login user
export const loginController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      (
        err: Error | null,
        user: Express.User | false,
        info: { message: string } | undefined
      ) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          return res.status(HttpStatus.UNAUTHORIZED).json({
            message: info?.message || "Invalid email or password",
          });
        }

        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }

          return res.status(HttpStatus.OK).json({
            message: "Logged in successfully",
            user,
          });
        });
      }
    )(req, res, next);
  }
);

// Logout user
export const logOutController = asyncHandler(
  async (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: "Failed to log out" });
      }
    });

    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Session destruction error:", err);
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: "Failed to destroy session" });
        }
      });
    }
    return res
      .status(HttpStatus.OK)
      .json({ message: "Logged out successfully" });
  }
);
