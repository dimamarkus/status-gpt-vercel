'use client';

import LandingLayout from '#/ui/layouts/LandingLayout/LandingLayout';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <LandingLayout>
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
    </LandingLayout>
  );
}
