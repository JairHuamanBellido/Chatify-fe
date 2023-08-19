"use client";
import { ISignUpUser } from "@/src/interfaces/ISignUpUser";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import PasswordValidator from "password-validator";
import { cn } from "@/lib/utils";
import PasswordPolicyLabel from "../password-policy";
import { Label } from "../ui/label";
import TypographyMuted from "../typography/muted";

const passwordPolicy = new PasswordValidator();
passwordPolicy.is().min(8);
passwordPolicy.is().lowercase();
passwordPolicy.is().uppercase();
passwordPolicy.is().symbols();
passwordPolicy.is().digits(1);

export default function RegisterForm() {
  const { register, handleSubmit, watch } = useForm<ISignUpUser>({
    defaultValues: { email: "", name: "", password: "", repeatPassword: "" },
  });
  const passwordPolicyReviewer = passwordPolicy.validate(watch("password"), {
    list: true,
  }) as any[];

  const passwordMissMatch =
    watch("password") !== watch("repeatPassword") && !!watch("repeatPassword");

  const onSubmit = (data: ISignUpUser) => {};
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[600px] mx-auto flex flex-col"
    >
      <div className="flex flex-col gap-y-4 mb-2">
        <Label htmlFor="name">Name</Label>
        <Input {...register("name")} placeholder="Full name" />
        <Label htmlFor="email">Email</Label>
        <Input {...register("email")} type="email" placeholder="Email" />
        <Label htmlFor="password">Password</Label>
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        <Label
          className={cn({ "text-red-500": passwordMissMatch })}
          htmlFor="repeatPassword"
        >
          Confirm password
        </Label>
        <Input
          {...register("repeatPassword")}
          type="password"
          placeholder="Repeat password"
          className={cn({ "border-red-500": passwordMissMatch })}
        />
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
      <PasswordPolicyLabel isCorrect={!passwordPolicyReviewer.includes("min")}>
        At least 8 char
      </PasswordPolicyLabel>
    </form>
  );
}
