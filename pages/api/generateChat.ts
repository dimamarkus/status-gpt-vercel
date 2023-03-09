import { CHAT_GPT_MODEL, OpenChatGptStream } from "#/lib/functions/ChatGptStream";
import { GptMessage } from "#/types";

export interface ChatGptStreamPayload {
  model: "gpt-3.5-turbo";
  messages: GptMessage[];
  temperature?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  max_tokens?: number;
  stream?: boolean;
  n?: number;
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request, res: any) {
  const { messages } = (await req.json()) as {
    messages?: GptMessage[];
  };

  if (!messages) {
    return new Response("No messages in the request", { status: 400 });
  }

  const payload: ChatGptStreamPayload = {
    model: CHAT_GPT_MODEL,
    messages,
    stream: true,
    // temperature: 0.5,
    // top_p: 1,
    // frequency_penalty: 0,
    // presence_penalty: 0,
    // max_tokens: 300,
    // n: 1,
  };

  const stream = await OpenChatGptStream(payload);

  return new Response(stream);
}
