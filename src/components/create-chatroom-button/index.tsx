"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { ICreateChatRoom } from "@/src/interfaces/ICreateChatRoom";
import { Input } from "../ui/input";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "aws-amplify";
import { GraphQLQuery, graphqlOperation } from "@aws-amplify/api";
import { Admin, CreateChatRoomMutation, GetAdminQuery } from "@/src/API";
import { createChatRoom } from "@/src/graphql/mutations";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function CreateChatRoomButton() {
  const { user } = useAuthenticator();

  const { data: admin } = useQuery<GraphQLQuery<{ data: GetAdminQuery }>>([
    "user-data",
    user?.getSignInUserSession()?.getIdToken()?.payload.sub ?? "",
  ]);

  const { register, handleSubmit } = useForm<ICreateChatRoom>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate, isError, isSuccess, isLoading, error } = useMutation(
    ["create-chat-room"],
    async (payload: ICreateChatRoom) =>
      await API.graphql<GraphQLQuery<CreateChatRoomMutation>>(
        graphqlOperation(createChatRoom, {
          input: {
            name: payload.name,
            description: payload.description,
            chatRoomAdminId: payload.admin.id,
          },
        })
      )
  );
  const [open, setOpen] = useState(false);

  const onSubmit = (data: ICreateChatRoom) => {
    data.admin = admin?.data.getAdmin as Admin;

    mutate(data, {
      onError: (error) => error,
    });
  };
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant={"outline"}>Create Chat room</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>New Chat Room</AlertDialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
              <div className="flex flex-col gap-y-4 mb-4">
                <Input
                  {...register("name")}
                  aria-label="name"
                  type="text"
                  placeholder="Name"
                  name="name"
                  required
                />
                <Input
                  {...register("description")}
                  type="text"
                  placeholder="Description"
                  name="description"
                  aria-label="description"
                  required
                />
              </div>
              {isError && (
                <Alert className="mt-4" variant={"destructive"}>
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {(error as any).message ?? ""}
                  </AlertDescription>
                </Alert>
              )}
              {isSuccess && (
                <Alert className="mt-4" variant={"success"}>
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    ChatRoom successfully created
                  </AlertDescription>
                </Alert>
              )}
              <AlertDialogFooter className="mt-8">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    <>Create</>
                  )}
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
