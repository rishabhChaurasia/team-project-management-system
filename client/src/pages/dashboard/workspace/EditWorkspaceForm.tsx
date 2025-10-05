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
import { Skeleton } from "@/components/ui/skeleton";
import { Check, Loader } from "lucide-react";
import { useUpdateWorkspaceMutation } from "@/redux/rtk-query/workspaceApi";
import { toast } from "sonner";
import { useCallback, useMemo, useState } from "react";

interface EditWorkspaceFormProps {
  workspaceId: string;
  workspace?: {
    name: string;
    description?: string;
  };
  isLoading?: boolean;
}

const formSchema = z.object({
  name: z.string().trim().min(1, "Workspace name is required"),
  description: z.string().trim(),
});

export default function EditWorkspaceForm({
  workspaceId,
  workspace,
  isLoading = false,
}: EditWorkspaceFormProps) {
  const [updateWorkspace, { isLoading: isPending }] =
    useUpdateWorkspaceMutation();
  const [showSuccess, setShowSuccess] = useState(false);

  const defaultValues = useMemo(
    () => ({
      name: workspace?.name || "",
      description: workspace?.description || "",
    }),
    [workspace]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    values: workspace
      ? {
          name: workspace.name,
          description: workspace.description || "",
        }
      : undefined,
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        await updateWorkspace({ id: workspaceId, workspace: values }).unwrap();
        toast.success("Workspace updated successfully!");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to update workspace");
      }
    },
    [updateWorkspace, workspaceId]
  );

  return (
    <div className="w-full h-auto max-w-full px-4 sm:px-6 lg:px-0">
      <div className="h-full">
        <div className="mb-4 sm:mb-5 border-b pb-3 sm:pb-4">
          <h1 className="text-base sm:text-[17px] tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1.5 text-center sm:text-left">
            Edit Workspace
          </h1>
        </div>
        {isLoading ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-[44px] sm:h-[48px] w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-[44px] sm:h-[48px] w-full" />
            </div>
            <div className="flex justify-center sm:justify-end">
              <Skeleton className="h-[44px] sm:h-[40px] w-full sm:w-32" />
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-4 sm:mb-6">
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
                          disabled={isPending || isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-6 sm:mb-8">
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
                          disabled={isPending || isLoading}
                          className="!h-[44px] sm:!h-[48px] disabled:opacity-90 disabled:pointer-events-none text-sm sm:text-base"
                          placeholder="Our team organizes marketing projects and tasks here."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-center sm:justify-end">
                <Button
                  className="w-full sm:w-auto h-[44px] sm:h-[40px] font-semibold items-center gap-2 text-sm sm:text-base"
                  disabled={isPending || isLoading}
                  type="submit"
                >
                  {isPending && <Loader className="animate-spin" size={16} />}
                  {showSuccess && <Check size={16} />}
                  <span className="hidden sm:inline">
                    {isPending
                      ? "Updating..."
                      : showSuccess
                      ? "Updated!"
                      : "Update Workspace"}
                  </span>
                  <span className="sm:hidden">
                    {isPending
                      ? "Updating..."
                      : showSuccess
                      ? "Updated!"
                      : "Update"}
                  </span>
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
