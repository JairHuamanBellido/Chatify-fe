"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import amplifyconfig from "../src/aws-exports";
import { Amplify } from "aws-amplify";
import GlobalProvider from "@/src/provider/GlobalProvider";

const inter = Inter({ subsets: ["latin"] });
Amplify.configure({ ...amplifyconfig, ssr: true });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </GlobalProvider>
  );
}
