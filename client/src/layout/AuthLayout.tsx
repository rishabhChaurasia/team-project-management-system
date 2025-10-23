import { Navigate, Outlet } from "react-router-dom";
import { useGetCurrentUserQuery } from "@/redux/rtk-query/authApi";
import { Progress } from "@/components/ui/progress";

const AuthLayout = () => {
  const { data, isLoading } = useGetCurrentUserQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-80 space-y-4">
          <Progress value={50} />
        </div>
      </div>
    );
  }

  if (data?.user) {
    return (
      <Navigate
        to={`/workspace/${data?.user?.currentWorkspace?._id}`}
        replace
      />
    );
  }

  return <Outlet />;
};

export default AuthLayout;
