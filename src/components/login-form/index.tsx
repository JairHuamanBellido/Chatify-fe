import { ISignInUser } from "@/src/interfaces/ISignInUser";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import signInUserAmplify from "@/src/services/user/mutations/signInUserAmplify";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
export default function LoginForm() {
  const { register, handleSubmit } = useForm<ISignInUser>({
    defaultValues: { email: "", password: "" },
  });

  const { mutate, error, isError, isLoading, isSuccess } = useMutation(
    ["signin-user"],
    async (payload: ISignInUser) => await signInUserAmplify(payload)
  );

  const { push } = useRouter();
  const onSubmit = (data: ISignInUser) => {
    mutate(data, {
      onError: (error) => error,
      onSuccess: () => {
        push("/dashboard");
      },
    });
  };
  return (
    <div>
      <form className="flex flex-col gap-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-4">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            aria-label="email"
            type="text"
            placeholder="Email"
            name="email"
            required
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            name="password"
            aria-label="password"
            required
          />
          <div className="flex items-center mt-[-12px] justify-end">
            <Button variant={"link"}>
              <Link role="nav" href={"/forgot-password"}>Forgot password?</Link>
            </Button>
          </div>
        </div>
        {isError && (
          <Alert className="mt-4" variant={"destructive"}>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{(error as any).message ?? ""}</AlertDescription>
          </Alert>
        )}
        <Button
          className={cn({
            "bg-green-500 text-foreground": isSuccess,
          })}
          disabled={isLoading || isSuccess}
          type="submit"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              {isSuccess ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Redirecting to dashboard...
                </>
              ) : (
                <>Sign In</>
              )}
            </>
          )}
        </Button>
      </form>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        className="w-full"
        onClick={async () => {
          Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Google,
          });
        }}
        variant="outline"
        type="button"
        disabled={isLoading}
      >
        Sign In with Google
      </Button>
    </div>
  );
}
