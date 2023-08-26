"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import amplifyconfig from "../src/aws-exports";
import { Amplify } from "aws-amplify";
import GlobalProvider from "@/src/provider/GlobalProvider";
import ThemeProvider from "@/src/components/theme-provider";
import ThemeSwitcher from "@/src/components/theme-switcher";
import { useEffect, useState } from "react";
import LoadingAppFullScreen from "@/src/components/loading-app-fullscreen";
import { useTheme } from "@/src/hooks/useTheme";

const inter = Inter({ subsets: ["latin"] });
Amplify.configure({ ...amplifyconfig, ssr: true });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  const [config] = useTheme();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <GlobalProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} theme-${config.theme}`}>
          <ThemeProvider
            attribute="class"
            enableSystem
            defaultTheme="system"
            enableColorScheme
            disableTransitionOnChange
          >
            {isMounted ? children : <LoadingAppFullScreen />}
          </ThemeProvider>
          <ThemeSwitcher />
        </body>
      </html>
    </GlobalProvider>
  );
}
