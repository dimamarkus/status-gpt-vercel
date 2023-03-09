'use client';

import { useAuthContext, VIEWS } from '#/lib/contexts/AuthContext';
import Link from '#/ui/atoms/Link/Link';
import BaseButtonGroup, {
  BaseButtonGroupProps,
} from '#/ui/_base/BaseButtonGroup/BaseButtonGroup';

export interface AuthButtonsProps extends BaseButtonGroupProps {
  children?: React.ReactNode;
}

export const AuthButtons = (props: AuthButtonsProps) => {
  const { user, setView, signOut } = useAuthContext();
  const logIn = () => setView(VIEWS.SIGN_IN);
  const signUp = () => setView(VIEWS.SIGN_UP);
  return user ? (
    <BaseButtonGroup {...props}>
      <span className="welcome">
        Welcome, <b>{user.user_metadata.name}</b>!
      </span>
      <Link asButton text="Log out" href={'/logout'} onClick={signOut} />
    </BaseButtonGroup>
  ) : (
    <BaseButtonGroup>
      <Link
        asButton
        className="w-32"
        type="secondary"
        text="Log In"
        href={'/login'}
        onClick={logIn}
      />
      <Link
        asButton
        className="w-32"
        type="primary"
        text="Sign Up"
        href={'https://statusmoney.com/register'}
        onClick={signUp}
      />
    </BaseButtonGroup>
  );
};

export default AuthButtons;
