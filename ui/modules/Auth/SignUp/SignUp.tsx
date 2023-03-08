'use client';

import { useAuthContext, VIEWS } from '#/lib/context/authContext';
import Button from '#/ui/global/buttons/Button/Button';
import Card from '#/ui/global/Card/Card';
import SignUpForm from '#/ui/global/forms/SignUpForm/SignUpForm';
import styles from './SignUp.module.scss';

const SignUp = () => {
  const { setView } = useAuthContext();

  return (
    <Card className={styles.SignUp}>
      <h2 className="w-full text-center">Create Account</h2>
      <SignUpForm />
      <Button type="link" onClick={() => setView(VIEWS.SIGN_IN)}>
        Already have an account? Sign In.
      </Button>
    </Card>
  );
};

export default SignUp;
