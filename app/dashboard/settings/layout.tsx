import { TypographyH2 } from "@/src/components/typography/h2";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import Link from "next/link";
import React from "react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6">
      <TypographyH2 className="border-none">Settings</TypographyH2>
      <Tabs defaultValue="account" className="mt-4">
        <TabsList>
          <TabsTrigger value="account">
            <Link href={"/dashboard/settings/account"}>Account</Link>
          </TabsTrigger>
          <TabsTrigger value="password">
            <Link href={"/dashboard/settings/theme"}>Theme</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="py-4">

      {children}
      </div>
    </div>
  );
}
