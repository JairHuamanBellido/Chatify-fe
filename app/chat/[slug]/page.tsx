"use client";

import { GetChatRoomQuery, Message } from "@/src/API";
import HeaderChat from "@/src/components/header-chat";
import ListMessages from "@/src/components/list-messages";
import SendMessageInput from "@/src/components/send-message-input";
import { getChatRoom } from "@/src/graphql/queries";
import { GraphQLQuery, graphqlOperation } from "@aws-amplify/api";
import { useQuery } from "@tanstack/react-query";
import { API } from "aws-amplify";

export default function ChatRoomDetailedPage({
  params,
}: {
  params: { slug: string };
}) {
  const { isSuccess, data, isLoading } = useQuery({
    queryKey: [`chat-room-${params.slug}`],
    queryFn: async () =>
      await API.graphql<GraphQLQuery<GetChatRoomQuery>>(
        graphqlOperation(getChatRoom, { id: params.slug })
      ),
  });
  if (isSuccess) {
    return (
      <main>
        <HeaderChat title={data.data?.getChatRoom?.name as string} />
        <ListMessages
          messages={data.data?.getChatRoom?.messages?.items as Message[]}
        />
        <SendMessageInput />
      </main>
    );
  } else if (isLoading) {
    return <p>Loading...</p>;
  }

  return <p>Something went wrong!</p>;
}
