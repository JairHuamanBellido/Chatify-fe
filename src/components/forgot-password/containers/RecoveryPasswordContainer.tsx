import { IRecoveryPassword } from "@/src/interfaces/IRecoveryPassword";
import { useForm } from "react-hook-form";
import ForgotPasswordHeader from "../components/header";
import { CheckCircle2, KeyRound, Loader2 } from "lucide-react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import TypographyMuted from "../../typography/muted";
import { cn } from "@/lib/utils";
import { signUpPasswordPolicy } from "@/src/utils/signUpPasswordPolicy";
import PasswordPolicyLabel from "../../password-policy";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecoveryPasswordSchema } from "@/src/schema/RecoveryPassword";
import { Button } from "../../ui/button";
import { useForgotPassword } from "@/src/hooks/useForgotPassword";
import { useMutation } from "@tanstack/react-query";
import { Auth } from "aws-amplify";
import { TypographyH4 } from "../../typography/h4";
import Link from "next/link";

export default function RecoveryPasswordContainer() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { isDirty, isValid },
  } = useForm<IRecoveryPassword>({
    defaultValues: { code: "", password: "", repeatPassword: "" },
    resolver: zodResolver(RecoveryPasswordSchema),
  });

  const [config] = useForgotPassword();

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: async (payload: IRecoveryPassword) =>
      await Auth.forgotPasswordSubmit(
        config.email,
        payload.code,
        payload.password
      ),
  });
  const passwordMissMatch =
    watch("password") !== watch("repeatPassword") && !!watch("repeatPassword");

  const passwordPolicyReviewer = signUpPasswordPolicy.validate(
    watch("password"),
    { list: true }
  ) as any[];

  const onSubmit = (payload: IRecoveryPassword) => {
    mutate(payload);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center">
        <CheckCircle2 className="text-foreground w-6 h-6" />
        <TypographyH4 className="text-foreground mt-2">
          Password reset
        </TypographyH4>
        <Button variant={"link"} asChild>
          <Link href={"/auth"}>Login now</Link>
        </Button>
      </div>
    );
  }
  return (
    <>
      <ForgotPasswordHeader
        headline="Set new password"
        description="Read all the rules"
        icon={<KeyRound className="text-foreground w-1/2 h-1/2" />}
      />
      <form className="mt-8 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex mb-2 flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="code">Code</Label>
            <Input
              aria-label="code"
              {...register("code")}
              type="text"
              placeholder="Enter your code"
              required
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              aria-label="password"
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label
              className={cn({ "text-destructive": passwordMissMatch })}
              htmlFor="code"
            >
              Repeat password
            </Label>
            <Input
              aria-label="repeat-password"
              {...register("repeatPassword")}
              type="password"
              placeholder="Repeat password"
              required
            />
          </div>
        </div>
        {passwordMissMatch && (
          <TypographyMuted className="mt-2 text-destructive">
            Password do not match
          </TypographyMuted>
        )}

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
        <Button
          disabled={
            !isDirty ||
            !isValid ||
            !signUpPasswordPolicy.validate(watch("password")) ||
            passwordMissMatch ||
            isLoading
          }
          className="w-full mt-4"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait{" "}
            </>
          ) : (
            <>Reset password</>
          )}
        </Button>
      </form>
    </>
  );
}
