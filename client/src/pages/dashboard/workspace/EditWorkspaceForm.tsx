import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useState } from "react";
import { Check, Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


export default function EditWorkspaceForm() {
  const canEditWorkspace = true;
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formSchema = z.object({
    name: z.string().trim().min(1, {
      message: "Workspace name is required",
    }),
    description: z.string().trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "My Workspace",
      description: "This is a sample workspace description",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsPending(true);
    setIsSuccess(false);
    
    setTimeout(() => {
      console.log("Form submitted:", values);
      setIsPending(false);
      setIsSuccess(true);
      
      setTimeout(() => setIsSuccess(false), 2000);
    }, 1000);
  };

  return (
    <motion.div 
      className="w-full h-auto max-w-full px-4 sm:px-6 lg:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-full">
        <motion.div 
          className="mb-4 sm:mb-5 border-b pb-3 sm:pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <h1
            className="text-base sm:text-[17px] tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1.5
           text-center sm:text-left"
          >
            Edit Workspace
          </h1>
        </motion.div>
        <Form {...form}>
          <motion.form 
            onSubmit={form.handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <motion.div 
              className="mb-4 sm:mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm font-medium">
                      Workspace name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Taco's Co."
                        className="!h-[44px] sm:!h-[48px] disabled:opacity-90 disabled:pointer-events-none text-sm sm:text-base"
                        disabled={!canEditWorkspace || isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div 
              className="mb-6 sm:mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm font-medium">
                      Workspace description
                      <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-2">
                        Optional
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={!canEditWorkspace || isPending}
                        className="!h-[44px] sm:!h-[48px] disabled:opacity-90 disabled:pointer-events-none text-sm sm:text-base"
                        placeholder="Our team organizes marketing projects and tasks here."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            {canEditWorkspace && (
              <motion.div
                className="flex justify-center sm:justify-end"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <Button
                  className="w-full sm:w-auto h-[44px] sm:h-[40px] font-semibold items-center gap-2 text-sm sm:text-base"
                  disabled={isPending}
                  type="submit"
                >
                  <AnimatePresence mode="wait">
                    {isPending && (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Loader className="animate-spin" size={16} />
                      </motion.div>
                    )}
                    {isSuccess && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check size={16} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="hidden sm:inline">
                    {isPending ? "Updating..." : isSuccess ? "Updated!" : "Update Workspace"}
                  </span>
                  <span className="sm:hidden">
                    {isPending ? "Updating..." : isSuccess ? "Updated!" : "Update"}
                  </span>
                </Button>
              </motion.div>
            )}
          </motion.form>
        </Form>
      </div>
    </motion.div>
  );
}