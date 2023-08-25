"use client";
import TypographyMuted from "@/src/components/typography/muted";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { GraphQLQuery, graphqlOperation } from "@aws-amplify/api";
import { CreateUserMutation, GetUserQuery } from "@/src/API";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";
import { API } from "aws-amplify";
import { getUser } from "@/src/graphql/queries";
import { createUser } from "@/src/graphql/mutations";
import useCurrentUser from "@/src/hooks/useCurrentUser";
import { redirect, useRouter } from "next/navigation";
import Sidebar from "@/src/components/sidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authStatus, user } = useAuthenticator((context: any) => [
    context.authStatus,
    context.user,
  ]);
  const { refresh } = useRouter();

  const [_, setCurrentUser] = useCurrentUser();

  useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      const res = await API.graphql<GraphQLQuery<GetUserQuery>>(
        graphqlOperation(getUser, {
          id: user.getSignInUserSession()?.getIdToken()?.payload.sub,
        })
      );

      setCurrentUser({
        currentUserId: user?.getSignInUserSession()?.getIdToken().payload.sub,
      });

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

  if (authStatus === "configuring") {
    return (
      <div>
        <Loader2 className="animate-spin mr-4 h-4 w-4" />
        <TypographyMuted>Validating credentials...</TypographyMuted>
      </div>
    );
  }
  if (authStatus === "authenticated" && !!user) {
    return (
      <div className="w-full h-screen relative overflow-hidden flex">
        <Sidebar />
        <main className="w-[calc(100%-240px)]">{children}</main>
      </div>
    );
  }

  if (authStatus === "authenticated" && !user) {
    return refresh();
  }
  if (authStatus === "unauthenticated") {
    return redirect("/auth");
  }
}
