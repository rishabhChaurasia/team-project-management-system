import { useParams } from "react-router-dom";
import { Users, Calendar, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import CreateTaskDialog from "../tasks/CreateTaskDialog";
import EditProjectDialog from "./EditProjectDialog";

const ProjectHeader = () => {
  const { projectId } = useParams();

  // Dummy project data
  const project = {
    _id: projectId || "default-project-id",
    name: "Website Redesign",
    emoji: "🎨",
    description: "Complete redesign of the company website with modern UI/UX",
    status: "In Progress",
    dueDate: "Dec 15, 2024",
    members: 5,
    completedTasks: 12,
    totalTasks: 18,
  };

  const projectEmoji = project?.emoji || "📊";
  const projectName = project?.name || "Untitled project";

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div 
        className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
          <motion.span 
            className="text-xl sm:text-2xl flex-shrink-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
          >
            {projectEmoji}
          </motion.span>
          <div className="min-w-0 flex-1">
            <motion.div 
              className="flex items-center gap-2 mb-1 flex-wrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
            >
              <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight truncate">
                {projectName}
              </h1>
              <div className="flex-shrink-0">
                <EditProjectDialog project={project} />
              </div>
            </motion.div>
            <motion.p 
              className="text-muted-foreground text-xs sm:text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {project.description}
            </motion.p>
          </div>
        </div>
        <motion.div
          className="flex-shrink-0 w-full sm:w-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.3 }}
        >
          <CreateTaskDialog projectId={projectId} />
        </motion.div>
      </motion.div>

      {/* Project Stats */}
      <motion.div 
        className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        {[
          { variant: "secondary", icon: CheckCircle2, text: `${project.completedTasks}/${project.totalTasks} tasks` },
          { variant: "outline", icon: Users, text: `${project.members} members` },
          { variant: "outline", icon: Calendar, text: `Due ${project.dueDate}` },
          { variant: project.status === "In Progress" ? "default" : "secondary", text: project.status }
        ].map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 + index * 0.05, duration: 0.2 }}
          >
            <Badge variant={badge.variant as "outline" | "secondary" | "default" | "destructive"} className="gap-1">
              {badge.icon && <badge.icon className="w-3 h-3" />}
              {badge.text}
            </Badge>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ProjectHeader;
