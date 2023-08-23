"use client";
import { CreateUserMutation, GetUserQuery } from "@/src/API";
import CreateChatRoomButton from "@/src/components/create-chatroom-button";
import ListChatRooms from "@/src/components/list-chat-rooms";
import { TypographyH2 } from "@/src/components/typography/h2";
import { createUser } from "@/src/graphql/mutations";
import { getUser } from "@/src/graphql/queries";

import { GraphQLQuery, graphqlOperation } from "@aws-amplify/api";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useQuery } from "@tanstack/react-query";
import { API } from "aws-amplify";

export default function Home() {
  const { authStatus, user } = useAuthenticator((context: any) => [
    context.authStatus,
    context.user,
  ]);

  useQuery({
    queryKey: [
      "user-data",
      user?.getSignInUserSession()?.getIdToken()?.payload.sub ?? "",
    ],
    queryFn: async () => {
      const res = await API.graphql<GraphQLQuery<GetUserQuery>>(
        graphqlOperation(getUser, {
          id: user.getSignInUserSession()?.getIdToken()?.payload.sub,
        })
      );
      if (!res.data?.getUser) {
        const newAdmin = await API.graphql<GraphQLQuery<CreateUserMutation>>(
          graphqlOperation(createUser, {
            input: {
              id: user?.getSignInUserSession()?.getIdToken()?.payload.sub,
              name: user?.getSignInUserSession()?.getIdToken()?.payload.name,
              email: user?.getSignInUserSession()?.getIdToken()?.payload.email,
            },
          })
        );

        return newAdmin;
      }

      return res;
    },
    enabled: !!user,
  });

  if (authStatus === "authenticated" && !!user) {
    return (
      <main className="flex min-h-screen flex-col  p-24">
        <h2>
          Home page{" "}
          {user?.getSignInUserSession()?.getIdToken()?.payload.name ?? ""}
        </h2>
        <nav className="flex flex-col">
          <div className="flex justify-between w-full">
            <TypographyH2>Chats</TypographyH2>
            <CreateChatRoomButton />
          </div>
          <ListChatRooms />
        </nav>
      </main>
    );
  }
  return <p> Cargando</p>;
}
