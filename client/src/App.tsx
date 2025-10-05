import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { Progress } from "./components/ui/progress";
import {
  ForgotPassword,
  GoogleOauthFailure,
  JoinWorkspace,
  Login,
  Members,
  ProjectDetails,
  Register,
  ResetPassword,
  Settings,
  Tasks,
  Workspace,
} from "./pages";
import DashboardLayout from "./layout/DashboardLayout";

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-80 space-y-4">
            <Progress value={76} />
          </div>
        </div>
      }
    >
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/google/oauth/callback" element={<GoogleOauthFailure />} />

        <Route element={<DashboardLayout />}>
          <Route path="/workspace/:workspaceId" element={<Workspace />} />
          <Route path="/workspace/:workspaceId/tasks" element={<Tasks />} />
          <Route path="/workspace/:workspaceId/members" element={<Members />} />
          <Route
            path="/workspace/:workspaceId/settings"
            element={<Settings />}
          />
          <Route
            path="/workspace/:workspaceId/project/:projectId"
            element={<ProjectDetails />}
          />
          <Route
            path="/invite/workspace/:inviteCode/join"
            element={<JoinWorkspace />}
          />
        </Route>
      </Routes>
      <Toaster />
    </Suspense>
  );
};

export default App;
