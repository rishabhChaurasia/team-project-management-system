import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Edit3, Loader, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
interface ProjectType {
  _id: string;
  name: string;
  description: string;
  emoji: string;
}

const EditProjectDialog = (props: { project?: ProjectType }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <TooltipProvider>
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <Tooltip>
          <DialogTrigger className="mt-1.5" asChild>
            <TooltipTrigger asChild>
              <button className="p-1 rounded hover:bg-accent transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent>
            <p>Edit project</p>
          </TooltipContent>
        </Tooltip>
        <DialogContent className="sm:max-w-lg w-[95vw] max-w-[95vw] sm:w-full border-0 p-4 sm:p-6">
          <EditProjectForm
            project={
              props.project || {
                _id: "1",
                name: "Sample Project",
                description: "This is a sample project description",
                emoji: "🚀",
              }
            }
            onClose={onClose}
          />
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default EditProjectDialog;

function EditProjectForm(props: { project: ProjectType; onClose: () => void }) {
  const { project, onClose } = props;

  const [emoji, setEmoji] = useState("📊");
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const formSchema = z.object({
    name: z.string().trim().min(1, {
      message: "Project title is required",
    }),
    description: z.string().trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    setEmoji(project?.emoji || "📊");
    form.setValue("name", project?.name || "");
    form.setValue("description", project?.description || "");
  }, [form, project]);

  const handleEmojiSelection = (selectedEmoji: string) => {
    setEmoji(selectedEmoji);
    setIsEmojiPickerOpen(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsPending(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Update project:", { emoji, ...values });
    setIsPending(false);
    onClose();
  };

  // Simple emoji picker component
  const EmojiPicker = () => {
    const emojis = ["📊", "🚀", "📱", "🎨", "💼", "🔧", "📈", "🎯", "💡", "🌟"];
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid grid-cols-5 gap-2 p-4"
      >
        {emojis.map((e, index) => (
          <motion.button
            key={e}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            onClick={() => handleEmojiSelection(e)}
            className={`text-2xl p-2 hover:bg-accent rounded transition-colors ${
              emoji === e ? "bg-accent" : ""
            }`}
          >
            {e}
          </motion.button>
        ))}
      </motion.div>
    );
  };

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="mb-5 pb-2 border-b"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <DialogTitle className="text-lg sm:text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1 text-center sm:text-left">
          Edit Project
        </DialogTitle>
        <DialogDescription className="text-muted-foreground text-xs sm:text-sm leading-tight text-center sm:text-left">
          Update the project details to refine task management
        </DialogDescription>
      </motion.div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-3"
        >
          <label className="block text-sm font-medium dark:text-[#f1f7feb5]">
            Select Emoji
          </label>
          <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="font-normal size-[50px] sm:size-[60px] !p-2 !shadow-none items-center rounded-full transition-transform"
              >
                <span className="text-2xl sm:text-4xl">{emoji}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="!p-0">
              <EmojiPicker />
            </PopoverContent>
          </Popover>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.3 }}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-[#f1f7feb5] text-sm flex items-center gap-1">
                    Project title
                    {field.value?.trim() && (
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter project name"
                      className="h-10 sm:h-[48px] transition-colors"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        if (errors.name)
                          setErrors((prev) => ({ ...prev, name: "" }));
                      }}
                    />
                  </FormControl>
                  <AnimatePresence>
                    <FormMessage />
                  </AnimatePresence>
                </FormItem>
              )}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                    Project description
                    <span className="text-xs font-light ml-2 px-1.5 py-0.5 bg-secondary rounded text-muted-foreground">
                      Optional
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Describe your project goals and objectives..."
                      className="resize-none transition-colors"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground mt-1">
                    {field.value?.length || 0}/500 characters
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            className="flex justify-end pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.3 }}
          >
            <Button
              disabled={isPending}
              className="h-9 sm:h-[40px] px-6 font-semibold min-w-[100px] transition-all hover:scale-105"
              type="submit"
            >
              {isPending ? (
                <>
                  <Loader className="animate-spin w-4 h-4 mr-2" />
                  Updating...
                </>
              ) : (
                "Update Project"
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
}
