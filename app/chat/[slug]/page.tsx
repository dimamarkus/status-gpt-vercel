import { getTitlePrefix } from "#/app/metadata";
import { ConversationsContextProvider } from "#/lib/contexts/ConversationContext";
import { fetchBot } from "#/lib/helpers/request-helpers/makeCmsRequest";
import { Bot } from "#/lib/types/cms";
import ChatLayout from "#/ui/atoms/layouts/ChatLayout/ChatLayout";
import ChatInputAlt from "#/ui/modules/Chat/ChatInput/ChatInput";
import ChatMessages from "#/ui/modules/Chat/ChatMessages/ChatMessages";
import ChatSubmissions from "#/ui/modules/Chat/ChatSubmissions/ChatSubmissions";
import ChatSidebar from "#/ui/modules/ChatSidebar/ChatSidebar";

type BotPageProps = {
  params: {
    slug: keyof Bot;
  };
};

export const revalidate = 0;

export async function generateMetadata({ params }: BotPageProps) {
  const bot = await fetchBot(params.slug);
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

export default async function BotPage({ params }: BotPageProps) {
  const currentBot = await fetchBot(params.slug);

  return (
    <ConversationsContextProvider bot={currentBot}>
      <ChatLayout>
        <ChatMessages />
        <ChatSubmissions />
      </ChatLayout>
    </ConversationsContextProvider>
  );
}
