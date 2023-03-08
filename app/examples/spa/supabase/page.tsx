import { ExternalLink } from '#/ui/examples/external-link';

export default function Page() {
  return (
    <div className="prose-sm prose-invert prose max-w-none">
      <h1 className="text-xl font-bold">Single Page Application (SPA)</h1>

      <ul>
        <li>
          In this example, static rendering is used to pre-render content. The
          result of the rendering is stored on a CDN and re-used for each
          request.
        </li>
        <li>
          This example uses the supabase-js library to pull data via their API.
        </li>
        <li>
          It utilizes the `generateStaticParams` function to pre-render the
          content at build-time.
        </li>
      </ul>

      <div className="flex gap-2">
        <ExternalLink href="https://supabase.com/blog/fetching-and-caching-supabase-data-in-next-js-server-components#static">
          Docs
        </ExternalLink>
        <ExternalLink href="https://github.com/dimamarkus/status-nextjs/tree/main/app/ssg/supabase">
          Code
        </ExternalLink>
      </div>
    </div>
  );
}
