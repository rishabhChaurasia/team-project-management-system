import CreateTaskDialog from "@/pages/dashboard/tasks/CreateTaskDialog";
import TaskTable from "@/pages/dashboard/tasks/TaskTable";
import { useParams } from "react-router-dom";

export default function Tasks() {
  const { workspaceId } = useParams();
  return (
    <div className="w-full h-full flex-col space-y-8 pt-3">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Tasks</h2>
          <p className="text-muted-foreground">
            Here&apos;s the list of tasks for this workspace!
          </p>
        </div>
        <CreateTaskDialog workspaceId={workspaceId!} />
      </div>
      {/* Task Table */}
      <div>
        <TaskTable />
      </div>
    </div>
  );
}
