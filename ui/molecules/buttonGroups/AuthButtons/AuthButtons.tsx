import supabaseServerComponent from "#/lib/databases/supabase/supabase-server-component";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import BaseButtonGroup, { BaseButtonGroupProps } from "#/ui/_base/BaseButtonGroup/BaseButtonGroup";

export interface AuthButtonsProps extends BaseButtonGroupProps {
  children?: React.ReactNode;
}

export const AuthButtons = async (props: AuthButtonsProps) => {
  const supabase = supabaseServerComponent();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <BaseButtonGroup {...props} gap="sm">
      <a className="text-right" href="/profile">
        Welcome back,
        <br /> <b>{user.email}</b>!
      </a>
    </BaseButtonGroup>
  ) : (
    <>
      <BaseButtonGroup className="gap-none md:gap-sm">
        <BaseButton
          className="hidden w-20 no-underline md:btn-md md:flex md:w-28"
          text="Sign In"
          flavor="textOnly"
          title="Sign in to your Status Money account."
          href={"/auth/sign-in"}
        />
        <BaseButton
          className="w-28 px-2 md:btn-md md:w-32"
          text="Sign Up"
          title="Sign up and create your own bots"
          href={"/auth/sign-up"}
        />
      </BaseButtonGroup>
    </>
  );
};

export default AuthButtons;
