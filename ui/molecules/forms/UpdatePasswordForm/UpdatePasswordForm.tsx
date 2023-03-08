import { PasswordSchema } from '#/lib/forms/schemas';
import { clientSideSupabase } from '#/lib/supabase-client';
import { Button } from '#/ui/atoms/buttons/Button/Button';
import TextInput from '#/ui/atoms/inputs/TextInput/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './UpdatePasswordForm.module.scss';

export type UpdatePasswordFields = {
  password: string;
};

export const UpdatePasswordForm = () => {
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const { register, handleSubmit, formState } = useForm<UpdatePasswordFields>({
    resolver: yupResolver(PasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  async function onSubmit(formData: { password: string }) {
    const res = await clientSideSupabase.auth.updateUser({
      password: formData.password,
    });
    console.log('res.data', res.data);
    if (res.error) {
      setSubmissionError(res.error.message);
    } else {
      setSuccessMsg('Success! Password updated.');
    }
  }

  return (
    <form
      className={styles.UpdatePasswordForm}
      onSubmit={handleSubmit(onSubmit)}
    >
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
export default UpdatePasswordForm;
