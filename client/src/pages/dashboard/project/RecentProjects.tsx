import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Loader } from "lucide-react";
import { format } from "date-fns";
import { motion } from "motion/react";

const RecentProjects = () => {
  const isPending = false;
  
  // Dummy projects data
  const projects = [
    {
      _id: "1",
      name: "Website Redesign",
      emoji: "🎨",
      createdAt: new Date("2024-01-15"),
      createdBy: {
        name: "John Doe",
        profilePicture: ""
      }
    },
    {
      _id: "2",
      name: "Mobile App",
      emoji: "📱",
      createdAt: new Date("2024-01-10"),
      createdBy: {
        name: "Jane Smith",
        profilePicture: ""
      }
    },
    {
      _id: "3",
      name: "Marketing Campaign",
      emoji: "📈",
      createdAt: new Date("2024-01-05"),
      createdBy: {
        name: "Mike Johnson",
        profilePicture: ""
      }
    }
  ];

  const getAvatarFallbackText = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="flex flex-col pt-2">
      {isPending ? (
        <Loader
          className="w-8 h-8
         animate-spin
         place-self-center
         flex"
        />
      ) : null}
      {projects?.length === 0 && (
        <div
          className="font-semibold
         text-sm text-muted-foreground
          text-center py-5"
        >
          No Project created yet
        </div>
      )}

      <ul role="list" className="space-y-2">
        {projects.map((project, index) => {
          const name = project.createdBy.name;
          const initials = getAvatarFallbackText(name);
          const avatarColor = getAvatarColor(name);

          return (
            <motion.li
              key={project._id}
              role="listitem"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="shadow-none cursor-pointer border-0 py-2 rounded-lg transition-colors ease-in-out"
            >
              <Link
                to={`/workspace/1/project/${project._id}`}
                className="block p-0"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <motion.div 
                    className="text-lg sm:text-xl !leading-[1.4rem] flex-shrink-0"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {project.emoji}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-medium leading-none truncate">
                      {project.name}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {project.createdAt
                        ? format(project.createdAt, "MMM d, yyyy")
                        : null}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                    <span className="hidden sm:inline text-sm text-muted-foreground">Created by</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="cursor-pointer"
                          >
                            <Avatar className="h-7 w-7 sm:h-9 sm:w-9 ring-2 ring-transparent hover:ring-primary/20 transition-all">
                              <AvatarImage
                                src={project.createdBy.profilePicture || ""}
                                alt="Avatar"
                              />
                              <AvatarFallback className={`${avatarColor} text-white font-semibold text-xs sm:text-sm`}>
                                {initials}
                              </AvatarFallback>
                            </Avatar>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-medium">{project.createdBy.name}</p>
                          <p className="text-xs text-muted-foreground">Project creator</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentProjects;