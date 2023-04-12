import { GPT_MODELS_URL } from "#/app/chat/lib/constants";
import { OpenAiModelResponse } from "#/app/chat/lib/types";
import { makeGetRequest } from "#/lib/helpers/requests/makeRequest";
import { NextApiRequest, NextApiResponse } from "next";

export const MODELS_ENDPOINT = "/chat/models";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const authHeaders = { Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}` };

  const result = await makeGetRequest<OpenAiModelResponse>(GPT_MODELS_URL, authHeaders);
  if (!result) {
    res.status(500).json({ error: "No result from OpenAI" });
    return;
  }
  res.status(200).json(result);
}
