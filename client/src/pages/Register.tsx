import PageTitle from "@/components/PageTitle";
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
import GoogleOauthButton from "@/components/ui/google-oauth-button";
import { Input } from "@/components/ui/input";
import { useRegisterUserMutation } from "@/redux/rtk-query/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const Register = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const formSchema = z
    .object({
      name: z
        .string()
        .min(3, "Name must be at least 3 characters!")
        .max(50, "Name must be less than 50 characters"),
      email: z.email({ message: "Please enter a valid email address" }).trim(),
      password: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one special character"
        ),
      confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { name, email, password } = values;

      await registerUser({ name, email, password }).unwrap();
      toast.success("Account created successfully!");
      form.reset();
      navigate("/sign-in");
    } catch (error: any) {
      toast.error(error?.data?.message || "Sign Up failed!");
    }
  };

  return (
    <>
      <PageTitle title="Sign Up" />
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Create an account</CardTitle>
                <CardDescription>
                  Signup with your Email or Google account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-6">
                      <div className="flex flex-col gap-4">
                        <GoogleOauthButton label="Signup" />
                      </div>
                      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-background px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid gap-2">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                  Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="John Doe"
                                    className="!h-[48px]"
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
                        <div className="grid gap-2">
                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                  Password
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      type={
                                        showPassword.password
                                          ? "text"
                                          : "password"
                                      }
                                      placeholder="password"
                                      className="!h-[48px]"
                                      {...field}
                                    />
                                    <Button
                                      type="button"
                                      variant={"ghost"}
                                      size={"sm"}
                                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                      onClick={() =>
                                        togglePasswordVisibility("password")
                                      }
                                    >
                                      {showPassword.password ? (
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
                        <div className="grid gap-2">
                          <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                  Confirm Password
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      type={
                                        showPassword.confirmPassword
                                          ? "text"
                                          : "password"
                                      }
                                      placeholder="confirm password"
                                      className="!h-[48px]"
                                      {...field}
                                    />
                                    <Button
                                      type="button"
                                      variant={"ghost"}
                                      size={"sm"}
                                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                      onClick={() => {
                                        togglePasswordVisibility(
                                          "confirmPassword"
                                        );
                                      }}
                                    >
                                      {showPassword.confirmPassword ? (
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
                          type="submit"
                          disabled={isLoading}
                          className="w-full h-[40px] cursor-pointer"
                        >
                          {isLoading && <Loader className="animate-spin" />}
                          Sign up
                        </Button>
                      </div>
                      <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link
                          to="/sign-in"
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
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
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

export default Register;
