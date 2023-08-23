import { ListChatRoomsQuery } from "@/src/API";
import { listChatRooms } from "@/src/graphql/queries";
import { GraphQLQuery, graphqlOperation } from "@aws-amplify/api";
import { useQuery } from "@tanstack/react-query";
import { API } from "aws-amplify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import Link from "next/link";

export default function ListChatRooms() {
  const {
    isLoading,
    isSuccess,
    data: chatrooms,
  } = useQuery(
    ["get-chat-rooms"],
    async () =>
      await API.graphql<GraphQLQuery<ListChatRoomsQuery>>(
        graphqlOperation(listChatRooms)
      )
  );

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isSuccess) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Admin</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chatrooms?.data?.listChatRooms?.items.map((chatroom) => (
            <TableRow key={chatroom?.id}>
              <TableCell>{chatroom?.name}</TableCell>
              <TableCell>{chatroom?.admin?.name}</TableCell>
              <TableCell>
                <Button variant={"link"}>
                  <Link href={`/chat/${chatroom?.id}`}>Join</Link>
                </Button>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  return <p>Something went wrong!</p>;
}
