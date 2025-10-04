import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader, AlertTriangle, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DeleteWorkspaceCard = () => {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const workspace = { name: "My Workspace" };

  const onOpenDialog = () => setOpen(true);
  const onCloseDialog = () => {
    if (isPending) return;
    setOpen(false);
  };

  const handleConfirm = () => {
    console.log("Delete workspace confirmed");
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      onCloseDialog();
    }, 1000);
  };
  return (
    <>
      <motion.div
        className="w-full px-4 sm:px-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="mb-4 sm:mb-5 border-b pb-3 sm:pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <h1 className="text-base sm:text-[17px] tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1.5 text-center sm:text-left">
            Delete Workspace
          </h1>
        </motion.div>

        <div className="flex flex-col items-stretch sm:items-start justify-between py-0 space-y-4 sm:space-y-0">
          <motion.div
            className="flex-1 mb-2 sm:mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Deleting a workspace is a permanent action and cannot be undone.
              Once you delete a workspace, all its associated data, including
              projects, tasks, and member roles, will be permanently removed.
              Please proceed with caution and ensure this action is intentional.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className="w-full sm:w-auto sm:place-self-end h-[44px] sm:h-[40px] text-sm sm:text-base font-medium cursor-pointer"
              variant="destructive"
              onClick={onOpenDialog}
            >
              <span className="sm:hidden">Delete</span>
              <span className="hidden sm:inline">Delete</span>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <Dialog open={open} onOpenChange={onCloseDialog}>
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
                  Delete {workspace?.name}
                </DialogTitle>
              </div>
              <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
                This action will permanently delete the workspace and all its
                data. This cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                  ⚠️ Warning: All projects, tasks, and member data will be lost
                </p>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={onCloseDialog}
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
                {isPending ? "Deleting..." : "Delete Workspace"}
              </Button>
            </DialogFooter>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteWorkspaceCard;
