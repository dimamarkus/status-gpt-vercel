import { supabaseServerComponentWithSession } from "#/lib/helpers/supabase-helpers/supabase-server-component";
import BaseLink from "#/ui/_base/BaseLink/BaseLink";
import Card from "#/ui/atoms/containers/Card/Card";
import ResetPasswordForm from "#/ui/molecules/forms/ResetPasswordForm/ResetPasswordForm";
import { redirect } from "next/navigation";

async function getData() {
  const supabase = await supabaseServerComponentWithSession();
  const res = await supabase.auth.getUser();
  if (!!res?.data?.user) {
    redirect("/auth/update-password");
  }
  return res.data.user;
}

export default async function ResetPasswordPage() {
  const user = await getData();

  if (!!user) {
    redirect("/profile");
  }

  return (
    <Card title="Reset Password">
      <ResetPasswordForm />
      <BaseLink href="/auth/sign-in" text="Try signing in again" />
    </Card>
  );
}
