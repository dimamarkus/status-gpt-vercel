import {
  firstNameValidation,
  lastNameValidation,
  passwordValidation,
  validEmailValidation,
} from '#/lib/forms/validators';
import * as yup from 'yup';

export const EmailSchema = yup.object().shape({
  email: validEmailValidation,
});

export const PasswordSchema = yup.object().shape({
  password: passwordValidation,
});

export const SignInSchema = yup.object().shape({
  email: validEmailValidation,
  password: passwordValidation,
});

export const SignUpSchema = SignInSchema.shape({
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match'),
});

export const RegisterSchema = yup.object().shape({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  email: validEmailValidation,
  password: passwordValidation,
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match'),
});
