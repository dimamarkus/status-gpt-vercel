import { SignUpSchema } from '#/lib/forms/schemas';
import { clientSideSupabase } from '#/lib/supabase-client';
import Button from '#/ui/global/buttons/Button/Button';
import TextInput from '#/ui/global/inputs/TextInput/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './SignUpForm.module.scss';

export type SignUpFields = {
  email: string;
  password: string;
};

const SignUpForm = () => {
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const { register, handleSubmit, formState } = useForm<SignUpFields>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(formData: SignUpFields) {
    const { error } = await clientSideSupabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setSubmissionError(error.message);
    } else {
      setSuccessMsg(
        'Success! Please check your email for further instructions.',
      );
    }
  }

  return (
    <form className={styles.SignUpForm} onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Email"
        type="email"
        autoComplete="username"
        touched={formState.touchedFields.email}
        errors={formState.errors.email?.message}
        {...register('email')}
      />
      <TextInput
        label="Password"
        type="password"
        autoComplete="new-password"
        touched={formState.touchedFields.password}
        errors={formState.errors.password?.message}
        {...register('password')}
      />
      {submissionError && <div className="text-red-500">{submissionError}</div>}
      {successMsg && <div className="text-green-500">{successMsg}</div>}
      <Button type="submit" fullWidth />
    </form>
  );
};

export default SignUpForm;
