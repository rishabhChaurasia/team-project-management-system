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

type ItemType = {
  title: string;
  url: string;
  icon: React.ComponentType<{ size?: number }>;
};

const AppSidebar = () => {
  const { workspaceId } = useParams();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

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
          <h2 className="text-xl font-bold px-4 py-2">Team Flow</h2>
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
                        <span className="truncate font-semibold">
                          Team Workspace
                        </span>
                        <span className="truncate text-xs">Free</span>
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
                    <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                      <div className="flex size-6 items-center justify-center rounded-sm border bg-primary text-primary-foreground font-semibold">
                        T
                      </div>
                      <span className="flex-1">Team Workspace</span>
                      <DropdownMenuShortcut className="tracking-normal !opacity-100">
                        <Check className="w-4 h-4 text-green-600" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                      <div className="flex size-6 items-center justify-center rounded-sm border bg-muted text-muted-foreground font-semibold">
                        P
                      </div>
                      <span className="flex-1">Personal Workspace</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 p-2 cursor-pointer hover:bg-accent">
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
              >
                <Plus className="size-3.5" />
              </Button>
            </SidebarGroupLabel>
            <SidebarMenu className="max-h-[200px] overflow-y-auto scrollbar-thin">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="hover:bg-sidebar-accent/50 transition-colors group"
                >
                  <Link to={`/workspace/${workspaceId}/project/1`}>
                    <span className="text-base">🚀</span>
                    <span className="truncate">Website Redesign</span>
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
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="hover:bg-sidebar-accent/50 transition-colors group"
                >
                  <Link to={`/workspace/${workspaceId}/project/2`}>
                    <span className="text-base">📱</span>
                    <span className="truncate">Mobile App Development</span>
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
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="hover:bg-sidebar-accent/50 transition-colors group"
                >
                  <Link to={`/workspace/${workspaceId}/project/3`}>
                    <span className="text-base">🎨</span>
                    <span className="truncate">Brand Identity</span>
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
            </SidebarMenu>
          </SidebarGroup>

          {/* Main Navigation Section - Core workspace features */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className="hover:bg-sidebar-accent/50 transition-colors"
                      >
                        <a href={item.url}>
                          <Icon size={20} />
                          {item.title}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* User Profile Section - Shows current user info and logout option */}
        <SidebarFooter>
          <div className="flex items-center gap-3 p-4">
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
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
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Logout Confirmation Modal - Styled like auth forms for consistency */}
      <Dialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
        <DialogContent className="sm:max-w-md">
          <Card className="border-0 shadow-none">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                <LogOut className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-xl">Sign Out</CardTitle>
              <CardDescription>
                Are you sure you want to sign out? You'll need to sign in again
                to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <Button
                  onClick={() => setIsLogoutOpen(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setIsLogoutOpen(false)}
                  variant="destructive"
                  className="flex-1"
                >
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppSidebar;
