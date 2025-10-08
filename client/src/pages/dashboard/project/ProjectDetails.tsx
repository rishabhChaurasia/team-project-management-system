import { Separator } from "@/components/ui/separator";
import ProjectAnalyticsCard from "./ProjectAnalyticsCard";
import ProjectHeader from "./ProjectHeader";
// import TaskTable from "../tasks/TaskTable";

const ProjectDetails = () => {
  return (
    <div className="w-full space-y-6 py-4 md:pt-3">
      <ProjectHeader />
      <div className="space-y-5">
        <ProjectAnalyticsCard title="Total Tasks" value={12} isLoading={false} />
        <Separator />
        {/* Task Table */}
        {/* <TaskTable /> */}
      </div>
    </div>
  );
};

export default ProjectDetails;