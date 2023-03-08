import * as yup from 'yup';

export const firstNameValidation = yup
  .string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required');

export const lastNameValidation = yup
  .string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required');

export const validEmailValidation = yup
  .string()
  .email('Invalid email')
  .required('Required');

export const passwordValidation = yup.string().required('Password is required');
