import { BotPageProps } from "#/app/chat/[slug]/page";
import { sortBots } from "#/app/chat/lib/helpers/bot-helpers";
import { DEFAULT_CHAT_BOT } from "#/lib/constants/settings";
import { getCurrentTime } from "#/lib/helpers/datetime-helpers";
import { fetchBots } from "#/lib/databases/cms";
import LandingLayout from "#/ui/atoms/layouts/LandingLayout/LandingLayout";
import Chat from "#/ui/modules/Chat/Chat";

export const revalidate = 0;
export const runtime = "edge";

async function getData() {
  /**
   * The very first timestamp should come from the server to avoid hydration errors
   * Further timestamps are generated on the client
   */
  return getCurrentTime();
}

export default async function HomePage({ searchParams }: BotPageProps) {
  const query = searchParams.query;
  const startTime = await getData();
  const bots = await fetchBots();
  const selectedBot = bots.find((bot) => bot.slug === DEFAULT_CHAT_BOT) || bots[0];

  return (
    <LandingLayout>
      <Chat bots={sortBots(bots)} selectedBot={selectedBot} startTime={startTime} query={query} />
    </LandingLayout>
  );
}
