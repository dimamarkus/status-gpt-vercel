import {
  CARDINAL_BOT_RULE,
  CHAT_400_ERROR_RESPONSE,
  CHAT_401_ERROR_RESPONSE,
  CHAT_429_ERROR_RESPONSE,
  CHAT_500_ERROR_RESPONSE,
  GPT_CHAT_URL,
  GPT_COMPLETIONS_URL
} from "#/app/chat/lib/constants";
import {collateBotTraining, getBotParam} from "#/app/chat/lib/helpers/bot-helpers";
import {createChatMessage, isChatModel} from "#/app/chat/lib/helpers/chat-helpers";
import {createOpenAiStream} from "#/app/chat/lib/helpers/createOpenAiStream";
import {OpenAiRequest, OpenAiResponse, StatusChatRequest} from "#/app/chat/lib/types";
import {DEFAULT_BOT_LANGUAGE, DEFAULT_GPT_SETTINGS} from "#/lib/constants/settings";
import {fetchBot} from "#/lib/databases/cms";
import {makeBaseRequest} from "#/lib/helpers/requests/makeBaseRequest";
import {NextResponse} from "next/server";

// export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const request = (await req.json()) as Partial<StatusChatRequest>;

    const { messages, stream, language, max_tokens, ...payload } = request;

    let chatLog = messages;

    // 1. Validate Request
    // ============================================================================
    if (!slug || typeof slug !== "string") {
      return new NextResponse("No bot slug provided", { status: 400 });
    } else if (!chatLog || !Array.isArray(chatLog) || chatLog.length === 0) {
      return new NextResponse("No chatLog in the request body", { status: 400 });
    }

    // 2. Fetch Bot and Create Chat Log
    // ============================================================================
    const bot = await fetchBot(slug);
    const useChatApi = isChatModel(bot?.model);
    const botTokens = max_tokens || (getBotParam(bot, "max_tokens") as number);

    const trainingContent = collateBotTraining(bot);
    const trainingMessage = createChatMessage("system", trainingContent);
    let supplementaryTraining = `Respond in less than ${botTokens * 0.75} words`;
    if (language) {
      supplementaryTraining += ` and in the language: ${language || DEFAULT_BOT_LANGUAGE}.`;
    }
    supplementaryTraining += CARDINAL_BOT_RULE;
    const supplementaryTrainingMessage = createChatMessage("system", supplementaryTraining);
    const chatLogWithTraining = [trainingMessage, ...chatLog, supplementaryTrainingMessage];
    const sanitizedChatLog = chatLogWithTraining.map(({ role, content }) => ({
      role,
      content: content.trim(),
    }));

    const chatLogToSend = useChatApi
      ? { messages: sanitizedChatLog }
      : { prompt: sanitizedChatLog.map(({ content }) => content).join("\n") };

    // 3. Prepare API call
    // ============================================================================
    const url = useChatApi ? GPT_CHAT_URL : GPT_COMPLETIONS_URL;
    const headers = { Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}` };
    const body = {
      ...chatLogToSend,
      model: getBotParam(bot, "model"),
      temperature: getBotParam(bot, "temperature"),
      top_p: getBotParam(bot, "top_p"),
      frequency_penalty: getBotParam(bot, "frequency_penalty"),
      presence_penalty: getBotParam(bot, "presence_penalty"),
      max_tokens: getBotParam(bot, "max_tokens"),
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
      return new NextResponse(responseStream);
    }

    const result = await response.json();
    if (!!(result as unknown as OpenAiResponse).choices) {
      return new NextResponse(JSON.stringify(result), { status: 200 });
    }

    // 6. Handle failure
    // ============================================================================
    const { status } = response;

    if (status === 400) {
      return new NextResponse(CHAT_400_ERROR_RESPONSE, response);
    } else if (status === 401) {
      // Easiest error to force for debugging by breaking the API key
      return new NextResponse(CHAT_401_ERROR_RESPONSE, response);
    } else if (status === 429) {
      // Rate Limit
      return new NextResponse(CHAT_429_ERROR_RESPONSE, response);
    }
    // OpenAI Api Error
    return new NextResponse(CHAT_500_ERROR_RESPONSE, response);
  } catch (error: any) {
    console.error("ERROR in /api/chat/[slug]", error);
    return new NextResponse(CHAT_500_ERROR_RESPONSE, { status: 500 });
  }
}
