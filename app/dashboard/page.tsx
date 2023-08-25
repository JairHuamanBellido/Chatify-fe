"use client";
import CreateChatRoomButton from "@/src/components/create-chatroom-button";
import ListChatRooms from "@/src/components/list-chat-rooms";
import { TypographyH2 } from "@/src/components/typography/h2";

import useCurrentUser from "@/src/hooks/useCurrentUser";



export default function Dashboard() {
  const [{ currentUserId }] = useCurrentUser();
  return (
    <main className="flex min-h-screen flex-col  p-24">
      <h2>Home page{currentUserId}</h2>
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
