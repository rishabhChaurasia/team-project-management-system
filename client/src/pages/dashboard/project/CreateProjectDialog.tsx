import { useState, useEffect, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { useCreateProjectMutation } from "@/redux/rtk-query/projectApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Project title is required",
  }),
  description: z.string().trim(),
});

const emojis = ["📊", "🚀", "📱", "🎨", "💼", "🔧", "📈", "🎯", "💡", "🌟"];
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CreateProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProjectDialog = ({ isOpen, onClose }: CreateProjectDialogProps) => {
  const { workspaceId } = useParams();
  const [createProject, { isLoading: isPending }] = useCreateProjectMutation();
  const [emoji, setEmoji] = useState("📊");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleEmojiSelection = useCallback((selectedEmoji: string) => {
    setEmoji(selectedEmoji);
    setIsEmojiPickerOpen(false);
  }, []);

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      form.reset();
      setEmoji("📊");
      // Auto-focus on project title after a brief delay
      setTimeout(() => {
        const titleInput = document.querySelector(
          'input[name="name"]'
        ) as HTMLInputElement;
        titleInput?.focus();
      }, 100);
    }
  }, [isOpen, form]);

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        await createProject({
          workspaceId,
          project: {
            emoji,
            name: values.name,
            description: values.description,
          },
        }).unwrap();
        toast.success("Project created successfully!");
        form.reset();
        setEmoji("📊");
        onClose();
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to create project!");
      }
    },
    [createProject, workspaceId, emoji, form, onClose]
  );

  const EmojiPicker = useCallback(
    () => (
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
    ),
    [emoji, handleEmojiSelection]
  );

  return (
    <Dialog modal={true} open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create Project
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <p className="text-muted-foreground text-sm">
            Organize and manage tasks, resources, and team collaboration
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Emoji
                </label>
                <Popover
                  open={isEmojiPickerOpen}
                  onOpenChange={setIsEmojiPickerOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="size-[60px] rounded-full p-2"
                    >
                      <span className="text-4xl">{emoji}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0 w-auto">
                    <EmojiPicker />
                  </PopoverContent>
                </Popover>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Project title
                      {field.value?.trim() && (
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Website Redesign"
                        className="h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Project description
                      <span className="text-xs font-normal ml-2 text-muted-foreground">
                        Optional
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="Project description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-4">
                <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </motion.div>
                <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                  <Button
                    type="submit"
                    disabled={isPending || !form.watch("name")?.trim()}
                    className="w-full"
                  >
                    {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                    {isPending ? "Creating..." : "Create"}
                  </Button>
                </motion.div>
              </div>
            </form>
          </Form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
