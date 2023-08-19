"use client";
import "./globals.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { Inter } from "next/font/google";
import amplifyconfig from "../src/aws-exports";
import { Amplify } from "aws-amplify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });
Amplify.configure({ ...amplifyconfig, ssr: true });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Authenticator.Provider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </Authenticator.Provider>
    </QueryClientProvider>
  );
}
