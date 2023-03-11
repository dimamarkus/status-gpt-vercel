import RealtimeProducts from "#/app/examples/realtime/realtime-products";
import { createServerSideSupabase } from "#/lib/helpers/supabase-helpers/supabase-server";

import { ExternalLink } from "#/ui/examples/external-link";

// do not cache this page
export const revalidate = 0;

export default async function Realtime() {
  const supabase = createServerSideSupabase();
  const { data } = await supabase.from("products").select("*");

  return (
    <div className="prose-sm prose-invert prose max-w-none">
      <h1 className="text-xl font-bold">Realtime fetching</h1>
      <ul>
        <li>
          This component fetches the current products server-side and subscribes to new products
          client-side
        </li>
        <li>
          Data can be passed from server components to client components this allows us to fetch the
          initial products before rendering the page our
          {"<RealtimeProducts />"} component will then subscribe to new products client-side
        </li>
        <li>Try adding a product on the database to see if it appears on this page</li>
      </ul>
      <RealtimeProducts serverProducts={data} />
      <div className="flex gap-2">
        <ExternalLink href="https://supabase.com/docs/guides/auth/auth-helpers/nextjs-server-components#realtime">
          Docs
        </ExternalLink>
        <ExternalLink href="https://github.com/dimamarkus/status-nextjs/tree/main/app/realtime">
          Code
        </ExternalLink>
      </div>
    </div>
  );
}
