import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader } from "lucide-react";
import { motion } from "motion/react";

const WorkspaceHeader = () => {
  // Dummy data
  const workspaceLoading = false;
  const workspace = {
    name: "My Workspace",
  };
  return (
    <motion.div
      className="w-full max-w-3xl mx-auto pb-2 px-4 sm:px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {workspaceLoading ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Loader className="w-8 h-8 animate-spin" />
        </motion.div>
      ) : (
        <motion.div
          className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-background/80 to-muted/20 border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
          whileHover={{ scale: 1.01 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Avatar className="size-[50px] sm:size-[60px] rounded-lg sm:rounded-xl font-bold shadow-lg ring-2 ring-primary/10">
              <AvatarFallback className="rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-primary/80 text-[28px] sm:text-[35px] text-primary-foreground">
                {workspace.name.split(" ")[0].charAt(0)}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <motion.div
            className="grid flex-1 text-left leading-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <motion.span
              className="truncate font-semibold text-lg sm:text-xl text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              {workspace.name}
            </motion.span>
            <motion.span
              className="truncate text-xs sm:text-sm text-muted-foreground font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              Free Plan
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WorkspaceHeader;
