import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <div>{children}</div>;
}
