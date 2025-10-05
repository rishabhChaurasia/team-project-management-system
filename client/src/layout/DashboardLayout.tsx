import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppHeader from "@/pages/dashboard/AppHeader";
import AppSidebar from "@/pages/dashboard/AppSidebar";
import { Outlet, Navigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "@/redux/rtk-query/authApi";
import { Progress } from "@/components/ui/progress";

const DashboardLayout = () => {
  const { data, isLoading, error } = useGetCurrentUserQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-80 space-y-4">
          <Progress value={50} />
        </div>
      </div>
    );
  }

  if (error || !data?.user) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-x-hidden">
        <div className="w-full">
          <AppHeader />
          <div className="px-3 lg:px-20 py-3">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
