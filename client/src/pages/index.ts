import { lazy } from "react";

export const Login = lazy(() => import("./auth/Login"));
export const Register = lazy(() => import("./auth/Register"));
export const ForgotPassword = lazy(() => import("./auth/ForgotPassword"));
export const ResetPassword = lazy(() => import("./auth/ResetPassword"));
