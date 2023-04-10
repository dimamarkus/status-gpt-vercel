"use client";
import { useAuthContext } from "#/lib/contexts/AuthContext";
import Auth from "#/ui/modules/Auth/Auth";
import { redirect } from "next/navigation";

export default function SignInPage() {
  const { user, view } = useAuthContext();

  if (!!user) {
    redirect("/profile");
  }

  return <Auth view={view} />;
}
