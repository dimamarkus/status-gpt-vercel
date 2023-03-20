"use client";

import { useAuthContext, VIEWS } from "#/lib/contexts/AuthContext";
import { useIsMobile } from "#/lib/hooks/useIsMobile";
import Link from "#/ui/atoms/Link/Link";
import BaseButtonGroup, { BaseButtonGroupProps } from "#/ui/_base/BaseButtonGroup/BaseButtonGroup";

export interface AuthButtonsProps extends BaseButtonGroupProps {
  children?: React.ReactNode;
}

export const AuthButtons = (props: AuthButtonsProps) => {
  const isMobile = useIsMobile();
  const { user, setView, signOut } = useAuthContext();
  const logIn = () => setView(VIEWS.SIGN_IN);
  const signUp = () => setView(VIEWS.SIGN_UP);
  return user ? (
    <BaseButtonGroup {...props}>
      <span className="welcome">
        Welcome, <b>{user.user_metadata.name}</b>!
      </span>
      <Link asButton text="Log out" href={"/logout"} onClick={signOut} />
    </BaseButtonGroup>
  ) : (
    <BaseButtonGroup gap={isMobile ? "none" : "sm"}>
      <Link
        asButton
        className="btn-link btn-sm w-20 md:btn-md md:w-32"
        // type={isMobile ? "default" : "secondary"}
        type="default"
        text="Log In"
        href={"https://statusmoney.com/login"}
        onClick={logIn}
      />
      <Link
        asButton
        className="btn-sm w-20 px-2 md:btn-md md:w-32"
        type="secondary"
        text="Sign Up"
        href={"https://statusmoney.com/onboarding/register"}
        onClick={signUp}
      />
    </BaseButtonGroup>
  );
};

export default AuthButtons;
