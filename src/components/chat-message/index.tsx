import { Message } from "@/src/API";

import { cn } from "@/lib/utils";
import { TypographyParagraph } from "../typography/paragraph";
import useCurrentUser from "@/src/hooks/useCurrentUser";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface Props {
  message: Message;
}
export default function ChatMessage({ message }: Props) {
  const [{ currentUserId }] = useCurrentUser();
  return (
    <div
      className={cn("flex items-center gap-x-2", {
        "flex-row-reverse": currentUserId === message.messageSenderId,
      })}
    >
      <div>
        <Avatar className="flex items-center justify-center">
          <AvatarFallback className="bg-primary text-primary-foreground">
            {(message.sender?.name[0] ?? "").toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full">
        <div className="mb-2">
          {currentUserId !== message.messageSenderId && (
            <TypographyParagraph className="text-sm font-semibold text-foreground/50">
              {message.sender?.name}
            </TypographyParagraph>
          )}
        </div>
        <div
          className={cn("rounded-lg w-max max-w-[75%] py-2 px-3 ", {
            "bg-primary text-primary-foreground ml-auto":
              currentUserId === message.messageSenderId,
            "bg-muted": currentUserId !== message.messageSenderId,
          })}
        >
          <TypographyParagraph className="text-inherit">
            {message.text}
          </TypographyParagraph>
        </div>
      </div>
    </div>
  );
}
