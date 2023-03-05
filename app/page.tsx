import { demos } from '#/lib/examples/demos';
import Link from 'next/link';

export default function Page() {
  return (
    <body className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">Hello World</h1>
      <Link
        href={`/examples`}
        className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
      >
        Examples
      </Link>
    </body>
  );
}
