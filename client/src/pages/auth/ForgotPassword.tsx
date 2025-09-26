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
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useForgotPasswordMutation } from "@/redux/rtk-query/authApi";
import PageTitle from "@/components/PageTitle";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.email({ message: "Please enter a valid email address" }).trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await forgotPassword(values).unwrap();
      toast.success("OTP sent to your email!");
      navigate(`/reset-password?email=${values.email}`);
      form.reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send OTP!");
    }
  };

  return (
    <>
      <PageTitle title="Forgot Password" />
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Forgot Password</CardTitle>
                <CardDescription>
                  Enter your email to receive a password reset OTP
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
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                  Email
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="example@gmail.com"
                                    className="!h-[48px]"
                                    {...field}
                                  />
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
                          Send OTP
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

export default ForgotPassword;
