import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { Progress } from "./components/ui/progress";
import {
  ForgotPassword,
  GoogleOauthFailure,
  Login,
  Register,
  ResetPassword,
} from "./pages";

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-80 space-y-4">
            <div className="text-center">
              <h2 className="text-lg font-semibold">Loading...</h2>
            </div>
            <Progress value={66} />
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
      </Routes>
      <Toaster />
    </Suspense>
  );
};

export default App;
