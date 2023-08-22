import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}
export function TypographyH3({ children, className, ...rest }: Props) {
  return (
    <h3
      {...rest}
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}
