import { ChevronDown, Loader, Check, Shield, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
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

const AllMembers = () => {
  // Dummy data
  const isPending = false;
  const isLoading = false;
  const canChangeMemberRole = true;
  const user = { _id: "1" };
  
  const members = [
    {
      userId: {
        _id: "1",
        name: "John Doe",
        email: "john@example.com",
        profilePicture: ""
      },
      role: { name: "ADMIN" }
    },
    {
      userId: {
        _id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        profilePicture: ""
      },
      role: { name: "MEMBER" }
    }
  ];
  
  const roles = [
    { _id: "1", name: "ADMIN" },
    { _id: "2", name: "MEMBER" }
  ];

  const getAvatarFallbackText = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"];
    return colors[name.length % colors.length];
  };

  const handleSelect = (roleId: string, memberId: string) => {
    console.log("Role changed:", { roleId, memberId });
  };

  return (
    <div className="space-y-4 pt-2">
      {isPending ? (
        <div className="flex justify-center py-8">
          <Loader className="w-8 h-8 animate-spin" />
        </div>
      ) : null}

      {members?.map((member) => {
        const name = member.userId.name;
        const initials = getAvatarFallbackText(name);
        const avatarColor = getAvatarColor(name);
        return (
          <div
            key={member.userId._id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10 sm:h-8 sm:w-8">
                <AvatarImage
                  src={member.userId?.profilePicture || ""}
                  alt={name}
                />
                <AvatarFallback className={`${avatarColor} text-white text-sm font-medium`}>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-none truncate">{name}</p>
                <p className="text-sm text-muted-foreground truncate mt-1">
                  {member.userId.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:ml-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:min-w-28 capitalize disabled:opacity-95 disabled:pointer-events-none hover:bg-accent/80 transition-colors"
                      disabled={
                        isLoading ||
                        !canChangeMemberRole ||
                        member.userId._id === user._id
                      }
                    >
                      <div className="flex items-center gap-2">
                        {member.role.name === "ADMIN" ? (
                          <Shield className="h-3 w-3" />
                        ) : (
                          <User className="h-3 w-3" />
                        )}
                        {member.role.name?.toLowerCase()}
                      </div>
                      {canChangeMemberRole && member.userId._id !== user._id && (
                        <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                      )}
                    </Button>
                  </motion.div>
                </PopoverTrigger>
                {canChangeMemberRole && (
                  <PopoverContent className="p-0 w-[calc(100vw-2rem)] sm:w-80" align="end" sideOffset={4} asChild>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="p-3 sm:p-2 border-b bg-muted/50">
                        <p className="text-sm font-medium">Change Role</p>
                        <p className="text-xs text-muted-foreground truncate">Select a new role for {name}</p>
                      </div>
                    <Command>
                      <CommandList className="max-h-48">
                        {isLoading ? (
                          <div className="flex justify-center py-6">
                            <Loader className="w-5 h-5 animate-spin" />
                          </div>
                        ) : (
                          <>
                            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                              No roles available
                            </CommandEmpty>
                            <CommandGroup>
                              {roles?.map(
                                (role) =>
                                  role.name !== "OWNER" && (
                                    <CommandItem
                                      key={role._id}
                                      disabled={isLoading}
                                      className="disabled:pointer-events-none flex items-start gap-3 px-3 sm:px-4 py-3 cursor-pointer hover:bg-accent/80 transition-colors"
                                      onSelect={() => {
                                        handleSelect(
                                          role._id,
                                          member.userId._id
                                        );
                                      }}
                                    >
                                      <div className="flex items-center gap-2 flex-1">
                                        <div className="flex items-center gap-2">
                                          {role.name === "ADMIN" ? (
                                            <Shield className="h-4 w-4 text-orange-500" />
                                          ) : (
                                            <User className="h-4 w-4 text-blue-500" />
                                          )}
                                          <div>
                                            <p className="capitalize font-medium text-sm">
                                              {role.name?.toLowerCase()}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                              {role.name === "ADMIN" &&
                                                "Full access to workspace and settings"}
                                              {role.name === "MEMBER" &&
                                                "Limited access to assigned tasks"}
                                            </p>
                                          </div>
                                        </div>
                                        <AnimatePresence>
                                          {member.role.name === role.name && (
                                            <motion.div
                                              initial={{ scale: 0, opacity: 0 }}
                                              animate={{ scale: 1, opacity: 1 }}
                                              exit={{ scale: 0, opacity: 0 }}
                                              transition={{ duration: 0.2 }}
                                            >
                                              <Check className="h-4 w-4 text-green-500" />
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    </CommandItem>
                                  )
                              )}
                            </CommandGroup>
                          </>
                        )}
                      </CommandList>
                    </Command>
                    </motion.div>
                  </PopoverContent>
                )}
              </Popover>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllMembers;