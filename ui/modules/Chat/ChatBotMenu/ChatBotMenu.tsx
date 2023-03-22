import { getResourceFieldsFromCms } from "#/lib/helpers/request-helpers/makeCmsRequest";
import { Bot } from "#/lib/types/cms";
import { TabGroup } from "#/ui/examples/tab-group";
import { get } from "@vercel/edge-config";

export const revalidate = 0;

type ChatBotMenuProps = {
  path: string;
  featuredOnly?: boolean;
};

export async function ChatBotMenu(props: ChatBotMenuProps) {
  const { path = "/chat", featuredOnly } = props;
  const botMenuResults = await getResourceFieldsFromCms<Bot>("bots", [
    "name",
    "slug",
    "is_featured",
  ]);
  const botMenuItems = botMenuResults.data || [];
  const hiddenBots = (await get("hiddenBots")) as string[];
  const isBotHidden = (slug: string) =>
    hiddenBots && hiddenBots.length > 0 && hiddenBots.includes(slug);

  return (
    <nav className="m-4">
      <TabGroup
        path={path}
        items={[
          ...botMenuItems
            .filter((bot) => !isBotHidden(bot.attributes.slug))
            .filter((bot) => (featuredOnly ? bot.attributes.is_featured : true))
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
