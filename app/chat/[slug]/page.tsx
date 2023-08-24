"use client";

import {
  GetChatRoomQuery,
  GetUserQuery,
  Message,
  MessagesByDateQuery,
  ModelSortDirection,
} from "@/src/API";
import HeaderChat from "@/src/components/header-chat";
import ListMessages from "@/src/components/list-messages";
import SendMessageInput from "@/src/components/send-message-input";
import { getChatRoom, getUser, messagesByDate } from "@/src/graphql/queries";
import useCurrentUser from "@/src/hooks/useCurrentUser";
import { GraphQLQuery, graphqlOperation } from "@aws-amplify/api";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useQuery } from "@tanstack/react-query";
import { API } from "aws-amplify";
import { useEffect } from "react";

export default function ChatRoomDetailedPage({
  params,
}: {
  params: { slug: string };
}) {
  const { user } = useAuthenticator((context: any) => [context.user]);

  const [_, setCurrentUser] = useCurrentUser();
  useQuery({
    queryKey: ["current-user"],
    queryFn: async () =>
      await API.graphql<GraphQLQuery<GetUserQuery>>(
        graphqlOperation(getUser, {
          id: user.getSignInUserSession()?.getIdToken()?.payload.sub,
        })
      ),

    enabled: !!user,
  });

  useEffect(() => {
    if (!!user) {
      setCurrentUser({
        currentUserId: user.getSignInUserSession()?.getIdToken()?.payload.sub,
      });
    }
  }, [user]);

  const { isSuccess, data, isLoading } = useQuery({
    queryKey: [`chat-room-${params.slug}`],
    queryFn: async () => {
      const [chatRoom, messagesOrdered] = await Promise.all([
        await API.graphql<GraphQLQuery<GetChatRoomQuery>>(
          graphqlOperation(getChatRoom, { id: params.slug })
        ),
        await API.graphql<GraphQLQuery<MessagesByDateQuery>>(
          graphqlOperation(messagesByDate, {
            type: "Message",
            sortDirection: ModelSortDirection.DESC,
            filter: {
              chatRoomMessagesId: { eq: params.slug },
            },
          })
        ),
      ]);

      return { chatRoom, messagesOrdered };
    },
  });

  if (isSuccess) {
    return (
      <main>
        <HeaderChat title={data.chatRoom?.data?.getChatRoom?.name as string} />
        <ListMessages
          messages={
            data.messagesOrdered.data?.messagesByDate?.items as Message[]
          }
          chatRoomId={params.slug}
        />
        <SendMessageInput
          chatRoomId={data.chatRoom?.data?.getChatRoom?.id ?? ""}
        />
      </main>
    );
  } else if (isLoading) {
    return <p>Loading...</p>;
  }

  return <p>Something went wrong!</p>;
}
