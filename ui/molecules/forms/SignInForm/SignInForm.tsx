"use client";

import browserSupabase from "#/lib/databases/supabase/supabase-browser";
import {SignInSchema} from "#/lib/forms/schemas";
import TextInput from "#/ui/atoms/inputs/TextInput/TextInput";
import BaseForm from "#/ui/molecules/ReactHookForm/ReactHookForm";

export type SignInFields = {
  email: string;
  password: string;
};

export const SignInForm = () => {

  const onSubmit = async (formData: SignInFields) => {
    const { error } = await browserSupabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      return await new Response(null, {status: 500, statusText: error.message})
    }

    return await new Response(null, {status: 200, statusText: "Successfully authenticated"})
  };

  const defaultValues = {
    email: "",
    password: "",
  }

  return (
    <BaseForm defaultValues={defaultValues} schema={SignInSchema} onSubmit={onSubmit}>
      <TextInput
        label="Email"
        name="email"
        type="email"
        autoComplete="username"
      />
      <TextInput
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
      />
    </BaseForm>
  );
};

export default SignInForm;
