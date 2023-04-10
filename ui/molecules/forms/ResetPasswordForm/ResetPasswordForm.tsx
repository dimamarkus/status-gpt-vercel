"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { EmailSchema } from "#/lib/forms/schemas";
import TextInput from "#/ui/atoms/inputs/TextInput/TextInput";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import browserSupabase from "#/lib/helpers/supabase-helpers/supabase-browser";

export type ResetPasswordFields = {
  email: string;
};

export const ResetPasswordForm = () => {
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const clearMessages = () => {
    setSuccessMsg(null);
    setSubmissionError(null);
  };

  const { register, handleSubmit, formState } = useForm<ResetPasswordFields>({
    resolver: yupResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit({ email }: ResetPasswordFields) {
    const res = await browserSupabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}`,
    });

    if (res.error) {
      setSubmissionError(res.error.message);
    } else {
      setSuccessMsg("Password reset instructions sent.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextInput
        label="Email"
        type="email"
        autoComplete="username"
        touched={formState.touchedFields.email}
        errors={formState.errors.email?.message}
        register={register}
        name="email"
      />
      {submissionError && <div className="text-red-500">{submissionError}</div>}
      {successMsg && <div className="text-green-500">{successMsg}</div>}
      <BaseButton type="submit" fullWidth text="Submit" onClick={clearMessages} />
    </form>
  );
};

export default ResetPasswordForm;
