import { LoginSchema } from '#/lib/forms/schemas';
import { clientSideSupabase } from '#/lib/supabase-client';
import Button from '#/ui/global/buttons/Button/Button';
import TextInput from '#/ui/global/inputs/TextInput/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';

export type LoginFields = {
  email: string;
  password: string;
};

const LOGIN_FORM_DEFINITION = {
  defaultValues: {
    email: '',
    password: '',
  },
  resolver: yupResolver(LoginSchema),
};

function useFieldError(name: string) {
  const formContext = useFormContext();
  if (!formContext) {
    throw new Error('useFieldError must be used within a FormContext');
  }
  const {
    formState: { errors, touchedFields },
  } = formContext;
  return touchedFields[name] && errors[name]?.message
    ? errors[name]?.message
    : undefined;
}

const LoginForm = () => {
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const formContext = useForm<LoginFields>(LOGIN_FORM_DEFINITION);
  const { register, handleSubmit, formState } = formContext;
  const { errors, touchedFields } = formState;

  const onSubmit = async (formData: LoginFields) => {
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
  };

  return (
    <form className="max-w-xs" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Email"
        type="email"
        touched={touchedFields.email}
        errors={errors.password?.message}
        {...register('email')}
      />
      <TextInput
        label="Password"
        type="password"
        touched={touchedFields.password}
        errors={errors.password?.message}
        {...register('password')}
      />
      {submissionError && <div className="text-red-500">{submissionError}</div>}
      {successMsg && <div className="text-green-500">{successMsg}</div>}
      <div>{successMsg}</div>
      <Button type="submit" fullWidth />
    </form>
  );
};

export default LoginForm;
