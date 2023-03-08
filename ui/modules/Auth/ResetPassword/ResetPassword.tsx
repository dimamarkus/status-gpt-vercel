'use client';

import { useAuthContext, VIEWS } from '#/lib/context/authContext';
import { Button } from '#/ui/global/buttons/Button/Button';
import Card from '#/ui/global/Card/Card';
import ResetPasswordForm from '#/ui/global/forms/ResetPasswordForm/ResetPasswordForm';
import styles from './ResetPassword.module.scss';

const ResetPassword = () => {
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
