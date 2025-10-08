import { useState } from "react";
import { Eye, Calendar, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetTaskByIdQuery } from "@/redux/rtk-query/taskApi";
import { Skeleton } from "@/components/ui/skeleton";

interface ViewTaskDialogProps {
  taskId: string;
  projectId: string;
  workspaceId: string;
}

const ViewTaskDialog = ({
  taskId,
  projectId,
  workspaceId,
}: ViewTaskDialogProps) => {
  const [open, setOpen] = useState(false);

  const { data: taskData, isLoading } = useGetTaskByIdQuery(
    { id: taskId, projectId, workspaceId },
    { skip: !open }
  );

  const task = taskData?.task;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
          <DialogDescription>
            View complete task information and details
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        ) : task ? (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <h3 className="text-lg sm:text-xl font-semibold break-words">
                  {task.title}
                </h3>
                <Badge variant="secondary" className="text-xs font-mono w-fit">
                  {task.taskCode}
                </Badge>
              </div>
              {task.description ? (
                <p className="text-muted-foreground leading-relaxed">
                  {task.description}
                </p>
              ) : (
                <p className="text-muted-foreground italic">
                  No description provided
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3">
                <div className="flex items-start sm:items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <Badge variant="outline" className="mt-1">
                      {task.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start sm:items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">Assigned to</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="h-6 w-6 flex-shrink-0">
                        <AvatarImage src={task.assignedTo.profilePicture} />
                        <AvatarFallback className="text-xs">
                          {task.assignedTo.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm break-words">
                        {task.assignedTo.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="h-4 w-4 flex items-center justify-center">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        task.priority === "HIGH"
                          ? "bg-red-500"
                          : task.priority === "MEDIUM"
                          ? "bg-orange-500"
                          : "bg-green-500"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Priority</p>
                    <Badge variant="outline" className="mt-1">
                      {task.priority}
                    </Badge>
                  </div>
                </div>

                {task.dueDate && (
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Due Date</p>
                      <p className="text-sm mt-1">
                        {new Date(task.dueDate).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>Task not found</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewTaskDialog;
