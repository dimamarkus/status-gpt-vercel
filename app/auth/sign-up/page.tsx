"use client";
import { useAuthContext } from "#/lib/contexts/AuthContext";
import BaseLink from "#/ui/_base/BaseLink/BaseLink";
import Card from "#/ui/atoms/containers/Card/Card";
import SignUpForm from "#/ui/molecules/forms/SignUpForm/SignUpForm";
import { redirect } from "next/navigation";

export default function SignUpPage() {
  const { user } = useAuthContext();

  if (!!user) {
    redirect("/profile");
  }

  return (
    <Card title="Create Account">
      <SignUpForm />
      <BaseLink href="/auth/sign-in" text="Already have an account? Sign In." />
    </Card>
  );
}
