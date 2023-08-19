import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?:string;
}
export default function TypographyMuted({ children,className = '' }: Props) {
  return <p className={cn("text-sm text-muted-foreground",className)}>{children}</p>;
}
