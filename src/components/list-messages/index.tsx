import { cn } from "@/lib/utils";
import { Message } from "@/src/API";
import { TypographySmall } from "../typography/small";
import { CircleOff } from "lucide-react";
import TypographyMuted from "../typography/muted";

interface Props {
  messages: Message[];
}
export default function ListMessages({ messages }: Props) {
  return (
    <div
      className={cn("h-[calc(100vh-128px)]", {
        "flex items-center justify-center": !messages.length,
      })}
    >
      {!messages.length ? (
        <div className="flex flex-col gap-y-2 justify-center items-center text-foreground/30">
          <CircleOff></CircleOff>
          <TypographyMuted className="text-inherit">There are no messages</TypographyMuted>
        </div>
      ) : (
        <TypographySmall>All messages</TypographySmall>
      )}
    </div>
  );
}
