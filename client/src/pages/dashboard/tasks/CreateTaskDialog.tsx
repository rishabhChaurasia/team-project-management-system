import { useState, useEffect } from "react";
import { Plus, CalendarIcon, CheckCircle2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const CreateTaskDialog = (props: { projectId?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Task</span>
              <span className="sm:hidden">Task</span>
            </Button>
          </motion.div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg w-[95vw] max-w-[95vw] sm:w-full max-h-[95vh] overflow-y-auto sm:overflow-y-hidden border-0 p-4 sm:p-6">
          <CreateTaskForm projectId={props.projectId} onClose={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTaskDialog;

function CreateTaskForm(props: { projectId?: string; onClose: () => void }) {
  const { onClose } = props;
  const [date, setDate] = useState<Date>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!project) newErrors.project = "Project is required";
    if (!assignee) newErrors.assignee = "Assignee is required";
    if (!date) newErrors.date = "Due date is required";
    if (!status) newErrors.status = "Status is required";
    if (!priority) newErrors.priority = "Priority is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    onClose();
  };

  const isFormValid =
    title.trim() && project && assignee && date && status && priority;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && isFormValid) {
        handleSubmit(e as any);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, isFormValid]);

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-full">
        <motion.div
          className="mb-5 pb-2 border-b"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <DialogTitle className="text-lg sm:text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1 text-center sm:text-left">
            Create Task
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs sm:text-sm leading-tight text-center sm:text-left">
            Organize and manage tasks, resources, and team collaboration
          </DialogDescription>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Label className="dark:text-[#f1f7feb5] text-sm flex items-center gap-1">
              Task title
              {title.trim() && (
                <CheckCircle2 className="w-3 h-3 text-green-500" />
              )}
            </Label>
            <Input
              placeholder="Website Redesign"
              className={cn(
                "h-10 sm:h-[48px] mt-1 transition-colors",
                errors.title && "border-red-500 focus-visible:ring-red-500",
                title.trim() && "border-green-500"
              )}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
              }}
              autoFocus
            />
            <AnimatePresence>
              {errors.title && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.title}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.3 }}
          >
            <Label className="dark:text-[#f1f7feb5] text-sm">
              Task description
              <Badge variant="secondary" className="ml-2 text-xs">
                Optional
              </Badge>
            </Label>
            <Textarea
              rows={2}
              placeholder="Add more details about this task..."
              className="mt-1 resize-none transition-colors"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {description.length}/500 characters
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <Label className="text-sm flex items-center gap-1">
                Project
                {project && <CheckCircle2 className="w-3 h-3 text-green-500" />}
              </Label>
              <Select
                value={project}
                onValueChange={(value) => {
                  setProject(value);
                  if (errors.project)
                    setErrors((prev) => ({ ...prev, project: "" }));
                }}
              >
                <SelectTrigger
                  className={cn(
                    "mt-1 transition-colors",
                    errors.project && "border-red-500",
                    project && "border-green-500"
                  )}
                >
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05, duration: 0.2 }}
                    >
                      <SelectItem value="1">🎨 Website Redesign</SelectItem>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.2 }}
                    >
                      <SelectItem value="2">📱 Mobile App</SelectItem>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15, duration: 0.2 }}
                    >
                      <SelectItem value="3">📈 Marketing Campaign</SelectItem>
                    </motion.div>
                  </motion.div>
                </SelectContent>
              </Select>
              <AnimatePresence>
                {errors.project && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.project}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
            >
              <Label className="text-sm flex items-center gap-1">
                Assigned To
                {assignee && (
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                )}
              </Label>
              <Select
                value={assignee}
                onValueChange={(value) => {
                  setAssignee(value);
                  if (errors.assignee)
                    setErrors((prev) => ({ ...prev, assignee: "" }));
                }}
              >
                <SelectTrigger
                  className={cn(
                    "mt-1 transition-colors",
                    errors.assignee && "border-red-500",
                    assignee && "border-green-500"
                  )}
                >
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">👨‍💻 John Doe</SelectItem>
                  <SelectItem value="2">👩‍🎨 Jane Smith</SelectItem>
                  <SelectItem value="3">👨‍💼 Mike Johnson</SelectItem>
                </SelectContent>
              </Select>
              <AnimatePresence>
                {errors.assignee && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.assignee}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <Label className="text-sm flex items-center gap-1">
              Due Date
              {date && <CheckCircle2 className="w-3 h-3 text-green-500" />}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full mt-1 h-10 justify-start font-normal transition-colors",
                    !date && "text-muted-foreground",
                    errors.date && "border-red-500",
                    date && "border-green-500"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    if (errors.date)
                      setErrors((prev) => ({ ...prev, date: "" }));
                  }}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <AnimatePresence>
              {errors.date && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.date}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.3 }}
            >
              <Label className="text-sm flex items-center gap-1">
                Status
                {status && <CheckCircle2 className="w-3 h-3 text-green-500" />}
              </Label>
              <Select
                value={status}
                onValueChange={(value) => {
                  setStatus(value);
                  if (errors.status)
                    setErrors((prev) => ({ ...prev, status: "" }));
                }}
              >
                <SelectTrigger
                  className={cn(
                    "mt-1 transition-colors",
                    errors.status && "border-red-500",
                    status && "border-green-500"
                  )}
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05, duration: 0.2 }}
                    >
                      <SelectItem value="TODO">📋 Todo</SelectItem>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.2 }}
                    >
                      <SelectItem value="IN_PROGRESS">
                        ⚡ In Progress
                      </SelectItem>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15, duration: 0.2 }}
                    >
                      <SelectItem value="IN_REVIEW">👀 In Review</SelectItem>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.2 }}
                    >
                      <SelectItem value="DONE">✅ Done</SelectItem>
                    </motion.div>
                  </motion.div>
                </SelectContent>
              </Select>
              <AnimatePresence>
                {errors.status && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.status}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <Label className="text-sm flex items-center gap-1">
                Priority
                {priority && (
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                )}
              </Label>
              <Select
                value={priority}
                onValueChange={(value) => {
                  setPriority(value);
                  if (errors.priority)
                    setErrors((prev) => ({ ...prev, priority: "" }));
                }}
              >
                <SelectTrigger
                  className={cn(
                    "mt-1 transition-colors",
                    errors.priority && "border-red-500",
                    priority && "border-green-500"
                  )}
                >
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05, duration: 0.2 }}
                    >
                      <SelectItem value="LOW">🟢 Low</SelectItem>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.2 }}
                    >
                      <SelectItem value="MEDIUM">🟡 Medium</SelectItem>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15, duration: 0.2 }}
                    >
                      <SelectItem value="HIGH">🟠 High</SelectItem>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.2 }}
                    >
                      <SelectItem value="URGENT">🔴 Urgent</SelectItem>
                    </motion.div>
                  </motion.div>
                </SelectContent>
              </Select>
              <AnimatePresence>
                {errors.priority && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.priority}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 pt-6 border-t"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.3 }}
          >
            <div className="flex-1 text-xs text-muted-foreground hidden sm:flex items-center">
              Press{" "}
              <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Esc</kbd> to
              cancel or{" "}
              <kbd className="px-1 py-0.5 bg-muted rounded text-xs">
                ⌘ Enter
              </kbd>{" "}
              to create
            </div>
            <div className="flex gap-3 sm:gap-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 sm:flex-none h-10"
                type="button"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <motion.div
                whileHover={isFormValid ? { scale: 1.02 } : {}}
                whileTap={isFormValid ? { scale: 0.98 } : {}}
                className="flex-1 sm:flex-none"
              >
                <Button
                  className={cn(
                    "w-full h-10 font-semibold transition-all duration-200",
                    isFormValid
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    "Create Task"
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
