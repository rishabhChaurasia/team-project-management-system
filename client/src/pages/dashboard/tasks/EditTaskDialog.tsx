import { useState, useEffect } from "react";
import { Edit, Loader } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateTaskMutation } from "@/redux/rtk-query/taskApi";
import { useGetWorkspaceMembersQuery } from "@/redux/rtk-query/workspaceApi";
import { toast } from "sonner";

const editTaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").trim(),
  status: z.string().min(1, "Status is required"),
  priority: z.string().min(1, "Priority is required"),
  assignedTo: z.string().min(1, "Assignee is required"),
});

type EditTaskForm = z.infer<typeof editTaskSchema>;

interface EditTaskDialogProps {
  task: any;
  workspaceId: string;
}

export default function EditTaskDialog({
  task,
  workspaceId,
}: EditTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  const { data: membersData, isLoading: membersLoading } =
    useGetWorkspaceMembersQuery(workspaceId);

  const form = useForm<EditTaskForm>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      title: task.title,
      status: task.status,
      priority: task.priority,
      assignedTo: task.assignedTo._id,
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = form;

  useEffect(() => {
    if (open) {
      reset({
        title: task.title,
        status: task.status,
        priority: task.priority,
        assignedTo: task.assignedTo._id,
      });
    }
  }, [open, task, reset]);

  const onSubmit = async (data: EditTaskForm) => {
    if (!isDirty) {
      toast.info("No changes to save");
      setOpen(false);
      return;
    }

    try {
      await updateTask({
        id: task._id,
        projectId: task.project._id,
        workspaceId,
        task: data,
      }).unwrap();

      toast.success("Task updated successfully!");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update task");
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      if (
        confirm("You have unsaved changes. Are you sure you want to cancel?")
      ) {
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
          onClick={() => setOpen(true)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </motion.div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Update task details including title, status, priority, and
              assignee.
            </DialogDescription>
          </DialogHeader>
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Label htmlFor="title">Title</Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="title"
                    className={errors.title ? "border-red-500" : ""}
                    placeholder="Enter task title..."
                    autoFocus={false}
                  />
                )}
              />
              <AnimatePresence>
                {errors.title && (
                  <motion.p
                    className="text-sm text-red-500"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.title.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={errors.status ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select status..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BACKLOG">🔄 Backlog</SelectItem>
                      <SelectItem value="TODO">📋 Todo</SelectItem>
                      <SelectItem value="IN_PROGRESS">
                        ⚡ In Progress
                      </SelectItem>
                      <SelectItem value="IN_REVIEW">👀 In Review</SelectItem>
                      <SelectItem value="DONE">✅ Done</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <AnimatePresence>
                {errors.status && (
                  <motion.p
                    className="text-sm text-red-500"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.status.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="priority">Priority</Label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={errors.priority ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select priority..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">🟢 Low</SelectItem>
                      <SelectItem value="MEDIUM">🟡 Medium</SelectItem>
                      <SelectItem value="HIGH">🔴 High</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <AnimatePresence>
                {errors.priority && (
                  <motion.p
                    className="text-sm text-red-500"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.priority.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Controller
                name="assignedTo"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={membersLoading}
                  >
                    <SelectTrigger
                      className={errors.assignedTo ? "border-red-500" : ""}
                    >
                      <SelectValue
                        placeholder={
                          membersLoading
                            ? "Loading members..."
                            : "Select assignee..."
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {(membersData?.members || []).map((member: any) => (
                        <SelectItem
                          key={member.userId._id}
                          value={member.userId._id}
                        >
                          👤 {member.userId.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <AnimatePresence>
                {errors.assignedTo && (
                  <motion.p
                    className="text-sm text-red-500"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.assignedTo.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: isDirty ? 1.02 : 1 }}
                  whileTap={{ scale: isDirty ? 0.98 : 1 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    type="submit"
                    disabled={isLoading || !isDirty}
                    className={`w-full sm:w-auto ${
                      isDirty ? "" : "opacity-50"
                    }`}
                  >
                    {isLoading && (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isLoading ? "Updating..." : "Update Task"}
                  </Button>
                </motion.div>
              </DialogFooter>
            </motion.div>
          </motion.form>
        </DialogContent>
      </Dialog>
    </>
  );
}
