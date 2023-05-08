"use client";
import { useAuthContext } from "#/lib/contexts/AuthContext";
import BaseLink from "#/ui/_base/BaseLink/BaseLink";
import Card from "#/ui/atoms/containers/Card/Card";
import SignUpForm from "#/ui/molecules/forms/SignUpForm/SignUpForm";
import { redirect } from "next/navigation";
import { getGlobalCommands } from "#/lib/services/discord"
import Image from "next/image"
import { APIApplicationCommand, APIApplicationCommandInteraction, APIEmbed, APIInteractionResponse } from "discord-api-types/v10"

async function getData() {
  try {
    const { data } = await getGlobalCommands()
    return data
  } catch (err) {
    console.error(err)
    return null
  }
}

export default async function DiscordPage() {
  const data = await getData()

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>i.e. you could build a dashboard here... we&lsquo;ll just fetch all the slash commands the bot has registered</h2>
      <div>
        <a href="https://discord.gg/NmXuqGgkb3">
          <Image
            alt="Discord invite"
            src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white"
            style={{ borderRadius: "4px", marginRight: "16px" }}
            width="200"
            height="200"
          />
        </a>
        {/* <a href="https://discord.gg/NmXuqGgkb3">Try it out on this Discord server</a> */}
        <p>or</p>
        <a
          style={{ display: "block" }}
          href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_APP_ID}&permissions=2147483648&scope=bot%20applications.commands`}
        >
          Add NextBot to your server!
        </a>
      </div>
      {data && data.length > 0 ? (
        <div>
          <h3>All commands</h3>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>description</th>
                <th>default permission</th>
                <th>options</th>
              </tr>
            </thead>
            <tbody>
              {data.map((command: APIApplicationCommand) => (
                <tr key={command.id}>
                  <td>{command.id} </td>
                  <td>{command.name} </td>
                  <td>{command.description} </td>
                  <td>{String(command.default_permission)}</td>
                  <td>{command.options ? <div>{JSON.stringify(command.options[0])}</div> : "No options"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        "No commands found"
      )}
    </div>
  )
}
