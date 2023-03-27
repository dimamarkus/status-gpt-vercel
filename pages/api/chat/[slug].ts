import {
  CHAT_400_ERROR_RESPONSE,
  CHAT_401_ERROR_RESPONSE,
  CHAT_429_ERROR_RESPONSE,
  CHAT_500_ERROR_RESPONSE,
  GPT_CHAT_URL,
  GPT_COMPLETIONS_URL,
} from "#/app/chat/lib/constants";
import { createChatSystemMessage, isChatModel } from "#/app/chat/lib/helpers/chat-helpers";
import { createOpenAiStream } from "#/app/chat/lib/helpers/createOpenAiStream";
import { collateBotTraining } from "#/app/chat/lib/helpers/training-helpers";
import { OpenAiChatRequest, OpenAiRequest, OpenAiResponse } from "#/app/chat/lib/openai";
import { DEFAULT_GPT_SETTINGS } from "#/lib/constants/settings";
import { makeBaseRequest } from "#/lib/helpers/request-helpers/makeBaseRequest";
import { fetchBot } from "#/lib/helpers/request-helpers/makeCmsRequest";
import { NextRequest } from "next/server";

export const runtime = "edge";

export default async function handler(req: NextRequest) {
  const { messages, stream, ...payload } = (await req.json()) as Partial<OpenAiChatRequest>;
  const chatLog = messages;
  const slug = req.nextUrl.searchParams.get("slug");

  // 1. Validate Request
  // ============================================================================
  if (!slug || typeof slug !== "string") {
    return new Response("No bot slug provided", { status: 400 });
  } else if (!chatLog || !Array.isArray(chatLog) || chatLog.length === 0) {
    return new Response("No chatLog in the request body", { status: 400 });
  }

  // 2. Fetch Bot and Create Chat Log
  // ============================================================================
  const bot = await fetchBot(slug);
  const useChatApi = isChatModel(bot?.model);

  const trainingContent = collateBotTraining(bot);
  const { role, content } = createChatSystemMessage(trainingContent);
  const chatLogWithTraining = [{ role, content }, ...chatLog];

  const chatLogToSend = useChatApi
    ? { messages: chatLogWithTraining }
    : { prompt: chatLogWithTraining.map(({ content }) => content).join("\n") };

  // 3. Prepare API call
  // ============================================================================
  const getGptParam = (param: keyof Omit<OpenAiRequest, "stream" | "n">) =>
    (!!bot && bot[param]) || (DEFAULT_GPT_SETTINGS[param] as number);

  const url = useChatApi ? GPT_CHAT_URL : GPT_COMPLETIONS_URL;
  const headers = { Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}` };
  const body = {
    ...chatLogToSend,
    model: getGptParam("model"),
    temperature: getGptParam("temperature"),
    top_p: getGptParam("top_p"),
    frequency_penalty: getGptParam("frequency_penalty"),
    presence_penalty: getGptParam("presence_penalty"),
    max_tokens: getGptParam("max_tokens"),
    n: DEFAULT_GPT_SETTINGS["n"],
    stream,
    ...payload,
  } as OpenAiRequest;

  // 4. Make API call
  // ============================================================================
  const response = await makeBaseRequest<OpenAiRequest>(url, "POST", body, headers);

  // 5. Handle successs
  // ============================================================================
  if (stream && response.status === 200) {
    const responseStream = await createOpenAiStream(response, useChatApi);
    return new Response(responseStream);
  }

  const result = await response.json();
  if (!!(result as unknown as OpenAiResponse).choices) {
    return new Response(JSON.stringify(result), { status: 200 });
  }

  // 6. Handle failure
  // ============================================================================
  console.error("api/chat/generate", result);
  const { status } = response;

  if (status === 400) {
    return new Response(CHAT_400_ERROR_RESPONSE, response);
  } else if (status === 401) {
    // Easiest error to force for debugging by breaking the API key
    return new Response(CHAT_401_ERROR_RESPONSE, response);
  } else if (status === 429) {
    // Rate Limit
    return new Response(CHAT_429_ERROR_RESPONSE, response);
  }
  // OpenAI Api Error
  return new Response(CHAT_500_ERROR_RESPONSE, response);
}
