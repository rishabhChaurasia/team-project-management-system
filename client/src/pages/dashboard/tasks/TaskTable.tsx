import { useState, useEffect, useRef } from "react";
import type { FC } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  X,
  Search,
  Filter,
  Loader2,
  Circle,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowUp,
  Minus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";

// Helper functions for status and priority
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

// Dummy DataTable component
const DataTable = ({ data, isLoading, filtersToolbar }: any) => (
  <motion.div
    className="space-y-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
  >
    {filtersToolbar}
    <motion.div
      className="border border-border/50 rounded-xl shadow-sm bg-gradient-to-br from-card/95 to-background/95 overflow-hidden backdrop-blur-sm hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
    >
      <div className="p-6 lg:p-8">
        {isLoading ? (
          <motion.div
            className="flex items-center justify-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="h-8 w-8 text-muted-foreground" />
              </motion.div>
              <motion.p
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Loading tasks...
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <motion.div
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-foreground">Tasks</h3>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                >
                  <Badge
                    variant="secondary"
                    className="text-xs font-medium px-2.5 py-1"
                  >
                    {data.length} {data.length === 1 ? "task" : "tasks"}
                  </Badge>
                </motion.div>
              </div>
            </motion.div>
            <AnimatePresence mode="wait">
              {data.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-center py-12"
                >
                  <motion.p
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    No tasks found
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {data.map((task: any, index: number) => (
                    <motion.div
                      key={task._id}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 0.95 }}
                      transition={{
                        delay: index * 0.08,
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="border border-border/40 rounded-xl p-5 bg-gradient-to-br from-background/80 to-muted/20 hover:from-background/90 hover:to-muted/30 hover:border-border/60 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <motion.h4
                            className="font-medium text-foreground"
                            layoutId={`title-${task._id}`}
                          >
                            {task.title}
                          </motion.h4>
                          {task.description && (
                            <motion.p
                              className="text-sm text-muted-foreground line-clamp-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.08 + 0.1 }}
                            >
                              {task.description}
                            </motion.p>
                          )}
                          <motion.div
                            className="flex flex-wrap items-center gap-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: index * 0.08 + 0.2,
                              duration: 0.3,
                            }}
                          >
                            <Badge
                              variant="outline"
                              className={`flex w-auto p-1 px-2 gap-1 font-medium shadow-sm capitalize text-xs ${getStatusColor(
                                task.status
                              )}`}
                            >
                              {getStatusIcon(task.status)}
                              <span>
                                {task.status.replace("_", " ").toLowerCase()}
                              </span>
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`flex w-auto p-1 px-2 gap-1 font-medium shadow-sm capitalize text-xs ${getPriorityColor(
                                task.priority
                              )}`}
                            >
                              {getPriorityIcon(task.priority)}
                              <span>{task.priority.toLowerCase()}</span>
                            </Badge>
                            <div className="flex items-center gap-1.5">
                              <Avatar className="h-5 w-5">
                                <AvatarImage
                                  src={task.assignedTo.profilePicture}
                                />
                                <AvatarFallback className="text-xs">
                                  {task.assignedTo.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">
                                {task.assignedTo.name}
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  </motion.div>
);

// Dummy DataTableFacetedFilter component
const DataTableFacetedFilter = ({ title, disabled, hasSelection }: any) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -1 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <Button
      variant={hasSelection ? "default" : "outline"}
      size="sm"
      className={`h-9 px-3 font-medium transition-all duration-300 ${
        hasSelection
          ? "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 shadow-sm"
          : "border-dashed border-border/60 hover:bg-accent/60 hover:border-primary/40 hover:shadow-sm"
      }`}
      disabled={disabled}
    >
      <motion.div
        initial={{ rotate: 0 }}
        whileHover={{ rotate: hasSelection ? 0 : 15 }}
        transition={{ duration: 0.2 }}
      >
        <Filter
          className={`mr-2 h-3.5 w-3.5 ${hasSelection ? "text-primary" : ""}`}
        />
      </motion.div>
      <span className="text-sm">{title}</span>
      {hasSelection && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="ml-1 h-1.5 w-1.5 bg-primary rounded-full"
        />
      )}
    </Button>
  </motion.div>
);

// Dummy priorities and statuses
const priorities = [
  { label: "Low", value: "LOW" },
  { label: "Medium", value: "MEDIUM" },
  { label: "High", value: "HIGH" },
  { label: "Urgent", value: "URGENT" },
];

const statuses = [
  { label: "Todo", value: "TODO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "In Review", value: "IN_REVIEW" },
  { label: "Done", value: "DONE" },
];

type Filters = {
  keyword: string | null;
  status: string | null;
  priority: string | null;
  projectId: string | null;
  assigneeId: string | null;
};

type SetFilters = (filters: Partial<Filters>) => void;

interface DataTableFilterToolbarProps {
  isLoading?: boolean;
  projectId?: string;
  filters: Filters;
  setFilters: SetFilters;
}

const TaskTable = () => {
  const { projectId } = useParams();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<Filters>({
    keyword: null,
    status: null,
    priority: null,
    projectId: null,
    assigneeId: null,
  });

  // Dummy task data
  const tasks = [
    {
      _id: "1",
      title: "Design Homepage",
      description: "Create wireframes and mockups",
      status: "IN_PROGRESS",
      priority: "HIGH",
      dueDate: "2024-01-15",
      assignedTo: { _id: "1", name: "John Doe", profilePicture: "" },
      project: { _id: "1", name: "Website Redesign", emoji: "🎨" },
    },
    {
      _id: "2",
      title: "API Integration",
      description: "Connect frontend with backend",
      status: "TODO",
      priority: "MEDIUM",
      dueDate: "2024-01-20",
      assignedTo: { _id: "2", name: "Jane Smith", profilePicture: "" },
      project: { _id: "2", name: "Mobile App", emoji: "📱" },
    },
  ];

  const totalCount = tasks.length;
  const isLoading = false;

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
  };

  const handleSetFilters = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <motion.div
      className="w-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <DataTable
        isLoading={isLoading}
        data={tasks}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pagination={{
          totalCount,
          pageNumber,
          pageSize,
        }}
        filtersToolbar={
          <DataTableFilterToolbar
            isLoading={isLoading}
            projectId={projectId}
            filters={filters}
            setFilters={handleSetFilters}
          />
        }
      />
    </motion.div>
  );
};

const DataTableFilterToolbar: FC<DataTableFilterToolbarProps> = ({
  isLoading,
  projectId,
  filters,
  setFilters,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
  // Dummy projects data
  const projects = [
    { _id: "1", name: "Website Redesign", emoji: "🎨" },
    { _id: "2", name: "Mobile App", emoji: "📱" },
    { _id: "3", name: "Marketing Campaign", emoji: "📈" },
  ];

  // Dummy members data
  const members = [
    { userId: { _id: "1", name: "John Doe", profilePicture: "" } },
    { userId: { _id: "2", name: "Jane Smith", profilePicture: "" } },
    { userId: { _id: "3", name: "Mike Johnson", profilePicture: "" } },
  ];

  const projectOptions = projects.map((project) => ({
    label: (
      <div className="flex items-center gap-1">
        <span>{project.emoji}</span>
        <span>{project.name}</span>
      </div>
    ),
    value: project._id,
  }));

  const assigneesOptions = members.map((member) => {
    const name = member.userId?.name || "Unknown";
    const initials = name.charAt(0);

    return {
      label: (
        <div className="flex items-center space-x-2">
          <Avatar className="h-7 w-7">
            <AvatarImage src={member.userId?.profilePicture || ""} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span>{name}</span>
        </div>
      ),
      value: member.userId._id,
    };
  });

  const handleFilterChange = (key: keyof Filters, values: string[]) => {
    setFilters({
      [key]: values.length > 0 ? values.join(",") : null,
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== null && value !== ""
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col lg:flex-row w-full items-start gap-4 p-5 bg-gradient-to-br from-background/95 via-muted/30 to-background/95 rounded-xl border border-border/50 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <motion.div
        className="relative flex-1 max-w-sm group"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <motion.div
          className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <Search
            className={`h-4 w-4 transition-colors duration-200 ${
              filters.keyword ? "text-primary" : "text-muted-foreground"
            }`}
          />
        </motion.div>
        <Input
          ref={searchInputRef}
          placeholder="Search tasks..."
          value={filters.keyword || ""}
          onChange={(e) =>
            setFilters({
              keyword: e.target.value,
            })
          }
          className="h-10 pl-9 pr-12 bg-background/90 backdrop-blur-sm border-border/60 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 hover:border-border transition-all duration-300 shadow-sm focus:shadow-md placeholder:text-muted-foreground/70"
          disabled={isLoading}
        />
        <motion.div
          className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: filters.keyword ? 0.3 : 0.6 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-muted/50 rounded text-xs text-muted-foreground font-mono border border-border/30">
            ⌘K
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex flex-wrap items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {["Status", "Priority", "Assigned To"].map((title, index) => {
          const hasSelection =
            filters[
              title === "Status"
                ? "status"
                : title === "Priority"
                ? "priority"
                : "assigneeId"
            ];
          return (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
            >
              <DataTableFacetedFilter
                title={title}
                hasSelection={!!hasSelection}
                multiSelect={true}
                options={
                  title === "Status"
                    ? statuses
                    : title === "Priority"
                    ? priorities
                    : assigneesOptions
                }
                disabled={isLoading}
                selectedValues={
                  filters[
                    title === "Status"
                      ? "status"
                      : title === "Priority"
                      ? "priority"
                      : "assigneeId"
                  ]?.split(",") || []
                }
                onFilterChange={(values: string[]) =>
                  handleFilterChange(
                    title === "Status"
                      ? "status"
                      : title === "Priority"
                      ? "priority"
                      : "assigneeId",
                    values
                  )
                }
              />
            </motion.div>
          );
        })}

        {!projectId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <DataTableFacetedFilter
              title="Projects"
              hasSelection={!!filters.projectId}
              multiSelect={false}
              options={projectOptions}
              disabled={isLoading}
              selectedValues={filters.projectId?.split(",") || []}
              onFilterChange={(values: string[]) =>
                handleFilterChange("projectId", values)
              }
            />
          </motion.div>
        )}

        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  disabled={isLoading}
                  variant="ghost"
                  size="sm"
                  className="h-9 px-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/20 transition-all duration-300 font-medium"
                  onClick={() =>
                    setFilters({
                      keyword: null,
                      status: null,
                      priority: null,
                      projectId: null,
                      assigneeId: null,
                    })
                  }
                >
                  Reset
                  <motion.div
                    className="ml-1.5"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-3.5 w-3.5" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default TaskTable;
