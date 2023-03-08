import {
  firstNameValidation,
  lastNameValidation,
  passwordValidation,
  validEmailValidation,
} from '#/lib/forms/validators';
import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  email: validEmailValidation,
  password: passwordValidation,
});

export const SignupSchema = yup.object().shape({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  email: validEmailValidation,
  password: passwordValidation,
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match'),
});
