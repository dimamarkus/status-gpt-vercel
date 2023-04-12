"use client";
import { useAuthContext } from "#/lib/contexts/AuthContext";
import BaseLink from "#/ui/_base/BaseLink/BaseLink";
import Card from "#/ui/atoms/containers/Card/Card";
import Auth from "#/ui/modules/Auth/Auth";
import SignInForm from "#/ui/molecules/forms/SignInForm/SignInForm";
import { redirect } from "next/navigation";

export default function SignInPage() {
  const { user, view } = useAuthContext();

  if (!!user) {
    redirect("/profile");
  }

  return (
    <Card title="Sign In">
      <SignInForm />
      <BaseLink href="/auth/reset-password" text="Forgot your password?" />
      <BaseLink href="/auth/sign-up" text="Don't have an account? Sign up." />
    </Card>
  );
}
