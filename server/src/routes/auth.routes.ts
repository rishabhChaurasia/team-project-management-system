import { Router } from "express";
import { config } from "../config/app.config";
import {
  forgotPasswordController,
  googleLoginCallback,
  loginController,
  logOutController,
  registerUserController,
  resetPasswordController,
} from "../controllers/auth.controller";
import passport from "passport";

const failedUrl = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;
const authRoutes = Router();

authRoutes.post("/register", registerUserController);
authRoutes.post("/login", loginController);

authRoutes.post("/logout", logOutController);

authRoutes.post("/forgot-password", forgotPasswordController);
authRoutes.post("/reset-password", resetPasswordController);

authRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: failedUrl }),
  googleLoginCallback
);

export default authRoutes;
