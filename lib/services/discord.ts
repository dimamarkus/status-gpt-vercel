import { APIApplicationCommand } from "discord-api-types/v10";

const DISCORD_APP_ID = process.env.DISCORD_APP_ID;
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

if (!DISCORD_APP_ID || !DISCORD_BOT_TOKEN) {
  throw new Error("Environment variables not configured correctly");
}

const discordApiUrl = "https://discord.com/api/v10";

const fetchOptions = {
  headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` },
};

export const getGlobalCommands = () =>
  fetch(`${discordApiUrl}/applications/${DISCORD_APP_ID}/commands`, fetchOptions).then((res) => res.json());

export type CreateGlobalCommand = Omit<APIApplicationCommand, "id" | "application_id">;
export const createGlobalCommand = (command: CreateGlobalCommand) =>
  fetch(`${discordApiUrl}/applications/${DISCORD_APP_ID}/commands`, {
    ...fetchOptions,
    method: "POST",
    body: JSON.stringify(command),
    headers: { ...fetchOptions.headers, "Content-Type": "application/json" },
  }).then((res) => res.json());