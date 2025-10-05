import {
  LayoutDashboard,
  CheckCircle,
  Users,
  Settings,
  LogOut,
  MoreHorizontal,
  Check,
  ChevronDown,
  Plus,
  Folder,
  Trash2,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  useGetCurrentUserQuery,
  useLogoutUserMutation,
} from "@/redux/rtk-query/authApi";
import { useGetAllMyWorkspaceQuery } from "@/redux/rtk-query/workspaceApi";
import { useGetAllProjectInWorkspaceQuery } from "@/redux/rtk-query/projectApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateWorkspaceDialog from "./workspace/CreateWorkspaceDialog";
import CreateProjectDialog from "./project/CreateProjectDialog";
import { motion } from "motion/react";

type ItemType = {
  title: string;
  url: string;
  icon: React.ComponentType<{ size?: number }>;
};

const AppSidebar = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const { data } = useGetCurrentUserQuery(undefined);
  const { data: workspacesData, isLoading: isWorkspacesLoading } = useGetAllMyWorkspaceQuery(undefined);
  const { data: projectsData, isLoading: isProjectsLoading } =
    useGetAllProjectInWorkspaceQuery(workspaceId, {
      skip: !workspaceId,
    });

  const currentWorkspace =
    workspacesData?.workspaces?.find(
      (workspace: any) => workspace._id === workspaceId
    ) || data?.user?.currentWorkspace;
  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutUserMutation();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser(undefined).unwrap();
      toast.success("Logged out successfully!");
      navigate("/sign-in");
    } catch (error: any) {
      toast.error(error?.data?.message || "Logout failed!");
    } finally {
      setIsLogoutOpen(false);
    }
  };

  // Main navigation items for workspace-level features
  const items: ItemType[] = [
    {
      title: "Dashboard",
      url: `/workspace/${workspaceId}`,
      icon: LayoutDashboard,
    },
    {
      title: "Tasks",
      url: `/workspace/${workspaceId}/tasks`,
      icon: CheckCircle,
    },
    {
      title: "Members",
      url: `/workspace/${workspaceId}/members`,
      icon: Users,
    },
    {
      title: "Settings",
      url: `/workspace/${workspaceId}/settings`,
      icon: Settings,
    },
  ];

  return (
    <>
      <Sidebar>
        {/* App Header - Brand name and logo */}
        <SidebarHeader>
          <motion.h2
            className="text-xl font-bold px-4 py-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Team Flow
          </motion.h2>
        </SidebarHeader>
        <SidebarContent>
          {/* Workspace Switcher Section - Allows users to switch between workspaces */}
          <SidebarGroup>
            <SidebarGroupLabel className="w-full justify-between pr-0">
              <span>Workspaces</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 rounded-full border hover:bg-accent"
                title="Create workspace"
                onClick={() => setIsCreateWorkspaceOpen(true)}
              >
                <Plus className="size-3.5" />
              </Button>
            </SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 transition-colors"
                    >
                      <div className="flex aspect-square size-8 items-center font-semibold justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        T
                      </div>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        {isWorkspacesLoading ? (
                          <>
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-16 mt-1" />
                          </>
                        ) : (
                          <>
                            <span className="truncate font-semibold">
                              {currentWorkspace?.name || "Workspace"}
                            </span>
                            <span className="truncate text-xs">
                              {currentWorkspace?.description || "Free"}
                            </span>
                          </>
                        )}
                      </div>
                      <ChevronDown className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    align="start"
                    sideOffset={4}
                  >
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                      Workspaces
                    </DropdownMenuLabel>
                    {isWorkspacesLoading ? (
                      Array.from({ length: 2 }).map((_, index) => (
                        <div key={index} className="gap-2 p-2 flex items-center">
                          <Skeleton className="h-6 w-6 rounded-sm" />
                          <Skeleton className="h-4 flex-1" />
                        </div>
                      ))
                    ) : (
                      workspacesData?.workspaces?.map((workspace: any) => (
                      <DropdownMenuItem
                        key={workspace._id}
                        className="gap-2 p-2 cursor-pointer"
                        onClick={() => navigate(`/workspace/${workspace._id}`)}
                      >
                        <div className="flex size-6 items-center justify-center rounded-sm border bg-primary text-primary-foreground font-semibold">
                          {workspace.name[0].toUpperCase()}
                        </div>
                        <span className="flex-1">{workspace.name}</span>
                        {workspace._id === workspaceId && (
                          <DropdownMenuShortcut className="tracking-normal !opacity-100">
                            <Check className="w-4 h-4 text-green-600" />
                          </DropdownMenuShortcut>
                        )}
                      </DropdownMenuItem>
                      ))
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="gap-2 p-2 cursor-pointer hover:bg-accent"
                      onClick={() => setIsCreateWorkspaceOpen(true)}
                    >
                      <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                        <Plus className="size-4" />
                      </div>
                      <div className="font-medium text-muted-foreground">
                        Create workspace
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          {/* Projects Section - Lists all projects in current workspace with actions */}
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel className="w-full justify-between pr-0">
              <span>Projects</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 rounded-full border hover:bg-accent transition-colors"
                title="Create project"
                onClick={() => setIsCreateProjectOpen(true)}
              >
                <Plus className="size-3.5" />
              </Button>
            </SidebarGroupLabel>
            <SidebarMenu className="max-h-[200px] overflow-y-auto scrollbar-thin">
              {isProjectsLoading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <SidebarMenuItem key={index}>
                      <div className="flex items-center gap-2 px-2 py-1.5">
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-4 flex-1" />
                      </div>
                    </SidebarMenuItem>
                  ))
                : (projectsData as any)?.projects?.map((project: any) => (
                    <SidebarMenuItem key={project._id}>
                      <SidebarMenuButton
                        asChild
                        className="hover:bg-sidebar-accent/50 transition-colors group"
                      >
                        <Link
                          to={`/workspace/${workspaceId}/project/${project._id}`}
                        >
                          <span className="text-base">{project.emoji}</span>
                          <span className="truncate">{project.name}</span>
                        </Link>
                      </SidebarMenuButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction
                            showOnHover
                            className="hover:bg-accent transition-colors"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Project actions</span>
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="w-48 rounded-lg"
                          side="right"
                          align="start"
                        >
                          <DropdownMenuItem className="cursor-pointer">
                            <Folder className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>View Project</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete Project</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  ))}
            </SidebarMenu>
          </SidebarGroup>

          {/* Main Navigation Section - Core workspace features */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    >
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          className="hover:bg-sidebar-accent/50 transition-colors"
                        >
                          <Link to={item.url}>
                            <Icon size={20} />
                            {item.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </motion.div>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* User Profile Section - Shows current user info and logout option */}
        <SidebarFooter>
          <motion.div
            className="flex items-center gap-3 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <Avatar>
              <AvatarFallback>
                {data?.user?.name
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium">
                {data?.user?.name || "User"}
              </p>
              <p className="text-xs text-muted-foreground">
                {data?.user?.email || "user@example.com"}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-accent transition-colors"
                  title="User menu"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem
                  onClick={() => setIsLogoutOpen(true)}
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </SidebarFooter>
      </Sidebar>

      {/* Logout Confirmation Modal - Styled like auth forms for consistency */}
      <Dialog modal={true} open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
        <DialogContent className="sm:max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-0 shadow-none">
              <CardHeader className="text-center">
                <motion.div
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.3, type: "spring" }}
                >
                  <LogOut className="h-6 w-6 text-red-600 dark:text-red-400" />
                </motion.div>
                <CardTitle className="text-xl">Sign Out</CardTitle>
                <CardDescription>
                  Are you sure you want to sign out? You'll need to sign in
                  again to access your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  className="flex flex-col-reverse sm:flex-row gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <Button
                    onClick={() => setIsLogoutOpen(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    className="flex-1"
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? "Signing Out..." : "Sign Out"}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Create Workspace Dialog */}
      <CreateWorkspaceDialog
        isOpen={isCreateWorkspaceOpen}
        onClose={() => setIsCreateWorkspaceOpen(false)}
      />

      {/* Create Project Dialog */}
      <CreateProjectDialog
        isOpen={isCreateProjectOpen}
        onClose={() => setIsCreateProjectOpen(false)}
      />
    </>
  );
};

export default AppSidebar;
