"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignUpSchema } from "#/lib/forms/schemas";
import TextInput from "#/ui/atoms/inputs/TextInput/TextInput";
import browserSupabase from "#/lib/databases/supabase/supabase-browser";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import { redirect } from "next/navigation";

export type SignUpFields = {
  email: string;
  password: string;
};

export const SignUpForm = () => {
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const { register, handleSubmit, formState } = useForm<SignUpFields>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: SignUpFields) {
    const { error } = await browserSupabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setSubmissionError(error.message);
    } else {
      setSuccessMsg("Success! Please check your email for further instructions.");
      redirect("/auth/sign-in");
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
      <BaseButton type="submit" fullWidth text="Submit" />
    </form>
  );
};

export default SignUpForm;
