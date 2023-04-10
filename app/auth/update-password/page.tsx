import { supabaseServerComponentWithSession } from "#/lib/helpers/supabase-helpers/supabase-server-component";
import Card from "#/ui/atoms/containers/Card/Card";
import UpdatePasswordForm from "#/ui/molecules/forms/UpdatePasswordForm/UpdatePasswordForm";
import { redirect } from "next/navigation";

async function getData() {
  const supabase = await supabaseServerComponentWithSession();
  const res = await supabase.auth.getUser();
  if (!res?.data?.user) {
    redirect("/auth/sign-in");
  }
  return res.data.user;
}

export default async function UpdatePasswordPage() {
  const user = await getData();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <Card title="Update Password">
      <UpdatePasswordForm />
    </Card>
  );
}
