import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./SignInForm.module.scss";
import { SignInSchema } from "#/lib/forms/schemas";
import { clientSideSupabase } from "#/lib/helpers/supabase-helpers/supabase-client";
import Button from "#/ui/atoms/Button/Button";
import TextInput from "#/ui/atoms/inputs/TextInput/TextInput";

export type SignInFields = {
  email: string;
  password: string;
};

export const SignInForm = () => {
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const { register, handleSubmit, formState } = useForm<SignInFields>({
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: SignInFields) => {
    const { error } = await clientSideSupabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setSubmissionError(error.message);
    } else {
      setSuccessMsg("Success! Logged in.");
    }
  };

  return (
    <form className={styles.SignInForm} onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Email"
        name="email"
        type="email"
        autoComplete="username"
        touched={formState.touchedFields.email}
        errors={formState.errors.email?.message}
        register={register}
      />
      <TextInput
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        touched={formState.touchedFields.password}
        errors={formState.errors.password?.message}
        register={register}
      />
      {submissionError && <div className="text-red-500">{submissionError}</div>}
      {successMsg && <div className="text-green-500">{successMsg}</div>}
      <Button type="submit" fullWidth />
    </form>
  );
};

export default SignInForm;
