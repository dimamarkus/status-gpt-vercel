import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";
import { OpenAiRequest } from "#/app/chat/lib/openai";
import { makeStreamRequest } from "#/lib/helpers/request-helpers/makeStreamRequest";
import { CHAT_GPT_MODEL, GPT_CHAT_URL, GPT_COMPLETIONS_URL } from "#/app/chat/lib/constants";

export const config = {
  runtime: "edge",
};

export const GENERATE_CHAT_STREAM_ENDPOINT = "/api/chat/generate-stream";

export default async function handler(req: Request, res: any) {
  const payload = (await req.json()) as OpenAiRequest;

  const isChatGpt = payload.model === CHAT_GPT_MODEL;
  if ((isChatGpt && !payload.messages) || (!isChatGpt && !payload.prompt)) {
    const error = isChatGpt ? "No messages in the request" : "No prompt in the request";
    return new Response(error, { status: 400 });
  }

  const requestBody = { ...payload, stream: true };
  const endpointUrl = isChatGpt ? GPT_CHAT_URL : GPT_COMPLETIONS_URL;
  const authHeaders = { Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}` };
  const response = await makeStreamRequest(endpointUrl, "POST", requestBody, authHeaders);

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
            const text = isChatGpt ? json.choices[0].delta.content : json.choices[0].text;
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
