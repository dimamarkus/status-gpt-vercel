"use client";

import { VIEWS, useAuthContext } from "#/lib/contexts/AuthContext";
import { BaseLink } from "#/ui/_base/BaseLink/BaseLink";
import Card from "#/ui/atoms/containers/Card/Card";
import ResetPasswordForm from "#/ui/molecules/forms/ResetPasswordForm/ResetPasswordForm";
import SignInForm from "#/ui/molecules/forms/SignInForm/SignInForm";
import SignUpForm from "#/ui/molecules/forms/SignUpForm/SignUpForm";
import UpdatePasswordForm from "#/ui/molecules/forms/UpdatePasswordForm/UpdatePasswordForm";

type AuthProps = {
  view: string | null;
};

export const Auth = ({ view: initialView }: AuthProps) => {
  let { view } = useAuthContext();

  if (initialView) {
    view = initialView;
  }

  switch (view) {
    case VIEWS.UPDATE_PASSWORD:
      return (
        <Card title="Update Password">
          <UpdatePasswordForm />
        </Card>
      );
    case VIEWS.FORGOTTEN_PASSWORD:
      return (
        <Card title="Reset Password">
          <ResetPasswordForm />
          <BaseLink href="/auth/sign-in" text="Try signin in again" />
        </Card>
      );
    case VIEWS.SIGN_UP:
      return (
        <Card title="Create Account">
          <SignUpForm />
          <BaseLink href="/auth/sign-in" text="Already have an account? Sign In." />
        </Card>
      );
    default:
      return (
        <Card title="Sign In">
          <SignInForm />
          <BaseLink href="/auth/reset-password" text="Forgot your password?" />
          <BaseLink href="/auth/sign-up" text="Don't have an account? Sign up." />
        </Card>
      );
  }
};

export default Auth;
