'use client';

import { useAuthContext, VIEWS } from '#/lib/contexts/AuthContext';
import LandingLayout from '#/ui/layouts/LandingLayout/LandingLayout';
import Auth from '#/ui/modules/Auth/Auth';
import Link from 'next/link';

const InnerPage = () => {
  const { user, view, signOut } = useAuthContext();

  if (view === VIEWS.UPDATE_PASSWORD) {
    return <Auth view={view} />;
  }

  if (user) {
    return (
      <div className="card">
        <h2>Welcome!</h2>
        <code className="highlight">{user.role}</code>
        <Link className="button" href="/profile">
          Go to Profile
        </Link>
        <button type="button" className="button-inverse" onClick={signOut}>
          Sign Out
        </button>
      </div>
    );
  }

  return <div></div>;
};

export default function Page() {
  return (
    <LandingLayout>
      <InnerPage />
    </LandingLayout>
  );
}
