"use client";

import { ExternalLink } from "#/ui/examples/external-link";

export default function Page() {
  return (
    <div className="prose-sm prose-invert prose max-w-none">
      <h1 className="text-xl font-bold">Strapi Test</h1>
      <ul>
        <li>
          With server-side rendering, the HTML of the page is generated on a server for each
          request. The generated HTML, JSON data, and JavaScript instructions to make the page
          interactive are then sent to the client.
        </li>
        <li>
          On the client, the HTML is used to show a fast non-interactive page, while React uses the
          JSON data and JavaScript instructions to make components interactive (for example,
          attaching event handlers to a button). This process is called hydration.
        </li>
        <li>
          Examples are provided for the default <strong>Fetch API</strong> or for connecting to a{" "}
          <strong> Supabase</strong> database API
        </li>
      </ul>

      <div className="flex gap-2">
        <ExternalLink href="https://beta.nextjs.org/docs/data-fetching/fetching#dynamic-data">
          Docs
        </ExternalLink>
        <ExternalLink href="https://github.com/dimamarkus/status-nextjs/tree/main/app/ssr">
          Code
        </ExternalLink>
      </div>
    </div>
  );
}
