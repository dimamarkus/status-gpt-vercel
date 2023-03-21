"use client";

import { useIsMobile } from "#/lib/hooks/useIsMobile";
import Link from "#/ui/atoms/Link/Link";
import BaseButtonGroup, { BaseButtonGroupProps } from "#/ui/_base/BaseButtonGroup/BaseButtonGroup";

export interface AuthButtonsProps extends BaseButtonGroupProps {
  children?: React.ReactNode;
}

export const AuthButtons = (props: AuthButtonsProps) => {
  const isMobile = useIsMobile();
  const user = false;
  return user ? (
    <BaseButtonGroup {...props}>
      <span className="welcome">
        Welcome, <b>{user}</b>!
      </span>
      <Link asButton text="Log out" href={"/logout"} />
    </BaseButtonGroup>
  ) : (
    <BaseButtonGroup gap={isMobile ? "none" : "sm"}>
      <Link
        asButton
        className={"btn-link btn-sm w-20 md:btn-md md:w-28" + " " + (isMobile && "hidden")}
        type="default"
        text="Log In"
        title="Log in to your Status Money account."
        href={"https://statusmoney.com/login"}
      />
      <Link
        asButton
        className="btn-sm w-28 px-2 md:btn-md md:w-32"
        type="secondary"
        text="Join Status"
        title="Become a Status Money member today."
        href={"https://statusmoney.com/onboarding/register"}
      />
    </BaseButtonGroup>
  );
};

export default AuthButtons;
