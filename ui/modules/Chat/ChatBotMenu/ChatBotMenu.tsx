import { get } from "@vercel/edge-config";
import cn from "classnames";
import React from "react";
import styles from "./ChatBotMenu.module.scss";
import { getResourceFieldsFromCms } from "#/lib/helpers/request-helpers/makeCmsRequest";
import { Bot } from "#/lib/types/cms";
import { TabGroup } from "#/ui/examples/tab-group";

export const revalidate = 0;

export async function ChatBotMenu({ path = "/chat" }: { path: string }) {
  const botMenuResults = await getResourceFieldsFromCms<Bot>("bots", ["name", "slug"]);
  const botNames = botMenuResults.data || [];
  const hiddenBots = (await get("hiddenBots")) as string[];
  const isBotHidden = (slug: string) =>
    hiddenBots && hiddenBots.length > 0 && hiddenBots.includes(slug);

  return (
    <nav className={cn(styles.root, "root m-4")}>
      <TabGroup
        path={path}
        items={[
          ...botNames
            .filter((bot) => !isBotHidden(bot.attributes.slug))
            .map((bot) => ({
              text: `${bot.attributes.name}`,
              slug: bot.attributes.slug,
            })),
        ]}
      />
    </nav>
  );
}

export default ChatBotMenu;
