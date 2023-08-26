"use client";
import { Mulish } from "next/font/google";

import LoginForm from "@/src/components/login-form";
import { AspectRatio } from "@/src/components/ui/aspect-ratio";
import Image from "next/legacy/image";
import { TypographyH1 } from "@/src/components/typography/h1";
import { cn } from "@/lib/utils";
import { TypographyParagraph } from "@/src/components/typography/paragraph";
import ThemeToggle from "@/src/components/theme-toggle";

const titleFont = Mulish({ subsets: ["latin"] });

const URL_IMAGE =
  "https://images.unsplash.com/photo-1692791256961-b8797139ba2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80";
export default function LoginPage() {
  return (
    <main className="flex h-screen overflow-y-auto">
      <div className="w-1/2 h-full ">
        <div className="h-full max-w-[90%] relative w-[600px] mx-auto flex flex-col justify-center">
          <div className="mb-12">
            <TypographyH1 className={cn(titleFont.className)}>
              Chatify
            </TypographyH1>
            <TypographyParagraph className={"text-foreground/50 mt-4"}>
              Welcome to our Chat application
            </TypographyParagraph>
          </div>
          <LoginForm />
        </div>
      </div>

      <div className="w-1/2 h-screen relative">
        <div className="absolute top-4 right-4 z-10 bg-background rounded-md">
          <ThemeToggle />
        </div>
        <AspectRatio className="h-screen">
          <Image
            src={URL_IMAGE}
            alt="login-image"
            className="w-full h-full"
            objectFit="cover"
            layout="fill"
            priority
          />
        </AspectRatio>
      </div>
    </main>
  );
}
