import { EmailSchema } from '#/lib/forms/schemas';
import { clientSideSupabase } from '#/lib/supabase-client';
import { Button } from '#/ui/atoms/Button/Button';
import TextInput from '#/ui/atoms/inputs/TextInput/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './ResetPasswordForm.module.scss';

export type ResetPasswordFields = {
  email: string;
};

export const ResetPasswordForm = () => {
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const { register, handleSubmit, formState } = useForm<ResetPasswordFields>({
    resolver: yupResolver(EmailSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit({ email }: ResetPasswordFields) {
    const res = await clientSideSupabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}`,
    });

    if (res.error) {
      setSubmissionError(res.error.message);
    } else {
      setSuccessMsg('Password reset instructions sent.');
    }
  }

  return (
    <form
      className={styles.ResetPasswordForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label="Email"
        type="email"
        autoComplete="username"
        touched={formState.touchedFields.email}
        errors={formState.errors.email?.message}
        {...register('email')}
      />
      {submissionError && <div className="text-red-500">{submissionError}</div>}
      {successMsg && <div className="text-green-500">{successMsg}</div>}
      <Button type="submit" fullWidth />
    </form>
  );
};
export default ResetPasswordForm;
