'use client';

import { useAuthContext, VIEWS } from '#/lib/contexts/AuthContext';
import Button from '#/ui/atoms/Button/Button';
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
      <Button size="sm" onClick={signOut} text="Log out" />
    </BaseButtonGroup>
  ) : (
    <BaseButtonGroup>
      <Button type="secondary" onClick={logIn} text="Log In" />
      <Button type="primary" onClick={signUp} text="Sign Up" />
    </BaseButtonGroup>
  );
};

export default AuthButtons;
