import { OpenAiApiStatusResponse } from "#/app/chat/lib/types";
import { updateChatSettings } from "#/lib/databases/cms";
import { ChatApiHealth } from "#/lib/types/cms";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * This code handles incoming webhook requests to update the chat API health status based on the OpenAI API status.
 * It imports necessary types, functions, and libraries, and exports a default handler function.
 *
 * https://status.openai.com
 * https://support.atlassian.com/statuspage/docs/enable-webhook-notifications/
 *
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { component } = req.body as OpenAiApiStatusResponse;

    // if (component && component.name === "api") {
    if (component) {
      let api_health: ChatApiHealth = "unknown";
      const { status } = component;

      if (status === "operational") {
        api_health = "excellent";
      } else if (status === "degraded_performance") {
        api_health = "good";
      } else if (status === "partial_outage") {
        api_health = "fair";
      } else if (status === "major_outage" || status === "under_maintenance") {
        api_health = "poor";
      }

      const result = updateChatSettings({ api_health });
      return res.status(200).send(result);
    }
    return res.status(200).send("Nothing changed.");
  } catch (err) {
    return res.status(400).send('Webhook error: "Webhook handler failed. View logs."');
  }
}
