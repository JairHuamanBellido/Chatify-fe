import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLParagraphElement>  {
  children: React.ReactNode;
}
export default function TypographyMuted({
  children,
  className = "",
  ...rest
}: Props) {
  return (
    <p {...rest} className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}
