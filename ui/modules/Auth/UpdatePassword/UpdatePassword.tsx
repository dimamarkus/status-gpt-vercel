'use client';

import Card from '#/ui/global/Card/Card';
import UpdatePasswordForm from '#/ui/global/forms/UpdatePasswordForm/UpdatePasswordForm';
import styles from './UpdatePassword.module.scss';

const UpdatePassword = () => {
  return (
    <Card className={styles.UpdatePassword}>
      <h2 className="w-full text-center">Update Password</h2>
      <UpdatePasswordForm />
    </Card>
  );
};

export default UpdatePassword;
