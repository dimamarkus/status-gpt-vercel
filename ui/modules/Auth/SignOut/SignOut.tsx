'use client';

import { useAuthContext } from '#/lib/context/authContext';

export const SignOut = () => {
  const { signOut } = useAuthContext();

  async function handleSignOut() {
    const { error } = await signOut();

    if (error) {
      console.error('ERROR signing out:', error);
    }
  }

  return (
    <button type="button" className="button-inverse" onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOut;
