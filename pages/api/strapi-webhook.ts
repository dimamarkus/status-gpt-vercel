import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { getResourceFromCms } from "#/lib/helpers/request-helpers/makeCmsRequest";
import { BotTraining, CmsResource } from "#/types/cms";
import { pluralizeCmsModel } from "#/lib/helpers/url-helpers";

export const config = {
  runtime: "edge",
};

export default async function handler(
  req: NextRequest,
  res: { revalidate: (arg0: string) => any; json: (arg0: { revalidated: boolean }) => any },
) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const body = await req.json();

  const isAuthorized = secret !== process.env.STRAPI_WEBHOOK_SECRET;
  if (!isAuthorized) {
    return new Response("Invalid token", { status: 401 });
  }

  try {
    const entryId = body?.entry?.id;
    if (!entryId) {
      return new Response("No entry id", { status: 500 });
    }
    const { model } = body;

    // ============================================================================
    //  Revlidate any bots that were just updated
    // ============================================================================
    if (model === "bot") {
      // This should be the actual path not a rewritten path
      // e.g. for "/blog/[slug]" this should be "/blog/post-1"
      await res.revalidate("/bots/" + body?.entry.slug);
      return res.json({ revalidated: true });
    }

    // ============================================================================
    //  Revalidate all bots that are related to this entry
    // ============================================================================
    const endpoint = pluralizeCmsModel(model);
    return await getResourceFromCms<BotTraining>(endpoint, entryId.toString(), true).then(
      ({ data }) => {
        const relatedBots = data.attributes.bot_ids?.data;
        if (relatedBots && relatedBots.length > 0) {
          relatedBots.forEach((bot) => {
            res.revalidate("/bots/" + bot.attributes.slug);
          });
        }
      },
    );
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return new Response("Error revalidating", { status: 500 });
  }
}
