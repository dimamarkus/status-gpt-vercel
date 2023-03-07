'use client';

import { Button } from '#/ui/global/buttons/Button/Button';
import LandingLayout from '#/ui/global/layouts/LandingLayout/LandingLayout';
import Link from 'next/link';

const InnerPage = () => {
  return (
    <div>
      <h1 className="text-xl font-medium text-gray-300">Hello World</h1>
      <Button onClick={() => alert('Hello World')} text="Click Me" />
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
        href={`/signin`}
        className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
      >
        Sign In
      </Link>
    </div>
  );
};

export default function Page() {
  return (
    <LandingLayout>
      <InnerPage />
    </LandingLayout>
  );
}
