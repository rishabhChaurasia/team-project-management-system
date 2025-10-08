import { useState, useCallback } from "react";
import { Trash2, Loader, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "motion/react";
import { useDeleteTaskMutation } from "@/redux/rtk-query/taskApi";
import { toast } from "sonner";

interface DeleteTaskDialogProps {
  taskId: string;
  workspaceId: string;
  taskTitle: string;
}

export default function DeleteTaskDialog({
  taskId,
  workspaceId,
  taskTitle,
}: DeleteTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [deleteTask, { isLoading: isPending }] = useDeleteTaskMutation();

  const handleConfirm = useCallback(async () => {
    try {
      await deleteTask({ id: taskId, workspaceId }).unwrap();
      toast.success("Task deleted successfully!");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete task");
    }
  }, [deleteTask, taskId, workspaceId]);

  const handleCloseDialog = useCallback(() => {
    if (isPending) return;
    setOpen(false);
  }, [isPending]);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <Dialog open={open} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <DialogHeader className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <DialogTitle className="text-lg font-semibold">
                  Delete Task
                </DialogTitle>
              </div>
              <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to delete "{taskTitle}"? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                  ⚠️ Warning: This task will be permanently deleted
                </p>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={handleCloseDialog}
                disabled={isPending}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirm}
                disabled={isPending}
                className="flex-1 sm:flex-none gap-2 font-medium"
              >
                <AnimatePresence mode="wait">
                  {isPending ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Loader className="w-4 h-4 animate-spin" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="trash"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
                {isPending ? "Deleting..." : "Delete Task"}
              </Button>
            </DialogFooter>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}
