import { CHAT_GPT_MODEL, GPT_CHAT_URL, GPT_COMPLETIONS_URL } from "#/app/chat/lib/constants";
import { OpenAiRequest, OpenAiResponse } from "#/app/chat/lib/openai";
import { post } from "#/lib/helpers/request-helpers/makeRequest";

export const GENERATE_CHAT_ENDPOINT = "/api/chat/generate";

export default async function handler({ body }: Request, res: any) {
  const payload = { ...body } as OpenAiRequest;
  const isChatGpt = payload.model === CHAT_GPT_MODEL;

  if ((isChatGpt && !payload.messages) || (!isChatGpt && !payload.prompt)) {
    const error = isChatGpt ? "No 'messages' in the request" : "No 'prompt' in the request";
    return new Response(error, { status: 400 });
  }

  const authHeaders = { Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}` };
  const endpointUrl = isChatGpt ? GPT_CHAT_URL : GPT_COMPLETIONS_URL;
  const response = await post<OpenAiResponse, OpenAiRequest>(endpointUrl, payload, authHeaders);

  const result = isChatGpt ? response.choices[0].message?.content : response.choices[0].text;

  if (!result) {
    res.status(500).json({ error: "No result from OpenAI" });
    return;
  }
  res.status(200).json(result);
}
