import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Building2, Loader } from "lucide-react";
import { motion } from "motion/react";

interface CreateWorkspaceDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateWorkspaceDialog = ({
  isOpen,
  onClose,
}: CreateWorkspaceDialogProps) => {
  const [isPending] = useState(false);

  const formSchema = z.object({
    name: z.string().trim().min(1, {
      message: "Workspace name is required",
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Create workspace:", values);
    form.reset();
    onClose();
  };

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  return (
    <Dialog modal={true} open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-2">
          <motion.div 
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <DialogTitle className="text-2xl font-semibold">
              Create Workspace
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Boost your productivity by making it easier for everyone to access
              projects in one location.
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <div className="px-1">

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Acme Corporation"
                          className="h-11 transition-colors focus:ring-2 focus:ring-primary/20"
                          autoFocus
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is the name of your company, team or organization.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Workspace description
                        <span className="text-xs font-normal ml-2 text-muted-foreground">
                          Optional
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="A collaborative workspace for our team to manage projects and tasks efficiently."
                          className="resize-none transition-colors focus:ring-2 focus:ring-primary/20"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Get your members on board with a few words about your
                        Workspace.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div 
                className="flex flex-col-reverse sm:flex-row gap-3 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 h-11"
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button 
                    type="submit" 
                    className="w-full h-11 font-semibold"
                  >
                    {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                    Create Workspace
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceDialog;
