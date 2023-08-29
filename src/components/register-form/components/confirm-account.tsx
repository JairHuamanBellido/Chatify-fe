import { useForm } from "react-hook-form";
import { TypographyH4 } from "../../typography/h4";
import TypographyMuted from "../../typography/muted";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Auth } from "aws-amplify";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface Props {
  email: string;
  password: string;
}
export default function ConfirmAccount({ email, password }: Props) {
  const { replace } = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["confirm-user"],
    mutationFn: async (code: string) => {
      try {
        await Auth.confirmSignUp(email, code);
        await Auth.signIn({ username: email, password });
      } catch (error) {
        console.error(error);
      }
    },
  });
  const { register, handleSubmit } = useForm<{ code: string }>({
    defaultValues: { code: "" },
  });

  const onSubmit = async ({ code }: { code: string }) => {
    mutate(code, {
      onSuccess: () => {
        replace("/dashboard");
      },
      onError: (err) => err,
    });
  };

  return (
    <div className="flex flex-col items-start">
      <TypographyH4 className="font-light">
        Enter verification code
      </TypographyH4>
      <TypographyMuted className="mt-2">
        We've sent a code to <span className="font-semibold">{email}</span>
      </TypographyMuted>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 w-full">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="code">Verification code</Label>
          <Input
            {...register("code")}
            aria-label="code"
            type="text"
            required
            name="code"
            placeholder="Enter verification code"
          />
        </div>
        <Button disabled={isLoading} className="w-full mt-4">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </>
          ) : (
            <>Submit code</>
          )}
        </Button>
      </form>
    </div>
  );
}
