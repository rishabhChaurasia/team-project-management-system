import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon, CopyIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useGetWorkspaceByIdQuery } from "@/redux/rtk-query/workspaceApi";
import { Skeleton } from "@/components/ui/skeleton";

const InviteMember = ({ workspaceId }: { workspaceId?: string }) => {
  const { data: workspace, isLoading: workspaceLoading } =
    useGetWorkspaceByIdQuery(workspaceId);
  const [copied, setCopied] = useState(false);

  const inviteUrl = workspace?.workspace?.inviteCode
    ? `${window.location.origin}/invite/workspace/${
        workspace.workspace.inviteCode
      }/join?name=${encodeURIComponent(
        workspace.workspace.name
      )}&description=${encodeURIComponent(
        workspace.workspace.description
      )}&members=${
        workspace.workspace.members?.length || 0
      }&createdAt=${encodeURIComponent(workspace.workspace.createdAt)}`
    : `${window.location.origin}/invite/workspace/loading/join`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="space-y-4">
      <div>
        <h5 className="text-lg font-semibold mb-2">
          Invite members to join you
        </h5>
        <p className="text-sm text-muted-foreground">
          Anyone with an invite link can join this free Workspace. You can also
          disable and create a new invite link for this Workspace at any time.
        </p>
      </div>

      {workspaceLoading ? (
        <div className="flex gap-2">
          <Skeleton className="flex-1 h-10" />
          <Skeleton className="w-10 h-10" />
        </div>
      ) : (
        <div className="flex gap-2">
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
          <Input
            id="link"
            disabled={true}
            className="flex-1 font-mono text-sm"
            value={
              workspace?.workspace?.inviteCode
                ? inviteUrl
                : "No invite code available"
            }
            readOnly
          />
          <motion.div whileTap={{ scale: 0.95 }} transition={{ duration: 0.1 }}>
            <Button
              className="shrink-0"
              size="icon"
              onClick={handleCopy}
              disabled={!workspace?.workspace?.inviteCode}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CopyIcon className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default InviteMember;
