import React from "react";
import { TypographyH3 } from "../../typography/h3";
import TypographyMuted from "../../typography/muted";
import { cn } from "@/lib/utils";

import { Mulish } from "next/font/google";

const titleFont = Mulish({ subsets: ["latin"] });

interface IProps {
  headline: string;
  description: string;
  icon: React.ReactNode;
}
export default function ForgotPasswordHeader({
  headline,
  icon,
  description,
}: IProps) {
  return (
    <>
      <div className="border w-12 h-12 relative flex items-center justify-center border-foreground/20 mb-4 rounded-sm">
        {icon}
      </div>
      <TypographyH3 className={cn(titleFont.className)}>
        {headline}
      </TypographyH3>
      <TypographyMuted className="mt-2">{description}</TypographyMuted>
    </>
  );
}
