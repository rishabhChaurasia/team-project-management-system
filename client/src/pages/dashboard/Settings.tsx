import WorkspaceHeader from "./workspace/WorkspaceHeader";
import EditWorkspaceForm from "./workspace/EditWorkspaceForm";
import DeleteWorkspaceCard from "./workspace/DeleteWorkspaceCard";
import { useParams, Navigate } from "react-router-dom";
import {
  useGetWorkspaceByIdQuery,
  useGetWorkspaceMembersQuery,
} from "@/redux/rtk-query/workspaceApi";
import { useGetCurrentUserQuery } from "@/redux/rtk-query/authApi";
import { Skeleton } from "@/components/ui/skeleton";

const Settings = () => {
  const { workspaceId } = useParams();
  const { data: workspaceData, isLoading } = useGetWorkspaceByIdQuery(
    workspaceId!
  );
  const { data: currentUserData } = useGetCurrentUserQuery(undefined);
  const { data: membersData, isLoading: membersLoading } =
    useGetWorkspaceMembersQuery(workspaceId!);

  const members = membersData?.members || [];
  const currentUser = members.find(
    (member: any) => member.userId._id === currentUserData?.user?._id
  );
  const canEditWorkspace =
    currentUser?.role.name === "OWNER" || currentUser?.role.name === "ADMIN";
  const canDeleteWorkspace = currentUser?.role.name === "OWNER";

  const showEditFormLoading = membersLoading || !currentUser;

  if (!membersLoading && currentUser && !canEditWorkspace) {
    return (
      <Navigate
        to={`/workspace/${currentUserData?.user?.currentWorkspace?._id}`}
        replace
      />
    );
  }

  return (
    <div className="w-full h-auto py-2 px-4 sm:px-6 lg:px-8">
      <WorkspaceHeader
        workspace={workspaceData?.workspace}
        isLoading={isLoading}
      />
      <main className="mt-4 sm:mt-6">
        <div className="w-full max-w-3xl mx-auto py-3">
          <h2 className="text-lg sm:text-[20px] leading-[28px] sm:leading-[30px] font-semibold mb-4 sm:mb-6 text-center sm:text-left">
            Workspace settings
          </h2>

          <div className="flex flex-col space-y-6 sm:space-y-8">
            {showEditFormLoading ? (
              <div className="w-full h-auto max-w-full px-4 sm:px-6 lg:px-0">
                <div className="mb-4 sm:mb-5 border-b pb-3 sm:pb-4">
                  <h1 className="text-base sm:text-[17px] tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1.5 text-center sm:text-left">
                    Edit Workspace
                  </h1>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-[44px] sm:h-[48px] w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-[44px] sm:h-[48px] w-full" />
                  </div>
                  <div className="flex justify-center sm:justify-end">
                    <Skeleton className="h-[44px] sm:h-[40px] w-full sm:w-32" />
                  </div>
                </div>
              </div>
            ) : canEditWorkspace ? (
              <div className="w-full">
                <EditWorkspaceForm
                  workspaceId={workspaceId!}
                  workspace={workspaceData?.workspace}
                  isLoading={isLoading}
                />
              </div>
            ) : null}
            {canDeleteWorkspace && (
              <div className="w-full">
                <DeleteWorkspaceCard workspaceId={workspaceId!} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
