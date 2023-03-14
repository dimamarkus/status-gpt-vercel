"use client";
import styles from "./SignIn.module.scss";

import { useAuthContext, VIEWS } from "#/lib/contexts/AuthContext";
import Button from "#/ui/atoms/buttons/Button/Button";
import Card from "#/ui/containers/Card/Card";
import SignInForm from "#/ui/molecules/forms/SignInForm/SignInForm";

export const SignIn = () => {
  const { setView } = useAuthContext();

  return (
    <Card className={styles.SignIn}>
      <h2 className="w-full text-center">Sign In</h2>
      <SignInForm />
      <Button
        text="Forgot your password?"
        type="link"
        onClick={() => setView(VIEWS.FORGOTTEN_PASSWORD)}
      />
      <Button
        text="Don't have an account? Sign Up."
        type="link"
        onClick={() => setView(VIEWS.SIGN_UP)}
      />
    </Card>
  );
};

export default SignIn;
