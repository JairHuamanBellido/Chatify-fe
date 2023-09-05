"use client";
import AccountForm from "@/src/components/account-form";
import { TypographyH4 } from "@/src/components/typography/h4";
import { TypographyParagraph } from "@/src/components/typography/paragraph";

export default function AccountPage() {
  return (
    <div className="relative w-full h-full mt-4">
      <div className="mb-4">
        <TypographyH4>Account</TypographyH4>
        <TypographyParagraph className="text-foreground/50">
          Update your personal details here.
        </TypographyParagraph>
      </div>
      <AccountForm />
    </div>
  );
}
