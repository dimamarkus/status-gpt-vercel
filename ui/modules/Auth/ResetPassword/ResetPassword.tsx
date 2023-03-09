'use client';

import { useAuthContext, VIEWS } from '#/lib/contexts/AuthContext';
import { Button } from '#/ui/atoms/Button/Button';
import Card from '#/ui/containers/Card/Card';
import ResetPasswordForm from '#/ui/molecules/forms/ResetPasswordForm/ResetPasswordForm';
import styles from './ResetPassword.module.scss';

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
