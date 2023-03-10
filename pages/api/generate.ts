import { DAVINCI_MODEL, fetchOpenAiStream } from "#/lib/fetchers/fetchOpenAiStream";

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request, res: any) {
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const stream = await fetchOpenAiStream({
    model: DAVINCI_MODEL,
    prompt,
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 300,
    n: 1,
  });

  return new Response(stream);
}
