'use client';

import Card from '#/ui/atoms/Card/Card';
import UpdatePasswordForm from '#/ui/molecules/forms/UpdatePasswordForm/UpdatePasswordForm';
import styles from './UpdatePassword.module.scss';

export const UpdatePassword = () => {
  return (
    <Card className={styles.UpdatePassword}>
      <h2 className="w-full text-center">Update Password</h2>
      <UpdatePasswordForm />
    </Card>
  );
};

export default UpdatePassword;
