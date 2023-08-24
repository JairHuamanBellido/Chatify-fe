import { cn } from "@/lib/utils";
import {
  Message,
  OnCreateMessageSubscription,
  OnCreateMessageSubscriptionVariables,
} from "@/src/API";
import { CircleOff } from "lucide-react";
import TypographyMuted from "../typography/muted";

import { API } from "aws-amplify";
import { graphqlOperation, GraphQLSubscription } from "@aws-amplify/api";

import { useEffect, useState } from "react";
import { onCreateMessage } from "@/src/graphql/subscriptions";
import ChatMessage from "../chat-message";

interface Props {
  messages: Message[];
  chatRoomId: string;
}

export default function ListMessages({ messages, chatRoomId }: Props) {
  const [newMessages, setNewMessages] = useState<Message[]>([]);
  const variables: OnCreateMessageSubscriptionVariables = {
    filter: {
      chatRoomId: { eq: chatRoomId },
    },
  };

  useEffect(() => {
    const subscribeNewMessages = API.graphql<
      GraphQLSubscription<OnCreateMessageSubscription>
    >(graphqlOperation(onCreateMessage, variables)).subscribe({
      next: ({ value }) => {
        setNewMessages((prev) => [
          ...prev,
          value.data?.onCreateMessage as Message,
        ]);
      },
    });

    return () => subscribeNewMessages.unsubscribe();
  }, []);

  return (
    <div
      className={cn("h-[calc(100vh-128px)] p-4", {
        "flex items-center justify-center": !messages || !messages.length,
      })}
    >
      {!messages.length && !newMessages.length ? (
        <div className="flex flex-col gap-y-2 justify-center items-center text-foreground/30">
          <CircleOff></CircleOff>
          <TypographyMuted className="text-inherit">
            There are no messages
          </TypographyMuted>
        </div>
      ) : (
        <div className="flex gap-y-4 flex-col-reverse h-full w-full">
          {newMessages.reverse().map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  );
}
