import { BaseOpenAiResponse, OpenAiRequest, OpenAiResponse } from "#/features/chat/openai";
import { CHAT_GPT_MODEL, CHAT_GPT_URL, DAVINCI_URL } from "#/features/chat/constants/gpt-prompt";
import { makeRequest, post } from "#/lib/helpers/request-helpers/makeRequest";

export const GENERATE_CHAT_ENDPOINT = "/api/chat/generate";

export default async function handler({ body }: Request, res: any) {
  const payload = { ...body } as OpenAiRequest;
  const isChatGpt = payload.model === CHAT_GPT_MODEL;

  if ((isChatGpt && !payload.messages) || (!isChatGpt && !payload.prompt)) {
    const error = isChatGpt ? "No 'messages' in the request" : "No 'prompt' in the request";
    return new Response(error, { status: 400 });
  }

  const authHeaders = { Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}` };
  const endpointUrl = isChatGpt ? CHAT_GPT_URL : DAVINCI_URL;
  const response = await post<OpenAiResponse>(endpointUrl, payload, authHeaders);

  const result = isChatGpt ? response.choices[0].message?.content : response.choices[0].text;

  if (!result) {
    res.status(500).json({ error: "No result from OpenAI" });
    return;
  }
  res.status(200).json(result);
}
