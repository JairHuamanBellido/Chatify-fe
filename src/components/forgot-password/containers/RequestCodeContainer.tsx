import { Fingerprint, Inbox, Loader2, MoveLeft } from "lucide-react";
import ForgotPasswordHeader from "../components/header";
import { useForm } from "react-hook-form";
import { IRequestCode } from "@/src/interfaces/IRequestCode";
import { useMutation } from "@tanstack/react-query";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Auth } from "aws-amplify";
import { useForgotPassword } from "@/src/hooks/useForgotPassword";
import { Alert, AlertDescription } from "../../ui/alert";
import { TypographyH4 } from "../../typography/h4";

import TypographyMuted from "../../typography/muted";
import Link from "next/link";

export default function RequestCodeContainer() {
  const { register, handleSubmit } = useForm<IRequestCode>({
    defaultValues: { email: "" },
  });
  const [config, setAtom] = useForgotPassword();
  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationKey: ["request-code"],
    mutationFn: async ({ email }: IRequestCode) => {
      return await Auth.forgotPassword(email);
    },
  });

  const onSubmit = (data: IRequestCode) => {
    mutate(data, {
      onSuccess: () => {
        setAtom({ ...config, email: data.email });
      },
    });
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center">
        <Inbox className="text-foreground w-6 h-6" />
        <TypographyH4 className="text-foreground mt-2">Email sent</TypographyH4>
        <TypographyMuted className="text-foreground/60">
          Check your email and submit the code
        </TypographyMuted>
        <Button
          onClick={() => setAtom({ ...config, step: 2 })}
          className="w-full mt-8"
        >
          Continue
        </Button>
      </div>
    );
  }
  return (
    <>
      <ForgotPasswordHeader
        headline="Forgot password?"
        description="No worries, we'll send you reset instruction"
        icon={<Fingerprint className="text-foreground w-1/2 h-1/2" />}
      />

      <form className="mt-8 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            aria-label="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        {isError && (
          <Alert className="mt-4" variant={"success"}>
            <AlertDescription>
              {(error as any).message ?? "Something went wrong!"}
            </AlertDescription>
          </Alert>
        )}

        <Button
          disabled={isLoading}
          className="mt-4 w-full"
          variant={"default"}
          type="submit"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <> Reset password</>
          )}
        </Button>
      </form>
      <div className="flex w-full justify-start mt-4">
        <Button asChild variant={"link"}>
          <Link href={"/auth"}>
            <MoveLeft className="mr-2" />
            Back to log in
          </Link>
        </Button>
      </div>
    </>
  );
}
