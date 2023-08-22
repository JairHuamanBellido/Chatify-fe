import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}
export function TypographyH1({ children, className, ...rest }: Props) {
  return (
    <h1
      {...rest}
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}
