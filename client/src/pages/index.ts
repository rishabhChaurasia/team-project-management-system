import { lazy } from "react";

// auth
export const Login = lazy(() => import("./auth/Login"));
export const Register = lazy(() => import("./auth/Register"));
export const ForgotPassword = lazy(() => import("./auth/ForgotPassword"));
export const ResetPassword = lazy(() => import("./auth/ResetPassword"));
export const GoogleOauthFailure = lazy(
  () => import("./auth/GoogleOautFailure")
);

// dashboard
export const Workspace = lazy(() => import("./dashboard/workspace/Workspace"));
export const Tasks = lazy(() => import("./dashboard/tasks/Tasks"));
export const Members = lazy(() => import("./dashboard/members/Members"));
export const Settings = lazy(() => import("./dashboard/Settings"));
export const ProjectDetails = lazy(() => import("./dashboard/project/ProjectDetails"));
