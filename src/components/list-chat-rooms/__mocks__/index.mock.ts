import { ChatRoom } from "@/src/API";

export const mockChatRooms: ChatRoom[] = [
  {
    id: "1",
    name: "My fist chat room",
    __typename: "ChatRoom",
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    admin: {
      __typename: "User",
      createdAt: new Date().toString(),
      email: "myemail@gmail.com",
      id: "admin-1",
      name: "Jair",
      updatedAt: new Date().toString(),
    },
    messages: { items: [], __typename: "ModelMessageConnection" },
  },
];
