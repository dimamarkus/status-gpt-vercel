import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";

export const DAVINCI_MODEL = "text-davinci-003";
export const DAVINCI_URL = "https://api.openai.com/v1/completions";
export const CHAT_GPT_MODEL = "gpt-3.5-turbo";
export const CHAT_GPT_URL = "https://api.openai.com/v1/chat/completions";

export type GptMessage = {
  role: "assistant" | "user" | "system";
  content: string;
};

export type BasefetchOpenAiStreamPayload = {
  model: typeof DAVINCI_MODEL | typeof CHAT_GPT_MODEL;
  temperature?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  max_tokens?: number;
  n?: number;
};

export type CompletionStreamPayload = BasefetchOpenAiStreamPayload & {
  prompt: string;
};

export type ChatStreamPayload = BasefetchOpenAiStreamPayload & {
  messages: GptMessage[];
};

export type fetchOpenAiStreamPayload = CompletionStreamPayload | ChatStreamPayload;

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export async function fetchOpenAiStream(
  payload: fetchOpenAiStreamPayload,
): Promise<ReadableStream> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;
  const isChatGpt = payload.model === CHAT_GPT_MODEL;
  const url = payload.model === DAVINCI_MODEL ? DAVINCI_URL : CHAT_GPT_URL;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify({ ...payload, stream: true }),
  });

  const stream = new ReadableStream({
    async start(controller) {
      // callback
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = isChatGpt ? json.choices[0].delta.content : json.choices[0].text;
            // if (counter < 2 && (text.match(/\n/) || []).length) {
            //   // this is a prefix character (i.e., "\n\n"), do nothing
            //   return;
            // }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            // maybe parse error
            controller.error(e);
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse);
      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
}
