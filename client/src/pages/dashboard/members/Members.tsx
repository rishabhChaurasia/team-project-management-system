import { Separator } from "@/components/ui/separator";
import InviteMember from "@/pages/dashboard/members/InviteMembers";
import AllMembers from "@/pages/dashboard/members/AllMembers";
import WorkspaceHeader from "@/pages/dashboard/workspace/WorkspaceHeader";
import { motion } from "motion/react";
import { useParams } from "react-router-dom";

export default function Members() {
  const { workspaceId } = useParams();
  
  return (
    <motion.div
      className="w-full h-auto pt-2 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <WorkspaceHeader />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="w-full max-w-3xl mx-auto pt-3 space-y-4 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="space-y-1 sm:space-y-2"
          >
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Workspace members
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Workspace members can view and join all Workspace projects, tasks
              and create new tasks in the Workspace.
            </p>
          </motion.div>

          <Separator className="opacity-60" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <InviteMember workspaceId={workspaceId} />
          </motion.div>

          <Separator className="opacity-30" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <AllMembers />
          </motion.div>
        </div>
      </motion.main>
    </motion.div>
  );
}
