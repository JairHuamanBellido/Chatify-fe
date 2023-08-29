import useCurrentUser from "@/src/hooks/useCurrentUser";
import TypographyMuted from "../typography/muted";
import { TypographyParagraph } from "../typography/paragraph";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserAvatar() {
  const [currentUser] = useCurrentUser();
  const [isLogOut, setIsLogOut] = useState<boolean>(false);
  const { replace } = useRouter();
  const signOut = () => {
    Auth.signOut({ global: true }).then(() => {
      setIsLogOut(true);
    });
  };

  useEffect(() => {
    if (isLogOut) {
      replace("/auth");
    }
  }, [isLogOut]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="py-4 h-16 relative  text-left inline-flex justify-around gap-x-2 items-center"
        >
          <Avatar className="flex items-center justify-center">
            <AvatarFallback className="bg-primary/20 text-foreground">
              {(currentUser.name[0] ?? "").toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="w-3/4">
            <TypographyParagraph className="font-semibold truncate">
              {currentUser.name}
            </TypographyParagraph>
            <TypographyMuted className="truncate">
              {currentUser.email}
            </TypographyMuted>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="center" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {currentUser.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="h-4 w-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
