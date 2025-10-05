import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Loader } from "lucide-react";
import { motion } from "motion/react";
import { format } from "date-fns";
import { useJoinWorkspaceMutation } from "@/redux/rtk-query/memberApi";
import { toast } from "sonner";
import { useMemo } from "react";

const JoinWorkspace = () => {
  const { inviteCode } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [joinWorkspace, { isLoading: isJoining }] = useJoinWorkspaceMutation();

  const workspace = useMemo(
    () => ({
      name: searchParams.get("name") || "Unknown Workspace",
      description:
        searchParams.get("description") || "No description available",
      membersCount: parseInt(searchParams.get("members") || "0"),
      createdAt: searchParams.get("createdAt") || new Date().toISOString(),
    }),
    [searchParams]
  );

  const handleJoinWorkspace = async () => {
    try {
      const res = await joinWorkspace(inviteCode).unwrap();
      toast.success("Successfully joined workspace!");
      navigate(`/workspace/${res.workspaceId}`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to join workspace!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-0 bg-card/95 backdrop-blur">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4"
            >
              <Users className="w-8 h-8 text-primary" />
            </motion.div>
            <CardTitle className="text-2xl font-bold">
              Join {workspace.name}
            </CardTitle>
            <CardDescription className="text-base">
              You've been invited to collaborate
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {workspace.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{workspace.membersCount} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>
                    Created {format(new Date(workspace.createdAt), "MMM yyyy")}
                  </span>
                </div>
              </div>

              <Badge variant="secondary" className="w-fit">
                Invite Code: {inviteCode}
              </Badge>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full h-12 text-base font-semibold"
                onClick={handleJoinWorkspace}
                disabled={isJoining}
              >
                {isJoining ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Joining...
                  </>
                ) : (
                  "Join Workspace"
                )}
              </Button>
            </motion.div>

            <p className="text-xs text-center text-muted-foreground">
              By joining, you'll have access to all workspace projects and tasks
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default JoinWorkspace;
