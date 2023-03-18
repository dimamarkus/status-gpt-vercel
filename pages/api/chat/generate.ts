import { CHAT_GPT_MODEL, GPT_CHAT_URL, GPT_COMPLETIONS_URL } from "#/app/chat/lib/constants";
import { isChatModel } from "#/app/chat/lib/helpers/chat-helpers";
import {
  OpenAiChatModel,
  OpenAiChatRequest,
  OpenAiChatResponse,
  OpenAiCompletionModel,
  OpenAiCompletionRequest,
  OpenAiCompletionResponse,
  OpenAiModel,
  OpenAiRequest,
  OpenAiResponse,
} from "#/app/chat/lib/openai";
import { makeBaseRequest } from "#/lib/helpers/request-helpers/makeBaseRequest";
import { makePostRequest } from "#/lib/helpers/request-helpers/makePostRequest";

export const GENERATE_CHAT_ENDPOINT = "/chat/generate";

export default async function handler({ body }: Request, res: any) {
  console.log("-----------------------------------------------------------");
  const payload = { ...body } as OpenAiRequest;
  console.log("payload prompt", payload);
  const useChatApi = isChatModel(payload.model);
  console.log("useChatApi prompt", useChatApi);

  if (useChatApi && !(payload as OpenAiChatRequest).messages) {
    return new Response("No 'messages' in the request", { status: 400 });
  } else if (!useChatApi && !(payload as OpenAiCompletionRequest).prompt) {
    return new Response("No 'prompt' in the request", { status: 400 });
  }

  const endpointUrl = useChatApi ? GPT_CHAT_URL : GPT_COMPLETIONS_URL;
  const authHeaders = { Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}` };

  const response = await makePostRequest<OpenAiResponse, OpenAiRequest>(
    endpointUrl,
    payload,
    authHeaders,
  );

  const result = useChatApi
    ? (response as OpenAiChatResponse).choices[0].message?.content
    : (response as OpenAiCompletionResponse).choices[0].text;

  if (!result) {
    res.status(500).json({ error: "No result from OpenAI" });
    return;
  }
  res.status(200).json(result);
}
