import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { User } from "lucide-react";
import { motion } from "motion/react";
import { useGetWorkspaceMembersQuery } from "@/redux/rtk-query/workspaceApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo, useCallback } from "react";

type Member = {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    profilePicture: string | null;
  };
  role: {
    _id: string;
    name: string;
  };
  joinedAt: string;
};

const RecentMembers = ({ workspaceId }: { workspaceId: string }) => {
  const { data, isLoading: isPending } =
    useGetWorkspaceMembersQuery(workspaceId);

  const members = useMemo(() => data?.members || [], [data?.members]);

  const getAvatarFallbackText = useCallback((name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }, []);

  const getAvatarColor = useCallback((name: string) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
    ];
    const index = name.length % colors.length;
    return colors[index];
  }, []);

  const getRoleColor = useCallback((role: string) => {
    switch (role.toUpperCase()) {
      case "OWNER":
        return "text-purple-600 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-950 dark:border-purple-800";
      case "ADMIN":
        return "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800";
      case "MEMBER":
        return "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950 dark:border-blue-800";
      default:
        return "text-muted-foreground border-border";
    }
  }, []);

  return (
    <div className="flex flex-col pt-2">
      {isPending ? (
        <ul role="list" className="space-y-2 sm:space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 rounded-lg border border-border"
            >
              <div className="flex items-center gap-3 sm:gap-4 flex-grow">
                <Skeleton className="h-8 w-8 sm:h-9 sm:w-9 rounded-full" />
                <div className="flex-1 min-w-0">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <Skeleton className="h-3 w-12 mb-1" />
                <Skeleton className="h-3 w-20" />
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      <ul role="list" className="space-y-2 sm:space-y-3">
        {members.map((member: Member, index: number) => {
          const name = member?.userId?.name || "";
          const initials = getAvatarFallbackText(name);
          const avatarColor = getAvatarColor(name);
          return (
            <motion.li
              key={member._id}
              role="listitem"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 rounded-lg border border-border hover:shadow-md transition-all duration-200"
            >
              {/* Avatar and Member Info */}
              <div className="flex items-center gap-3 sm:gap-4 flex-grow">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="cursor-pointer"
                        >
                          <Avatar className="h-8 w-8 sm:h-9 sm:w-9 ring-2 ring-transparent hover:ring-primary/20 transition-all">
                            <AvatarImage
                              src={member.userId.profilePicture || ""}
                              alt="Avatar"
                            />
                            <AvatarFallback
                              className={`${avatarColor} text-white font-semibold text-xs sm:text-sm`}
                            >
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-medium">{member.userId.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Team member
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Member Name and Role */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-medium text-foreground truncate">
                    {member.userId.name}
                  </p>
                  <div className="mt-1">
                    <Badge
                      variant="outline"
                      className={`flex w-fit items-center gap-1 text-xs font-medium ${getRoleColor(
                        member.role.name
                      )}`}
                    >
                      <User className="w-3 h-3" />
                      {member.role.name}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Joined Date */}
              <div className="text-xs sm:text-sm text-muted-foreground text-right flex-shrink-0">
                <p className="font-medium">Joined</p>
                <p>
                  {member.joinedAt
                    ? format(
                        new Date(member.joinedAt),
                        window.innerWidth >= 640 ? "PPP" : "MMM d"
                      )
                    : null}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentMembers;
