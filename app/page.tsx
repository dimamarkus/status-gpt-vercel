'use client';

import { Button } from '#/ui/global/Button/Button';
import Link from 'next/link';

export default function Page() {
  return (
    <body className="body-loading space-y-8">
      <h1 className="text-xl font-medium text-gray-300">Hello World</h1>
      <Button onClick={() => alert('Hello World')} label="Click Me" primary />
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
    </body>
  );
}
