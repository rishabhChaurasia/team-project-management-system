import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingUp, TrendingDown, Loader } from "lucide-react";
import { motion } from "motion/react";

const ProjectAnalyticsCard = (props: {
  title: string;
  value: number;
  isLoading: boolean;
}) => {
  const { title, value, isLoading } = props;

  const getArrowIcon = () => {
    if (title === "Overdue Task") {
      return value > 0 ? (
        <TrendingDown className="h-3.5 w-3.5 text-red-500" />
      ) : (
        <TrendingUp className="h-3.5 w-3.5 text-green-500" />
      );
    }
    if (title === "Completed Task" || title === "Total Task") {
      return value > 0 ? (
        <TrendingUp className="h-3.5 w-3.5 text-green-500" />
      ) : (
        <TrendingDown className="h-3.5 w-3.5 text-red-500" />
      );
    }
    return null;
  };

  const getCardColor = () => {
    if (title === "Overdue Task" && value > 0)
      return "border-red-200 bg-red-50/50";
    if (title === "Completed Task" && value > 0)
      return "border-green-200 bg-green-50/50";
    return "border-border";
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="w-full group cursor-pointer"
    >
      <Card
        className={`shadow-sm hover:shadow-lg transition-all duration-300 border ${getCardColor()} group-hover:border-primary/20`}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {title}
            </CardTitle>
            {!isLoading && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
              >
                {getArrowIcon()}
              </motion.div>
            )}
          </div>
          <div className="p-1.5 rounded-full bg-muted/50 group-hover:bg-primary/10 transition-colors">
            <Activity className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <motion.div
            className="flex items-baseline gap-1"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader className="w-5 h-5 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Loading...
                </span>
              </div>
            ) : (
              <>
                <span className="text-2xl font-bold tracking-tight">
                  {value}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {title.toLowerCase().includes("task") ? "tasks" : "items"}
                </span>
              </>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectAnalyticsCard;
