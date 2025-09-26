import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import PageTitle from "@/components/PageTitle";

const GoogleOAuthFailure = () => {
  return (
    <>
      <PageTitle title="Authentication Failed" />
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
                <CardTitle className="text-xl">Authentication Failed</CardTitle>
                <CardDescription>
                  We couldn't sign you in with Google. Please try again or use a
                  different method.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Button asChild className="w-full h-[40px]">
                    <Link to="/sign-in">Back to Sign In</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full h-[40px]">
                    <Link to="/sign-up">Create New Account</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
              Having trouble? Contact our <a href="#">support team</a> for
              assistance.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoogleOAuthFailure;
