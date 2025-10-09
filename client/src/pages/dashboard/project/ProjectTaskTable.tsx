import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useGetAllTasksQuery } from "@/redux/rtk-query/taskApi";
import { useGetWorkspaceMembersQuery } from "@/redux/rtk-query/workspaceApi";
import { useGetCurrentUserQuery } from "@/redux/rtk-query/authApi";
import DeleteTaskDialog from "../tasks/DeleteTaskDialog";
import EditTaskDialog from "../tasks/EditTaskDialog";
import ViewTaskDialog from "../tasks/ViewTaskDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  X,
  Search,
  Filter,
  Circle,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowUp,
  Minus,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

import { motion, AnimatePresence } from "motion/react";

// Helper functions for status and priority
const getStatusIcon = (status: string) => {
  switch (status) {
    case "BACKLOG":
      return <Circle className="w-3 h-3" />;
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
    case "BACKLOG":
      return "text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-950 dark:border-gray-800";
    case "TODO":
      return "text-muted-foreground border-border";
    case "IN_PROGRESS":
      return "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950 dark:border-blue-800";
    case "IN_REVIEW":
      return "text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950 dark:border-yellow-800";
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

// DataTable component
const DataTable = ({
  data,
  isLoading,
  filtersToolbar,
  pagination,
  onPageChange,
  workspaceId,
}: any) => {
  const { data: currentUserData } = useGetCurrentUserQuery(undefined);
  const { data: membersData } = useGetWorkspaceMembersQuery(workspaceId);

  const members = membersData?.members || [];
  const currentUser = members.find(
    (member: any) => member.userId._id === currentUserData?.user?._id
  );
  const canEditDelete =
    currentUser?.role.name === "OWNER" || currentUser?.role.name === "ADMIN";
  return (
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
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="border border-border/40 rounded-xl p-5 bg-gradient-to-br from-background/80 to-muted/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-16" />
                        <div className="flex items-center gap-1.5">
                          <Skeleton className="h-5 w-5 rounded-full" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
                  <h3 className="text-xl font-semibold text-foreground">
                    Project Tasks
                  </h3>
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
                          <div className="flex items-center gap-1">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                delay: index * 0.08 + 0.25,
                                duration: 0.3,
                              }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <ViewTaskDialog
                                taskId={task._id}
                                projectId={task.project._id}
                                workspaceId={workspaceId}
                              />
                            </motion.div>
                            {canEditDelete && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  delay: index * 0.08 + 0.3,
                                  duration: 0.3,
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <EditTaskDialog
                                  task={task}
                                  workspaceId={workspaceId}
                                />
                              </motion.div>
                            )}
                            {canEditDelete && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  delay: index * 0.08 + 0.35,
                                  duration: 0.3,
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <DeleteTaskDialog
                                  taskId={task._id}
                                  workspaceId={workspaceId}
                                  taskTitle={task.title}
                                />
                              </motion.div>
                            )}
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
        {!isLoading &&
          data.length > 0 &&
          (() => {
            const totalPages = Math.ceil(
              pagination.totalCount / pagination.pageSize
            );
            const currentPage = pagination.pageNumber;

            const getVisiblePages = () => {
              if (totalPages <= 7)
                return Array.from({ length: totalPages }, (_, i) => i + 1);

              if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
              if (currentPage >= totalPages - 3)
                return [
                  1,
                  "...",
                  totalPages - 4,
                  totalPages - 3,
                  totalPages - 2,
                  totalPages - 1,
                  totalPages,
                ];
              return [
                1,
                "...",
                currentPage - 1,
                currentPage,
                currentPage + 1,
                "...",
                totalPages,
              ];
            };

            return (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-border/50">
                <div className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * pagination.pageSize + 1} to{" "}
                  {Math.min(
                    currentPage * pagination.pageSize,
                    pagination.totalCount
                  )}{" "}
                  of {pagination.totalCount} tasks
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          currentPage > 1 && onPageChange(currentPage - 1)
                        }
                        className={
                          currentPage <= 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer hover:bg-accent"
                        }
                      />
                    </PaginationItem>
                    {getVisiblePages().map((page, index) => (
                      <PaginationItem key={index}>
                        {page === "..." ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            onClick={() => onPageChange(page as number)}
                            isActive={currentPage === page}
                            className="cursor-pointer hover:bg-accent"
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          currentPage < totalPages &&
                          onPageChange(currentPage + 1)
                        }
                        className={
                          currentPage >= totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer hover:bg-accent"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            );
          })()}
      </motion.div>
    </motion.div>
  );
};

// DataTableFacetedFilter component
const DataTableFacetedFilter = ({
  title,
  disabled,
  hasSelection,
  options,
  selectedValues,
  onFilterChange,
  multiSelect,
}: any) => {
  const [open, setOpen] = useState(false);

  const handleValueChange = (value: string, checked: boolean) => {
    if (!multiSelect) {
      onFilterChange(checked ? [value] : []);
      return;
    }
    const newValues = checked
      ? [...selectedValues, value]
      : selectedValues.filter((v: string) => v !== value);
    onFilterChange(newValues);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={hasSelection ? "default" : "outline"}
          size="sm"
          className={`h-9 px-3 font-medium ${
            hasSelection
              ? "bg-primary/10 border-primary/30 text-primary shadow-sm hover:bg-primary/10"
              : "border-dashed border-border/60"
          }`}
          disabled={disabled}
        >
          <Filter
            className={`mr-2 h-3.5 w-3.5 ${hasSelection ? "text-primary" : ""}`}
          />
          <span className="text-sm">{title}</span>
          {hasSelection && (
            <div className="ml-1 h-1.5 w-1.5 bg-primary rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 sm:w-48 p-2" align="start">
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {options.map((option: any, index: number) => {
            const isSelected = selectedValues.includes(option.value);
            const isDisabled =
              !multiSelect && selectedValues.length > 0 && !isSelected;
            return (
              <motion.div
                key={option.value}
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                <Checkbox
                  id={option.value}
                  checked={isSelected}
                  disabled={isDisabled}
                  onCheckedChange={(checked) =>
                    handleValueChange(option.value, !!checked)
                  }
                />
                <label
                  htmlFor={option.value}
                  className={`text-sm font-medium leading-none cursor-pointer ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {option.label}
                </label>
              </motion.div>
            );
          })}
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};

// Dummy priorities and statuses
const priorities = [
  { label: "Low", value: "LOW" },
  { label: "Medium", value: "MEDIUM" },
  { label: "High", value: "HIGH" },
];

const statuses = [
  { label: "Backlog", value: "BACKLOG" },
  { label: "Todo", value: "TODO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "In Review", value: "IN_REVIEW" },
  { label: "Done", value: "DONE" },
];

type Filters = {
  keyword: string | null;
  status: string | null;
  priority: string | null;
  assigneeId: string | null;
};

type SetFilters = (filters: Partial<Filters>) => void;

interface DataTableFilterToolbarProps {
  isLoading?: boolean;
  filters: Filters;
  setFilters: SetFilters;
  searchInput: string;
  setSearchInput: (value: string) => void;
  workspaceId: string;
}

const DataTableFilterToolbar = ({
  isLoading,
  filters,
  setFilters,
  searchInput,
  setSearchInput,
  workspaceId,
}: DataTableFilterToolbarProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { data: membersData } = useGetWorkspaceMembersQuery(workspaceId);

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

  const handleFilterChange = useCallback(
    (key: keyof Filters, values: string[]) => {
      setFilters({
        [key]: values.length > 0 ? values.join(",") : null,
      });
    },
    [setFilters]
  );

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== null && value !== ""
  );

  const assigneesOptions = useMemo(
    () =>
      (membersData?.members || []).map((member: any) => {
        const name = member.userId?.name || "Unknown";
        const initials = name.charAt(0);

        return {
          label: (
            <div className="flex items-center space-x-2">
              <Avatar className="h-7 w-7">
                <AvatarImage
                  src={member.userId?.profilePicture || ""}
                  alt={name}
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span>{name}</span>
            </div>
          ),
          value: member.userId._id,
        };
      }),
    [membersData?.members]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col lg:flex-row w-full items-start gap-4 p-5 bg-gradient-to-br from-background/95 via-muted/30 to-background/95 rounded-xl border border-border/50 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <motion.div
        className="relative flex-1 w-full sm:max-w-sm group"
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
              searchInput ? "text-primary" : "text-muted-foreground"
            }`}
          />
        </motion.div>
        <Input
          ref={searchInputRef}
          placeholder="Search tasks..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="h-10 pl-9 pr-12 bg-background/90 backdrop-blur-sm border-border/60 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 hover:border-border transition-all duration-300 shadow-sm focus:shadow-md placeholder:text-muted-foreground/70"
          disabled={isLoading}
        />
        <motion.div
          className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: searchInput ? 0.3 : 0.6 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-muted/50 rounded text-xs text-muted-foreground font-mono border border-border/30">
            ⌘K
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto"
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
                multiSelect={false}
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

interface ProjectTaskTableProps {
  workspaceId: string;
  projectId: string;
}

const ProjectTaskTable = ({
  workspaceId,
  projectId,
}: ProjectTaskTableProps) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState<Filters>({
    keyword: null,
    status: null,
    priority: null,
    assigneeId: null,
  });

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev: any) => ({
        ...prev,
        keyword: searchInput || null,
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data: tasksData, isLoading } = useGetAllTasksQuery({
    workspaceId,
    projectId,
    pageSize,
    pageNumber,
    status: filters.status,
    priority: filters.priority,
    assignedTo: filters.assigneeId,
    keyword: filters.keyword,
  });

  const tasks = tasksData?.tasks || [];
  const totalCount = tasksData?.pagination?.totalCount || 0;

  const handlePageChange = useCallback((page: number) => {
    setPageNumber(page);
  }, []);

  const handleSetFilters = useCallback((newFilters: Partial<Filters>) => {
    setFilters((prev: Filters) => ({ ...prev, ...newFilters }));
  }, []);

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
        workspaceId={workspaceId}
        pagination={{
          totalCount,
          pageNumber,
          pageSize,
        }}
        filtersToolbar={
          <DataTableFilterToolbar
            isLoading={isLoading}
            filters={filters}
            setFilters={handleSetFilters}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            workspaceId={workspaceId}
          />
        }
      />
    </motion.div>
  );
};

export default ProjectTaskTable;
