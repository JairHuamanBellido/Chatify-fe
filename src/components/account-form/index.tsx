import { IAccountForm } from "@/src/interfaces/IAccountForm";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import useCurrentUser from "@/src/hooks/useCurrentUser";
import { Input } from "../ui/input";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { Auth } from "aws-amplify";
import { Loader2 } from "lucide-react";
import { useToast } from "../ui/use-toast";

export default function AccountForm() {
  const [user, setCurrentUser] = useCurrentUser();

  const { toast } = useToast();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["update-account"],
    mutationFn: async (name: string) => {
      const user = await Auth.currentAuthenticatedUser();

      return await Auth.updateUserAttributes(user, {
        name: name,
      });
    },
  });
  const { handleSubmit, register, setValue } = useForm<IAccountForm>({
    defaultValues: { name: user.name },
  });

  useEffect(() => {
    setValue("name", user.name);
  }, [user]);

  const onSubmit = (data: IAccountForm) => {
    mutate(data.name, {
      onError: (e) => e,
      onSuccess: () => {
        setCurrentUser({ ...user, name: data.name });
        toast({
          description: "Profiled updated",
        });
      },
    });
  };
  return (
    <form className="max-w-[400px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input {...register("name")} />
      </div>

      <Button disabled={isLoading} className="mt-4" type="submit">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          <>Save changes</>
        )}
      </Button>
    </form>
  );
}
