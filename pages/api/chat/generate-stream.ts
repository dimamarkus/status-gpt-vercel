import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";
import { GPT_CHAT_URL, GPT_COMPLETIONS_URL } from "#/app/chat/lib/constants";
import { isChatModel } from "#/app/chat/lib/helpers/chat-helpers";
import { OpenAiChatRequest, OpenAiCompletionRequest, OpenAiRequest } from "#/app/chat/lib/openai";
import { makeBaseRequest } from "#/lib/helpers/request-helpers/makeBaseRequest";

export const runtime = "experimental-edge";

export const GENERATE_CHAT_STREAM_ENDPOINT = "/chat/generate-stream";

export default async function handler(req: Request, res: any) {
  const payload = (await req.json()) as OpenAiRequest;
  const useChatApi = isChatModel(payload.model);

  if (useChatApi && !(payload as OpenAiChatRequest).messages) {
    return new Response("No 'messages' in the request", { status: 400 });
  } else if (!useChatApi && !(payload as OpenAiCompletionRequest).prompt) {
    return new Response("No 'prompt' in the request", { status: 400 });
  }

  const requestBody = { ...payload, stream: true };
  const endpointUrl = useChatApi ? GPT_CHAT_URL : GPT_COMPLETIONS_URL;
  const authHeaders = { Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}` };

  const response = await makeBaseRequest<OpenAiRequest>(
    endpointUrl,
    "POST",
    requestBody,
    authHeaders,
  );

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === "[DONE]") {
            controller.close();
          }
          try {
            const json = JSON.parse(data);
            const text = useChatApi ? json.choices[0].delta.content : json.choices[0].text;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
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
      for await (const chunk of response.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return new Response(stream);
}
