import React from "react";
import styles from "./ChatBotMenu.module.scss";
import { getResourceFieldsFromCms } from "#/lib/helpers/request-helpers/makeCmsRequest";
import { Bot } from "#/lib/types/cms";
import { TabGroup } from "#/ui/examples/tab-group";

export const revalidate = 0;

export async function ChatBotMenu() {
  const botMenuResults = await getResourceFieldsFromCms<Bot>("bots", ["name", "slug"]);
  const botNames = botMenuResults.data || [];

  return (
    <TabGroup
      className={styles.ChatBotMenu}
      path="/chat"
      items={[
        ...botNames.map((bot) => ({
          text: `${bot.attributes.name}`,
          slug: bot.attributes.slug,
        })),
      ]}
    />
  );
}

export default ChatBotMenu;
