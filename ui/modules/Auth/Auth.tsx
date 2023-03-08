'use client';

import { useAuthContext, VIEWS } from '#/lib/contexts/AuthContext';
import ResetPassword from '#/ui/modules/Auth/ResetPassword/ResetPassword';
import SignIn from '#/ui/modules/Auth/SignIn/SignIn';
import SignUp from '#/ui/modules/Auth/SignUp/SignUp';
import UpdatePassword from '#/ui/modules/Auth/UpdatePassword/UpdatePassword';

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
      return <UpdatePassword />;
    case VIEWS.FORGOTTEN_PASSWORD:
      return <ResetPassword />;
    case VIEWS.SIGN_UP:
      return <SignUp />;
    default:
      return <SignIn />;
  }
};

export default Auth;
