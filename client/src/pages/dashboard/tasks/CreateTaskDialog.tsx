import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, CalendarIcon, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useCreateTaskMutation } from "@/redux/rtk-query/taskApi";
import { useGetAllProjectInWorkspaceQuery } from "@/redux/rtk-query/projectApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim(),
  project: z.string().min(1, "Project is required"),
  assignee: z.string().min(1, "Assignee is required"),
  status: z.string().min(1, "Status is required"),
  priority: z.string().min(1, "Priority is required"),
  dueDate: z.date(),
});

const CreateTaskDialog = (props: { projectId?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Task</span>
              <span className="sm:hidden">Task</span>
            </Button>
          </motion.div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg w-[95vw] max-w-[95vw] sm:w-full max-h-[95vh] overflow-y-auto sm:overflow-y-hidden border-0 p-4 sm:p-6">
          <CreateTaskForm projectId={props.projectId} onClose={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTaskDialog;

function CreateTaskForm(props: { projectId?: string; onClose: () => void }) {
  const { projectId, onClose } = props;
  const { workspaceId } = useParams();
  const [createTask, { isLoading: isSubmitting }] = useCreateTaskMutation();
  const { data: projectsData, isLoading: isProjectsLoading } = useGetAllProjectInWorkspaceQuery(workspaceId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      project: "",
      assignee: "",
      status: "",
      priority: "",
      dueDate: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createTask({
        projectId: values.project,
        workspaceId,
        task: {
          title: values.title,
          description: values.description,
          priority: values.priority.toUpperCase(),
          status: values.status.toUpperCase(),
          assignedTo: values.assignee,
          dueDate: format(values.dueDate, "MM-dd-yyyy")
        }
      }).unwrap();
      toast.success("Task created successfully!");
      form.reset();
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create task!");
    }
  };

  // Set default project if projectId prop is provided
  useEffect(() => {
    if (projectId && !form.getValues("project")) {
      form.setValue("project", projectId);
    }
  }, [projectId, form]);

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-full">
        <motion.div
          className="mb-5 pb-2 border-b"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <DialogTitle className="text-lg sm:text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1 text-center sm:text-left">
            Create Task
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs sm:text-sm leading-tight text-center sm:text-left">
            Organize and manage tasks, resources, and team collaboration
          </DialogDescription>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-[#f1f7feb5] text-sm flex items-center gap-1">
                    Task title
                    {field.value?.trim() && (
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Website Redesign"
                      className={cn(
                        "h-10 sm:h-[48px] transition-colors",
                        field.value?.trim() && "border-green-500"
                      )}
                      {...field}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                    Task description
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Optional
                    </Badge>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={2}
                      placeholder="Add more details about this task..."
                      className="resize-none transition-colors"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground mt-1">
                    {field.value?.length || 0}/500 characters
                  </p>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
              <FormField
                control={form.control}
                name="project"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm flex items-center gap-1">
                      Project
                      {field.value && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "transition-colors",
                            field.value && "border-green-500"
                          )}
                        >
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isProjectsLoading ? (
                          <SelectItem value="loading" disabled>
                            Loading projects...
                          </SelectItem>
                        ) : projectsData?.projects?.length > 0 ? (
                          projectsData.projects.map((proj: any) => (
                            <SelectItem key={proj._id} value={proj._id}>
                              {proj.emoji} {proj.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-projects" disabled>
                            No projects found
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm flex items-center gap-1">
                      Assigned To
                      {field.value && (
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                      )}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "transition-colors",
                            field.value && "border-green-500"
                          )}
                        >
                          <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="68b937022a98954da341da6f">👨💻 John Doe</SelectItem>
                        <SelectItem value="2">👩🎨 Jane Smith</SelectItem>
                        <SelectItem value="3">👨💼 Mike Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm flex items-center gap-1">
                    Due Date
                    {field.value && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-10 justify-start font-normal transition-colors",
                            !field.value && "text-muted-foreground",
                            field.value && "border-green-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm flex items-center gap-1">
                      Status
                      {field.value && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "transition-colors",
                            field.value && "border-green-500"
                          )}
                        >
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="TODO">📋 Todo</SelectItem>
                        <SelectItem value="IN_PROGRESS">⚡ In Progress</SelectItem>
                        <SelectItem value="IN_REVIEW">👀 In Review</SelectItem>
                        <SelectItem value="DONE">✅ Done</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm flex items-center gap-1">
                      Priority
                      {field.value && (
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                      )}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "transition-colors",
                            field.value && "border-green-500"
                          )}
                        >
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="LOW">🟢 Low</SelectItem>
                        <SelectItem value="MEDIUM">🟡 Medium</SelectItem>
                        <SelectItem value="HIGH">🟠 High</SelectItem>
                        <SelectItem value="URGENT">🔴 Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
                type="button"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "Creating..." : "Create Task"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}