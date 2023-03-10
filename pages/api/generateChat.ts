import { CHAT_GPT_MODEL, GptMessage, fetchOpenAiStream } from "#/lib/fetchers/fetchOpenAiStream";

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

  const stream = await fetchOpenAiStream({
    model: CHAT_GPT_MODEL,
    messages,
  });

  return new Response(stream);
}
