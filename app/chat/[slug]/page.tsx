import { sortBots } from "#/app/chat/lib/helpers/bot-helpers";
import { getTitlePrefix } from "#/app/metadata";
import { getCurrentTime } from "#/lib/helpers/datetime-helpers";
import { fetchBot, fetchBots } from "#/lib/databases/cms";
import { Bot } from "#/lib/types/cms";
import CircleAnimation from "#/ui/atoms/svgs/CircleAnimation";
import Chat from "#/ui/modules/Chat/Chat";

export type BotPageProps = {
  params: {
    slug: keyof Bot;
  };
  searchParams: {
    query: string;
  };
};

export const revalidate = 0;
export const runtime = "edge";

export async function generateMetadata({ params }: BotPageProps) {
  const bots = await fetchBots();
  const bot = bots.find((bot) => bot.slug === params.slug);
  const name = bot?.name || "AIdvisor Chat";
  return { title: getTitlePrefix() + name + " | Status AIdvisor" };
}

// export async function generateStaticParams() {
//   const response = await getResourceFieldsFromCms<Bot>("bots", ["name", "slug"]);
//   const bots = response.data;
//   return bots.map((bot) => ({
//     slug: bot.attributes.slug,
//   }));
// }

async function getData() {
  /**
   * The very first timestamp should come from the server to avoid hydration errors
   * Further timestamps are generated on the client
   */
  const startTime = getCurrentTime();
  const bots = await fetchBots();
  return { startTime, bots };
}

export default async function BotPage({ params, searchParams }: BotPageProps) {
  const { startTime, bots } = await getData();
  const selectedBot = bots.find((bot) => bot.slug === params.slug) || bots[0];
  const query = searchParams.query;

  return (
    <>
      {selectedBot.slug === "roger" && (
        <CircleAnimation className="fixed left-0 top-0 z-0 hidden h-[100vh] w-[100vw] md:block" />
      )}
      <Chat bots={sortBots(bots)} selectedBot={selectedBot} query={query} startTime={startTime} />
    </>
  );
}
