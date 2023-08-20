import { cn } from "@/lib/utils";
import TypographyMuted from "../typography/muted";
import { XIcon, CheckIcon } from "lucide-react";
interface Props {
  isCorrect: boolean;
  children: React.ReactNode;
}
export default function PasswordPolicyLabel({ isCorrect, children }: Props) {
  return (
    <TypographyMuted
      data-accepted-password-policy={isCorrect}
      className={cn(
        {
          "text-gray-400": !isCorrect,
          "text-green-600": isCorrect,
        },
        "flex items-center gap-x-2"
      )}
    >
      {isCorrect ? <CheckIcon width={16} /> : <XIcon width={16} />}
      <span>{children}</span>
    </TypographyMuted>
  );
}
