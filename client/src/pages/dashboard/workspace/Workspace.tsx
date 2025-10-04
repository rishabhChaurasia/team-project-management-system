import { Plus, FolderOpen, CheckSquare, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "motion/react";
import AnalyticsCard from "./WorkspaceAnalyticsCard";
import RecentProjects from "../project/RecentProjects";
import RecentTasks from "../tasks/RecentTasks";
import RecentMembers from "../members/RecentMembers";
import CreateProjectDialog from "../project/CreateProjectDialog";

const Workspace = () => {
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");

  const getSliderTransform = () => {
    switch (activeTab) {
      case "projects":
        return "translateX(0%)";
      case "tasks":
        return "translateX(100%)";
      case "members":
        return "translateX(200%)";
      default:
        return "translateX(0%)";
    }
  };

  // Dummy analytics data
  const analyticsData = [
    { title: "Total Task", value: 24, isLoading: false },
    { title: "Completed Task", value: 18, isLoading: false },
    { title: "Overdue Task", value: 3, isLoading: false },
  ];

  return (
    <main className="flex flex-1 flex-col py-4 md:pt-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Workspace Overview
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Here&apos;s an overview for this workspace!
          </p>
        </div>
        <Button
          onClick={() => setIsCreateProjectOpen(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span className="sm:inline">New Project</span>
        </Button>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-4">
        {analyticsData.map((data, index) => (
          <AnalyticsCard
            key={index}
            title={data.title}
            value={data.value}
            isLoading={data.isLoading}
          />
        ))}
      </div>

      <div className="mt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="relative grid w-full grid-cols-3 h-10 sm:h-12 p-1 bg-muted/50 rounded-lg">
            <motion.div
              className="absolute top-1 bottom-1 bg-background rounded-md shadow-sm z-0"
              style={{ width: "calc(33.333% - 4px)", left: "2px" }}
              animate={{ transform: getSliderTransform() }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <TabsTrigger
              value="projects"
              className="relative z-10 flex items-center justify-center gap-1 sm:gap-2 h-8 sm:h-10 bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all text-xs sm:text-sm"
            >
              <FolderOpen className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Recent Projects</span>
              <span className="sm:hidden">Projects</span>
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="relative z-10 flex items-center justify-center gap-1 sm:gap-2 h-8 sm:h-10 bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all text-xs sm:text-sm"
            >
              <CheckSquare className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Recent Tasks</span>
              <span className="sm:hidden">Tasks</span>
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="relative z-10 flex items-center justify-center gap-1 sm:gap-2 h-8 sm:h-10 bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all text-xs sm:text-sm"
            >
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Recent Members</span>
              <span className="sm:hidden">Members</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 sm:mt-6 relative min-h-[300px] sm:min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === "projects" && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <TabsContent value="projects" className="mt-0">
                    <RecentProjects />
                  </TabsContent>
                </motion.div>
              )}
              {activeTab === "tasks" && (
                <motion.div
                  key="tasks"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <TabsContent value="tasks" className="mt-0">
                    <RecentTasks />
                  </TabsContent>
                </motion.div>
              )}
              {activeTab === "members" && (
                <motion.div
                  key="members"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <TabsContent value="members" className="mt-0">
                    <RecentMembers />
                  </TabsContent>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Tabs>
      </div>

      <CreateProjectDialog
        isOpen={isCreateProjectOpen}
        onClose={() => setIsCreateProjectOpen(false)}
      />
    </main>
  );
};

export default Workspace;
