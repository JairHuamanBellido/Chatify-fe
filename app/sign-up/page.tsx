"use client";
import { cn } from "@/lib/utils";
import { Mulish } from "next/font/google";

import RegisterForm from "@/src/components/register-form";
import { TypographyH1 } from "@/src/components/typography/h1";
import { TypographyParagraph } from "@/src/components/typography/paragraph";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/legacy/image";
import ThemeToggle from "@/src/components/theme-toggle";

const titleFont = Mulish({ subsets: ["latin"] });

const URL_IMAGE =
  "https://images.unsplash.com/photo-1606857691897-cba45190a769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
export default function SignUpPage() {
  return (
    <main className="flex h-screen relative">
      <div className="w-1/2 h-full relative">
        <div className="absolute top-4 left-4 z-10 bg-background rounded-md">
          <ThemeToggle />
        </div>
        <AspectRatio className="h-screen">
          <Image
            src={URL_IMAGE}
            alt="signup-image"
            className="w-full h-full"
            objectFit="cover"
            layout="fill"
            priority
          />
        </AspectRatio>
      </div>
      <div className="w-1/2 h-auto py-8 overflow-y-auto">
        <div className="h-full max-w-[90%] relative w-[600px] mx-auto flex flex-col">
          <div className="mb-12">
            <TypographyH1 className={cn(titleFont.className)}>
              Welcome to Chatify!
            </TypographyH1>
            <TypographyParagraph className={"text-foreground/50 mt-4"}>
              Register your account
            </TypographyParagraph>
          </div>
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
