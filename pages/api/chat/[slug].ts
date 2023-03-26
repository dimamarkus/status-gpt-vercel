import { GPT_CHAT_URL, GPT_COMPLETIONS_URL } from "#/app/chat/lib/constants";
import { isChatModel } from "#/app/chat/lib/helpers/chat-helpers";
import {
  BaseOpenAiRequest,
  GptMessage,
  OpenAiChatRequest,
  OpenAiChatResponse,
  OpenAiCompletionRequest,
  OpenAiCompletionResponse,
  OpenAiRequest,
  OpenAiResponse,
} from "#/app/chat/lib/openai";
import { DEFAULT_GPT_SETTINGS } from "#/lib/constants/settings";
import { fetchBot, getResourcesFromCms } from "#/lib/helpers/request-helpers/makeCmsRequest";
import { makePostRequest } from "#/lib/helpers/request-helpers/makeRequest";
import { ResponseError, StatusChatMessage } from "#/lib/types";
import { NextApiRequest, NextApiResponse } from "next";

export const GENERATE_CHAT_ENDPOINT = "/chat/generate";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("1");
  const slug = req.query.slug;
  console.log("2");
  const chatLog = req.body as GptMessage[];

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ error: "No bot slug provided" });
  } else if (!chatLog || !Array.isArray(chatLog) || chatLog.length === 0) {
    return res.status(400).json({ error: "No chatLog in the request body" });
  }

  console.log("3");
  const bot = await fetchBot(slug);
  console.log("4");
  const useChatApi = !!bot && isChatModel(bot.model);
  console.log("5");
  const endpointUrl = useChatApi ? GPT_CHAT_URL : GPT_COMPLETIONS_URL;
  console.log("6");
  // const authHeaders = { Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}` };
  const authHeaders = { Authorization: `Bearer ${process.env.OPENAI_API_KEY3 ?? "tureed"}` };

  console.log("7");
  const chatLogToSend = useChatApi
    ? { messages: chatLog }
    : { prompt: chatLog.map(({ content }) => content).join("\n") };

  console.log("8");
  const getGptParam = (param: keyof Omit<OpenAiRequest, "stream" | "n">) =>
    (!!bot && bot[param]) || DEFAULT_GPT_SETTINGS[param];

  console.log("9");
  const tokens = getGptParam("max_tokens")?.toString();
  console.log("10");
  const max_tokens = !!tokens ? parseInt(tokens, 10) : DEFAULT_GPT_SETTINGS["max_tokens"];
  console.log("11");
  const payload = {
    ...chatLogToSend,
    model: getGptParam("model"),
    temperature: getGptParam("temperature"),
    top_p: getGptParam("top_p"),
    frequency_penalty: getGptParam("frequency_penalty"),
    presence_penalty: getGptParam("presence_penalty"),
    max_tokens,
    n: DEFAULT_GPT_SETTINGS["n"],
    stream: false,
  };

  console.log("12");
  const response = await makePostRequest<OpenAiResponse | ResponseError, OpenAiRequest>(
    endpointUrl,
    payload,
    authHeaders,
  );

  console.log("13");
  // const result = useChatApi
  //   ? (response as OpenAiChatResponse).choices[0].message?.content
  //   : (response as OpenAiCompletionResponse).choices[0].text;
  console.log("response", response);

  if ((response as ResponseError).status === 500) {
    console.log("14");
    res.status(500).json("No response from OpenAI");
    return;
  } else if ((response as ResponseError).status === 401) {
    console.log("15");
    const { status, statusText } = response as ResponseError;
    res.status(429).json(statusText + " i 401ed");
    return;
  } else if ((response as ResponseError).status === 429) {
    console.log("16");
    const { status, statusText } = response as ResponseError;
    res.status(status).json(statusText + " i 429ed");
    return;
  } else if ((response as ResponseError).status !== 200) {
    console.log("17");
    const { status, statusText } = response as ResponseError;
    res.status(status).json(statusText + " i just fucked up");
    return;
  }

  res.status(200).json(response);
}
