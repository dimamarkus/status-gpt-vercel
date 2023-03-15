import { NextApiRequest, NextApiResponse } from "next";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { getResourceFromCms } from "#/lib/helpers/request-helpers/makeCmsRequest";
import { BotTraining, CmsResource } from "#/lib/types/cms";
import { pluralizeCmsModel } from "#/lib/helpers/url-helpers";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  const { secret } = query;

  const isAuthorized = secret !== process.env.STRAPI_WEBHOOK_SECRET;
  if (!isAuthorized) {
    return res.status(401).send(`Invalid token`);
  }
  try {
    const body = req.body;
    const entryId = body?.entry?.id;
    if (!entryId) {
      return res.status(500).send(`No entry id`);
    }
    const { model } = body;

    // ============================================================================
    //  Revlidate any pages that were just updated
    // ============================================================================
    if (model === "bot") {
      // This should be the actual path not a rewritten path
      // e.g. for "/blog/[slug]" this should be "/blog/post-1"
      const endpoint = "/bots/" + body?.entry.slug;
      res.revalidate("/chat/" + body?.entry.slug);
    }

    // ============================================================================
    //  Revalidate all pages that are related to this entry
    // ============================================================================
    const endpoint = pluralizeCmsModel(model);
    getResourceFromCms<BotTraining>(endpoint, entryId.toString(), true).then(({ data }) => {
      const relatedBots = data.attributes.bot_ids?.data;
      if (relatedBots && relatedBots.length > 0) {
        relatedBots.forEach((bot) => {
          res.revalidate("/chat/" + bot.attributes.slug);
        });
      }
    });
    res.json({ revalidated: true });
    // return res.status(200).send("Webhook success");
    return res.status(200);
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(400).send('Webhook error: "Webhook handler failed. View logs."');
  }
}
