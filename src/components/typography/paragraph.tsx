import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}
export function TypographyParagraph({ children, className, ...rest }: Props) {
  return (
    <p
      {...rest}
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
    >
      {children}
    </p>
  );
}
