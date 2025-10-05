import {
  ChevronDown,
  Loader,
  CheckCircle,
  Shield,
  User,
  Crown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion, AnimatePresence } from "motion/react";
import {
  useGetWorkspaceMembersQuery,
  useChangeWorkspaceMemberRoleMutation,
} from "@/redux/rtk-query/workspaceApi";
import { useGetCurrentUserQuery } from "@/redux/rtk-query/authApi";
import { toast } from "sonner";
import { useState } from "react";

const AllMembers = ({ workspaceId }: { workspaceId: string }) => {
  const {
    data: membersData,
    isLoading: isPending,
    error,
  } = useGetWorkspaceMembersQuery(workspaceId);
  const { data: currentUserData } = useGetCurrentUserQuery(undefined);
  const [changeRole, { isLoading }] = useChangeWorkspaceMemberRoleMutation();
  const [openPopovers, setOpenPopovers] = useState<Record<string, boolean>>({});
  const [loadingRole, setLoadingRole] = useState<string | null>(null);

  const members = membersData?.members || [];
  const roles = membersData?.roles || [];

  // Find current user's role in this workspace
  const currentUser = members.find(
    (member: any) => member.userId._id === currentUserData?.user?._id
  );
  const canManageRoles = currentUser?.role.name === "OWNER";

  const getAvatarFallback = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  const getAvatarColor = (name: string) =>
    [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
    ][name.length % 5];

  const handleSelect = async (roleId: string, memberId: string) => {
    setLoadingRole(roleId);
    try {
      await changeRole({
        id: workspaceId,
        member: { roleId, memberId },
      }).unwrap();
      const roleName = roles.find((role: any) => role._id === roleId)?.name;
      toast.success(`Role changed to ${roleName?.toLowerCase()} successfully`);
      setOpenPopovers((prev) => ({ ...prev, [memberId]: false }));
    } catch (error) {
      toast.error("Failed to change role. Please try again.");
    } finally {
      setLoadingRole(null);
    }
  };

  return (
    <div className="space-y-4 pt-2">
      {isPending && (
        <div className="space-y-4">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 p-4 rounded-lg border bg-card"
            >
              <div className="flex items-center space-x-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="flex justify-center py-8">
          <p className="text-red-500">
            Error loading members:{" "}
            {"data" in error
              ? (error.data as any)?.message || "Something went wrong"
              : "Something went wrong"}
          </p>
        </div>
      )}

      {members.map((member: any) => {
        const { name, email, _id: userId, profilePicture } = member.userId;
        const initials = getAvatarFallback(name);
        const avatarColor = getAvatarColor(name);
        const isOwner = member.role.name === "OWNER";

        return (
          <div
            key={userId}
            className="flex items-center justify-between gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profilePicture || ""} alt={name} />
                <AvatarFallback
                  className={`${avatarColor} text-white text-sm font-medium`}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{name}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {email}
                </p>
              </div>
            </div>
            <Popover
              open={openPopovers[userId]}
              onOpenChange={(open) =>
                setOpenPopovers((prev) => ({ ...prev, [userId]: open }))
              }
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="min-w-28 capitalize"
                  disabled={isLoading || isOwner}
                >
                  <div className="flex items-center gap-2">
                    {isOwner ? (
                      <Crown className="h-3 w-3" />
                    ) : member.role.name === "ADMIN" ? (
                      <Shield className="h-3 w-3" />
                    ) : (
                      <User className="h-3 w-3" />
                    )}
                    {member.role.name.toLowerCase()}
                  </div>
                  {!isOwner && canManageRoles && (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </PopoverTrigger>
              {!isOwner && canManageRoles && (
                <PopoverContent
                  className="p-0 w-80"
                  align="end"
                  sideOffset={4}
                  asChild
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="p-3 border-b bg-muted/50">
                      <p className="text-sm font-medium">Change Role</p>
                      <p className="text-xs text-muted-foreground">
                        Select a new role for {name}
                      </p>
                    </div>
                    <Command>
                      <CommandList className="max-h-48">
                        <CommandGroup>
                          {roles
                            .filter((role: any) => role.name !== "OWNER")
                            .map((role: any, index: number) => (
                              <motion.div
                                key={role._id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: index * 0.1,
                                  duration: 0.2,
                                }}
                              >
                                <CommandItem
                                  disabled={loadingRole === role._id}
                                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-accent/80 ${
                                    loadingRole === role._id ? "opacity-50" : ""
                                  }`}
                                  onSelect={() =>
                                    handleSelect(role._id, userId)
                                  }
                                >
                                  <div className="flex items-center gap-2 flex-1">
                                    {role.name === "ADMIN" ? (
                                      <Shield className="h-4 w-4 text-orange-500" />
                                    ) : (
                                      <User className="h-4 w-4 text-blue-500" />
                                    )}
                                    <div>
                                      <p className="capitalize font-medium text-sm">
                                        {role.name.toLowerCase()}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {role.name === "ADMIN"
                                          ? "Full access to workspace and settings"
                                          : "Limited access to assigned tasks"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {loadingRole === role._id && (
                                      <Loader className="h-4 w-4 animate-spin" />
                                    )}
                                    <AnimatePresence>
                                      {member.role.name === role.name && (
                                        <motion.div
                                          initial={{ scale: 0, opacity: 0 }}
                                          animate={{ scale: 1, opacity: 1 }}
                                          exit={{ scale: 0, opacity: 0 }}
                                          transition={{ duration: 0.2 }}
                                        >
                                          <CheckCircle className="h-4 w-4 text-green-500" />
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </CommandItem>
                              </motion.div>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </motion.div>
                </PopoverContent>
              )}
            </Popover>
          </div>
        );
      })}
    </div>
  );
};

export default AllMembers;
