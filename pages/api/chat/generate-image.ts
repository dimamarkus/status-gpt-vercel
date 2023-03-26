import { NextApiResponse } from "next";

export const GENERATE_CHAT_AVATAR_URL = "/api/chat/generate-image";

export default async function handler(req: Request, res: NextApiResponse) {
  const payload = {
    prompt:
      "An avatar for a chatbot financial advisor. modern. minimal. blue and white color scheme. line art.",
    size: "512x512",
    n: 1,
  };

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const json = await response.json();
  res.status(200).json(json);
}
