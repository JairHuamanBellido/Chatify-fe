import { Loader2, SendIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateMessageMutation, GetUserQuery } from "@/src/API";
import { GraphQLQuery } from "@aws-amplify/api";
import { useForm } from "react-hook-form";
import { ISendMessage } from "@/src/interfaces/ISendMesage";
import { API, graphqlOperation } from "aws-amplify";
import { createMessage } from "@/src/graphql/mutations";

interface Props {
  chatRoomId: string;
}
export default function SendMessageInput({ chatRoomId }: Props) {
  const { data: currentUser } = useQuery<GraphQLQuery<{ data: GetUserQuery }>>([
    "current-user",
  ]);

  const { mutate, isLoading } = useMutation({
    mutationKey: ["send-message"],
    mutationFn: async (payload: ISendMessage) =>
      await API.graphql<GraphQLQuery<CreateMessageMutation>>(
        graphqlOperation(createMessage, {
          input: {
            text: payload.text,
            messageSenderId: currentUser?.data.getUser?.id,
            chatRoomMessagesId: chatRoomId,
            type: "Message",
            chatRoomId,
          },
        })
      ),
  });

  const { register, handleSubmit, reset } = useForm<ISendMessage>({
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = (data: ISendMessage) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="w-full flex  h-[64px] items-center justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex gap-x-4">
        <Input
          {...register("text")}
          name="text"
          aria-label="text"
          placeholder="Type message here"
          required
        />
        <Button
          type="submit"
          variant={"outline"}
          disabled={isLoading}
          size={"icon"}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SendIcon className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
}
