"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PasswordSchema } from "#/lib/forms/schemas";
import TextInput from "#/ui/atoms/inputs/TextInput/TextInput";
import browserSupabase from "#/lib/helpers/supabase-helpers/supabase-browser";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import BaseLink from "#/ui/_base/BaseLink/BaseLink";

export type UpdatePasswordFields = {
  password: string;
  currentUsername: string;
};

export type UpdatePasswordFormProps = {
  currentUsername?: string;
};

export const UpdatePasswordForm = ({ currentUsername }: UpdatePasswordFormProps) => {
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const { register, handleSubmit, formState } = useForm<UpdatePasswordFields>({
    resolver: yupResolver(PasswordSchema),
    defaultValues: {
      password: "",
      currentUsername: currentUsername || "", // Hidden. Included for accessisbility/password managers
    },
  });

  async function onSubmit(formData: { password: string }) {
    const res = await browserSupabase.auth.updateUser({
      password: formData.password,
    });

    if (res.error) {
      setSubmissionError(res.error.message);
    } else {
      setSuccessMsg("Success! Password updated.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextInput
        type="hidden"
        autoComplete="new-password"
        value={currentUsername}
        name="username"
      />
      <TextInput
        label="Password"
        type="password"
        autoComplete="new-password"
        touched={formState.touchedFields.password}
        errors={formState.errors.password?.message}
        register={register}
        name="password"
      />
      {submissionError && <div className="text-red-500">{submissionError}</div>}
      {successMsg && <div className="text-green-500">{successMsg}</div>}
      <br />
      <BaseButton type="submit" fullWidth text="Submit" />
      <BaseLink href="/profile" text="Back to profile" />
    </form>
  );
};
export default UpdatePasswordForm;
