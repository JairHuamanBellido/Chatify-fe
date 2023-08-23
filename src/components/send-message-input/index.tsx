import { SendIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SendMessageInput() {
  return (
    <div className="w-full flex gap-x-4 h-[64px] items-center justify-center p-4">
      <Input placeholder="Type message here" />
      <Button type="submit" variant={"outline"} size={"icon"}>
        <SendIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
