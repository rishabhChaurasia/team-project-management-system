import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format } from "date-fns";
import { Loader, Circle, Clock, CheckCircle, AlertTriangle, Minus, ArrowUp } from "lucide-react";
import { motion } from "motion/react";

const RecentTasks = () => {
  const isLoading = false;

  // Dummy tasks data
  const tasks = [
    {
      _id: "1",
      taskCode: "TASK-001",
      title: "Design homepage layout",
      dueDate: new Date("2024-02-15"),
      status: "TODO",
      priority: "HIGH",
      assignedTo: {
        name: "John Doe",
        profilePicture: "",
      },
    },
    {
      _id: "2",
      taskCode: "TASK-002",
      title: "Implement user authentication",
      dueDate: new Date("2024-02-20"),
      status: "IN_PROGRESS",
      priority: "MEDIUM",
      assignedTo: {
        name: "Jane Smith",
        profilePicture: "",
      },
    },
    {
      _id: "3",
      taskCode: "TASK-003",
      title: "Write API documentation",
      dueDate: new Date("2024-02-10"),
      status: "DONE",
      priority: "LOW",
      assignedTo: {
        name: "Mike Johnson",
        profilePicture: "",
      },
    },
  ];

  const getAvatarFallbackText = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const transformStatusEnum = (status: string) => {
    return status.replace("_", " ").toLowerCase();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "TODO":
        return <Circle className="w-3 h-3" />;
      case "IN_PROGRESS":
        return <Clock className="w-3 h-3" />;
      case "DONE":
        return <CheckCircle className="w-3 h-3" />;
      default:
        return <Circle className="w-3 h-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "TODO":
        return "text-muted-foreground border-border";
      case "IN_PROGRESS":
        return "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950 dark:border-blue-800";
      case "DONE":
        return "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800";
      default:
        return "text-muted-foreground";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return <AlertTriangle className="w-3 h-3" />;
      case "MEDIUM":
        return <ArrowUp className="w-3 h-3" />;
      case "LOW":
        return <Minus className="w-3 h-3" />;
      default:
        return <Minus className="w-3 h-3" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800";
      case "MEDIUM":
        return "text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950 dark:border-orange-800";
      case "LOW":
        return "text-muted-foreground border-border";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {isLoading ? (
        <Loader
          className="w-8 h-8 
        animate-spin
        place-self-center flex
        "
        />
      ) : null}

      {tasks?.length === 0 && (
        <div
          className="font-semibold
         text-sm text-muted-foreground
          text-center py-5"
        >
          No Task created yet
        </div>
      )}

      <ul role="list" className="divide-y divide-border">
        {tasks.map((task, index) => {
          const name = task?.assignedTo?.name || "";
          const initials = getAvatarFallbackText(name);
          const avatarColor = getAvatarColor(name);
          return (
            <motion.li
              key={task._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between transition-colors rounded-lg"
            >
              {/* Task Info */}
              <div className="flex flex-col space-y-1 flex-grow min-w-0">
                <span className="text-xs sm:text-sm capitalize text-muted-foreground font-medium">
                  {task.taskCode}
                </span>
                <p className="text-sm sm:text-md font-semibold text-foreground truncate">
                  {task.title}
                </p>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  Due: {task.dueDate ? format(task.dueDate, "MMM d") : null}
                </span>
              </div>

              {/* Mobile: Status, Priority, and Assignee in row */}
              <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-2">
                {/* Task Status */}
                <Badge
                  variant="outline"
                  className={`flex w-auto p-1 px-2 sm:px-3 gap-1 sm:gap-2 font-medium shadow-sm capitalize text-xs sm:text-sm ${getStatusColor(task.status)}`}
                >
                  {getStatusIcon(task.status)}
                  <span>{transformStatusEnum(task.status)}</span>
                </Badge>

                {/* Task Priority */}
                <Badge
                  variant="outline"
                  className={`flex w-auto p-1 px-2 sm:px-3 gap-1 sm:gap-2 font-medium shadow-sm capitalize text-xs sm:text-sm ${getPriorityColor(task.priority)}`}
                >
                  {getPriorityIcon(task.priority)}
                  <span>{transformStatusEnum(task.priority)}</span>
                </Badge>

                {/* Assignee */}
                <div className="flex items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="cursor-pointer"
                        >
                          <Avatar className="h-6 w-6 sm:h-8 sm:w-8 ring-2 ring-transparent hover:ring-primary/20 transition-all">
                            <AvatarImage
                              src={task.assignedTo?.profilePicture || ""}
                              alt={task.assignedTo?.name}
                            />
                            <AvatarFallback className={`${avatarColor} text-white font-semibold text-xs sm:text-sm`}>
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-medium">{task.assignedTo?.name}</p>
                        <p className="text-xs text-muted-foreground">Assigned to</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentTasks;
