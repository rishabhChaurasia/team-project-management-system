import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppHeader from "@/pages/dashboard/AppHeader";
import AppSidebar from "@/pages/dashboard/AppSidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
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
