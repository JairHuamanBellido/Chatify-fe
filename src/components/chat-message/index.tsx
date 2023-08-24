import { Message } from "@/src/API";

import { cn } from "@/lib/utils";
import { TypographyParagraph } from "../typography/paragraph";
import useCurrentUser from "@/src/hooks/useCurrentUser";

interface Props {
  message: Message;
}
export default function ChatMessage({ message }: Props) {
  const [{ currentUserId }] = useCurrentUser();
  return (
    <div
      className={cn("rounded-lg w-max max-w-[75%] py-2 px-3 ", {
        "bg-primary text-primary-foreground ml-auto":
          currentUserId === message.messageSenderId,
        "bg-muted float-left": currentUserId !== message.messageSenderId,
      })}
    >
      <TypographyParagraph className="text-inherit">
        {message.text}
      </TypographyParagraph>
    </div>
  );
}
