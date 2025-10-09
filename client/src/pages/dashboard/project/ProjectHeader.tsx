import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import CreateTaskDialog from "../tasks/CreateTaskDialog";
import EditProjectDialog from "./EditProjectDialog";
import { useGetProjectByIdAndWorkspaceIdQuery } from "@/redux/rtk-query/projectApi";
import { useGetWorkspaceMembersQuery } from "@/redux/rtk-query/workspaceApi";
import { useGetCurrentUserQuery } from "@/redux/rtk-query/authApi";

interface ProjectHeaderProps {
  workspaceId: string;
  projectId: string;
}

const ProjectHeader = ({ workspaceId, projectId }: ProjectHeaderProps) => {
  const { data: projectData, isLoading } = useGetProjectByIdAndWorkspaceIdQuery(
    {
      id: projectId,
      workspaceId,
    }
  );

  const { data: currentUserData } = useGetCurrentUserQuery(undefined);
  const { data: membersData } = useGetWorkspaceMembersQuery(workspaceId);

  const members = membersData?.members || [];
  const currentUser = members.find(
    (member: any) => member.userId._id === currentUserData?.user?._id
  );
  const canEditAndCreateTask =
    currentUser?.role.name === "OWNER" || currentUser?.role.name === "ADMIN";

  if (isLoading) {
    return (
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
            <Skeleton className="w-6 h-6 sm:w-8 sm:h-8 rounded flex-shrink-0" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Skeleton className="h-6 sm:h-7 w-32 sm:w-48" />
                <Skeleton className="h-6 w-6 sm:h-8 sm:w-8 rounded flex-shrink-0" />
              </div>
              <Skeleton className="h-3 sm:h-4 w-full max-w-xs sm:max-w-md" />
            </div>
          </div>
          <Skeleton className="h-9 sm:h-10 w-28 sm:w-32 mt-2 sm:mt-0" />
        </div>
      </div>
    );
  }

  const project = projectData?.project;

  if (!project) {
    return null;
  }

  const projectEmoji = project.emoji;
  const projectName = project.name;

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div
        className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-start sm:justify-between"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
          <motion.span
            className="text-lg sm:text-xl lg:text-2xl flex-shrink-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
          >
            {projectEmoji}
          </motion.span>
          <div className="min-w-0 flex-1 space-y-1 sm:space-y-2">
            <motion.div
              className="flex items-center gap-2 flex-wrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
            >
              <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold tracking-tight truncate">
                {projectName}
              </h1>
              {canEditAndCreateTask && (
                <div className="flex-shrink-0">
                  <EditProjectDialog project={project} />
                </div>
              )}
            </motion.div>
            <motion.p
              className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {project.description}
            </motion.p>
          </div>
        </div>
        {canEditAndCreateTask && (
          <motion.div
            className="flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.3 }}
          >
            <CreateTaskDialog projectId={projectId} />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProjectHeader;
