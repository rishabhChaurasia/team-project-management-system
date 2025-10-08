import CreateTaskDialog from "@/pages/dashboard/tasks/CreateTaskDialog";
import TaskTable from "@/pages/dashboard/tasks/TaskTable";
import { useGetCurrentUserQuery } from "@/redux/rtk-query/authApi";
import { useGetWorkspaceMembersQuery } from "@/redux/rtk-query/workspaceApi";
import { useParams } from "react-router-dom";

export default function Tasks() {
  const { workspaceId } = useParams();
  const { data: currentUserData } = useGetCurrentUserQuery(undefined);
  const { data: membersData } = useGetWorkspaceMembersQuery(workspaceId!);

  const members = membersData?.members || [];
  const currentUser = members.find(
    (member: any) => member.userId._id === currentUserData?.user?._id
  );
  const canCreateTask =
    currentUser?.role.name === "OWNER" || currentUser?.role.name === "ADMIN";
  return (
    <div className="w-full h-full flex-col space-y-4 sm:space-y-8 p-3 sm:pt-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-2">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            All Tasks
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Here&apos;s the list of tasks for this workspace!
          </p>
        </div>
        {canCreateTask && (
          <div className="flex-shrink-0">
            <CreateTaskDialog workspaceId={workspaceId!} />
          </div>
        )}
      </div>
      {/* Task Table */}
      <div className="overflow-hidden">
        <TaskTable workspaceId={workspaceId!} />
      </div>
    </div>
  );
}
