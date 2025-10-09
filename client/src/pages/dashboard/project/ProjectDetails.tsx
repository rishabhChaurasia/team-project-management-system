import { Separator } from "@/components/ui/separator";
import ProjectAnalyticsCard from "./ProjectAnalyticsCard";
import ProjectHeader from "./ProjectHeader";
import ProjectTaskTable from "./ProjectTaskTable";
import { useParams } from "react-router-dom";
import { useGetProjectAnalyticsQuery } from "@/redux/rtk-query/projectApi";

const ProjectDetails = () => {
  const { workspaceId, projectId } = useParams();
  
  const { data: analyticsData, isLoading: analyticsLoading } = useGetProjectAnalyticsQuery({
    id: projectId!,
    workspaceId: workspaceId!,
  });

  const analytics = analyticsData?.analytics;

  return (
    <div className="w-full space-y-6 py-4 md:pt-3">
      <ProjectHeader workspaceId={workspaceId!} projectId={projectId!} />
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProjectAnalyticsCard
            title="Total Tasks"
            value={analytics?.totalTasks || 0}
            isLoading={analyticsLoading}
          />
          <ProjectAnalyticsCard
            title="Completed Tasks"
            value={analytics?.completedTasks || 0}
            isLoading={analyticsLoading}
          />
          <ProjectAnalyticsCard
            title="Overdue Tasks"
            value={analytics?.overdueTasks || 0}
            isLoading={analyticsLoading}
          />
        </div>
        <Separator />
        <ProjectTaskTable workspaceId={workspaceId!} projectId={projectId!} />
      </div>
    </div>
  );
};

export default ProjectDetails;
