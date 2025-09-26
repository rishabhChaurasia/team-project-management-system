import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader } from "lucide-react";
import { toast } from "sonner";
import { useResetPasswordMutation } from "@/redux/rtk-query/authApi";
import PageTitle from "@/components/PageTitle";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const formSchema = z.object({
    email: z.email({ message: "Please enter a valid email address" }).trim(),
    otp: z.string().length(6, { message: "OTP must be 6 digits" }),
    newPassword: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: emailFromUrl,
      otp: "",
      newPassword: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await resetPassword(values).unwrap();
      toast.success("Password reset successfully!");
      form.reset();
      navigate("/sign-in");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reset password!");
    }
  };

  return (
    <>
      <PageTitle title="Reset Password" />
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Reset Password</CardTitle>
                <CardDescription>
                  Enter the OTP sent to your email and your new password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <div className="grid gap-2">
                          <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                  OTP
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="123456"
                                    className="!h-[48px]"
                                    maxLength={6}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid gap-2">
                          <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                  New Password
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      type={showPassword ? "text" : "password"}
                                      placeholder="New password"
                                      className="!h-[48px]"
                                      {...field}
                                    />
                                    <Button
                                      type="button"
                                      variant={"ghost"}
                                      size={"sm"}
                                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                      onClick={() =>
                                        setShowPassword((prev) => !prev)
                                      }
                                    >
                                      {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                      ) : (
                                        <Eye className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button
                          disabled={isLoading}
                          type="submit"
                          className="w-full h-[40px] cursor-pointer"
                        >
                          {isLoading && <Loader className="animate-spin" />}
                          Reset Password
                        </Button>
                      </div>
                      <div className="text-center text-sm">
                        Remember your password?{" "}
                        <Link
                          to={"/sign-in"}
                          className="underline underline-offset-4"
                        >
                          Sign in
                        </Link>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
              By clicking continue, you agree to our{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
