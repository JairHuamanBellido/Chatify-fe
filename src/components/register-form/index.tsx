"use client";
import { ISignUpUser } from "@/src/interfaces/ISignUpUser";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import PasswordPolicyLabel from "../password-policy";
import { Label } from "../ui/label";
import TypographyMuted from "../typography/muted";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpPasswordPolicy } from "@/src/utils/signUpPasswordPolicy";
import { SignUpSchema } from "@/src/schema/SignUp/SignUpSchema";
import { useMutation } from "@tanstack/react-query";
import signUpUserAmplify from "@/src/services/user/mutations/signUpUserAmplify";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Loader2 } from "lucide-react";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import ConfirmAccount from "./components/confirm-account";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { isDirty, isValid },
  } = useForm<ISignUpUser>({
    defaultValues: { email: "", name: "", password: "", repeatPassword: "" },
    resolver: zodResolver(SignUpSchema),
  });

  const { mutate, error, isError, isLoading, isSuccess } = useMutation(
    ["signup-user"],
    async (payload: ISignUpUser) => await signUpUserAmplify(payload)
  );

  const passwordPolicyReviewer = signUpPasswordPolicy.validate(
    watch("password"),
    { list: true }
  ) as any[];

  const passwordMissMatch =
    watch("password") !== watch("repeatPassword") && !!watch("repeatPassword");

  const onSubmit = (data: ISignUpUser) => {
    mutate(data, {
      onError: (error) => error,
    });
  };
  if (isSuccess) {
    return (
      <ConfirmAccount
        password={getValues("password")}
        email={getValues("email")}
      />
    );
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col">
        <div className="flex flex-col gap-y-6 mb-2">
          <div className="flex flex-col gap-y-4">
            <Label htmlFor="name">Name</Label>
            <Input
              aria-label="name"
              {...register("name")}
              placeholder="Full name"
            />
          </div>

          <div className="flex flex-col gap-y-4">
            <Label htmlFor="email">Email</Label>
            <Input
              aria-label="email"
              {...register("email")}
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <Label htmlFor="password">Password</Label>
            <Input
              aria-label="password"
              {...register("password")}
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <Label
              className={cn({ "text-red-500": passwordMissMatch })}
              htmlFor="repeatPassword"
            >
              Confirm password
            </Label>
            <Input
              aria-label="repeat-password"
              {...register("repeatPassword")}
              type="password"
              placeholder="Repeat password"
              className={cn({ "border-red-500": passwordMissMatch })}
            />
          </div>
          {passwordMissMatch && (
            <TypographyMuted className="mt-[-12px] text-red-500">
              Password do not match
            </TypographyMuted>
          )}
        </div>
        <PasswordPolicyLabel
          isCorrect={!passwordPolicyReviewer.includes("digits")}
        >
          At least 1 number
        </PasswordPolicyLabel>
        <PasswordPolicyLabel
          isCorrect={!passwordPolicyReviewer.includes("symbols")}
        >
          At least 1 special character
        </PasswordPolicyLabel>
        <PasswordPolicyLabel
          isCorrect={!passwordPolicyReviewer.includes("uppercase")}
        >
          At least 1 uppercase
        </PasswordPolicyLabel>
        <PasswordPolicyLabel
          isCorrect={!passwordPolicyReviewer.includes("lowercase")}
        >
          At least 1 lowercase
        </PasswordPolicyLabel>
        <PasswordPolicyLabel
          isCorrect={!passwordPolicyReviewer.includes("min")}
        >
          At least 8 char
        </PasswordPolicyLabel>

        {isError && (
          <Alert className="mt-4" variant={"destructive"}>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{(error as any).message ?? ""}</AlertDescription>
          </Alert>
        )}

        <Button
          disabled={
            !isDirty ||
            !isValid ||
            !signUpPasswordPolicy.validate(watch("password")) ||
            passwordMissMatch ||
            isLoading
          }
          className="mt-4"
          type="submit"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <>Sign Up</>
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
        className="w-full mb-8"
        onClick={async () => {
          Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Google,
          });
        }}
        variant="outline"
        type="button"
        disabled={isLoading}
      >
        Sign Up with Google
      </Button>
    </div>
  );
}
