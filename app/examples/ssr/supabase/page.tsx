import { ExternalLink } from '#/ui/examples/external-link';

export default function Page() {
  return (
    <div className="prose-sm prose-invert prose max-w-none">
      <h1 className="text-xl font-bold">Server-side rendering w Supabase</h1>

      <ul>
        <li>
          With server-side rendering, the HTML of the page is generated on a
          server for each request. The generated HTML, JSON data, and JavaScript
          instructions to make the page interactive are then sent to the client.
        </li>
        <li>
          On the client, the HTML is used to show a fast non-interactive page,
          while React uses the JSON data and JavaScript instructions to make
          components interactive (for example, attaching event handlers to a
          button). This process is called hydration.
        </li>
        <li>
          This example uses the supabase-js library to pull data via their API.
          It utilizes the `createServerComponentSupabaseClient` from the helper
          `@supabase/auth-helpers-nextjs` library.
        </li>
      </ul>

      <div className="flex gap-2">
        <ExternalLink href="https://supabase.com/docs/guides/auth/auth-helpers/nextjs-server-components">
          Docs
        </ExternalLink>
        <ExternalLink href="https://github.com/dimamarkus/status-nextjs/tree/main/app/ssr/supabase">
          Code
        </ExternalLink>
      </div>
    </div>
  );
}
