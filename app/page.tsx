'use client';

import { useAuthContext, VIEWS } from '#/lib/context/authContext';
import LandingLayout from '#/ui/atoms/layouts/LandingLayout/LandingLayout';
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

  return (
    <div>
      <h2>Welcome!</h2>
      <Link
        href={`/examples`}
        className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
      >
        Examples
      </Link>
      <Link
        href={`/pricing`}
        className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
      >
        Pricing
      </Link>
      <Link
        href={`/account`}
        className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
      >
        Account
      </Link>
      <Link
        href={`/login`}
        className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
      >
        Log in
      </Link>
    </div>
  );
  // return <Auth view={view} />;
};

export default function Page() {
  return (
    <LandingLayout>
      <InnerPage />
    </LandingLayout>
  );
}
