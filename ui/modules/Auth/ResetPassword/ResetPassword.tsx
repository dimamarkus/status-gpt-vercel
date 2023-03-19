"use client";
import styles from "./ResetPassword.module.scss";

import { useAuthContext, VIEWS } from "#/lib/contexts/AuthContext";
import { Button } from "#/ui/atoms/buttons/Button/Button";
import Card from "#/ui/atoms/containers/Card/Card";
import ResetPasswordForm from "#/ui/molecules/forms/ResetPasswordForm/ResetPasswordForm";

export const ResetPassword = () => {
  const { setView } = useAuthContext();

  return (
    <Card className={styles.ResetPassword}>
      <h2 className="card-title">Reset Password</h2>
      <ResetPasswordForm />
      <Button
        text="Remember your password? Sign In."
        type="link"
        onClick={() => setView(VIEWS.SIGN_IN)}
      />
    </Card>
  );
};

export default ResetPassword;
