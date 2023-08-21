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
export default function LoginForm() {
  const { register, handleSubmit } = useForm<ISignInUser>({
    defaultValues: { email: "", password: "" },
  });

  const { mutate, error, isError, isLoading } = useMutation(
    ["signin-user"],
    async (payload: ISignInUser) => await signInUserAmplify(payload)
  );

  const { push } = useRouter();
  const onSubmit = (data: ISignInUser) => {
    mutate(data, {
      onError: (error) => error,
      onSuccess: () => {
        push("/");
      },
    });
  };
  return (
    <div className="w-[600px] mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-4 mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            type="text"
            placeholder="Email"
            name="email"
            required
          />
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </div>
        {isError && (
          <Alert className="mt-4" variant={"destructive"}>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{(error as any).message ?? ""}</AlertDescription>
          </Alert>
        )}
        <Button className="mt-4" disabled={isLoading} type="submit">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <>Sign In</>
          )}
        </Button>
      </form>
      <div className="relative mt-6">
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
