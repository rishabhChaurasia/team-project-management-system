import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon, CopyIcon, Loader } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const InviteMember = () => {
  // Dummy data
  const workspaceLoading = false;
  const workspace = {
    inviteCode: "abc123",
  };
  const [copied, setCopied] = useState(false);

  const inviteUrl = `${window.location.origin}/invite/${workspace.inviteCode}`;

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
        <div className="flex justify-center py-4">
          <Loader className="w-6 h-6 animate-spin" />
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
            value={inviteUrl}
            readOnly
          />
          <motion.div
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            <Button
              className="shrink-0"
              size="icon"
              onClick={handleCopy}
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
