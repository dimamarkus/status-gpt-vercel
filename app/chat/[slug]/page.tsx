import { getStartingChatLog } from "#/app/chat/lib/helpers/chat-helpers";
import { ChatContextProvider } from "#/lib/contexts/ChatContext";
import { fetchBot, getResourceFieldsFromCms } from "#/lib/helpers/request-helpers/makeCmsRequest";
import { getMediaUrl } from "#/lib/helpers/url-helpers";
import { Bot } from "#/lib/types/cms";
import { TabGroup } from "#/ui/examples/tab-group";
import ChatLayout from "#/ui/layouts/ChatLayout/ChatLayout";
import ChatInput from "#/ui/modules/Chat/ChatInput/ChatInput";
import ChatMessages from "#/ui/modules/Chat/ChatMessages/ChatMessages";
import ChatSuggestions from "#/ui/modules/Chat/ChatSuggestions/ChatSuggestions";

type BotPageProps = {
  params: {
    slug: keyof Bot;
  };
};

export const revalidate = 0;

export async function generateMetadata({ params }: { params: BotPageProps["params"] }) {
  const bot = await fetchBot(params.slug);
  const name = bot?.name || "AIdvisor Chat";
  return { title: name + " | Status AIdvisor" };
}

// export async function generateStaticParams() {
//   const response = await getResourceFieldsFromCms<Bot>("bots", ["name", "slug"]);
//   const bots = response.data;
//   return bots.map((bot) => ({
//     slug: bot.attributes.slug,
//   }));
// }

export default async function Page({ params }: BotPageProps) {
  const currentBot = await fetchBot(params.slug);
  const botAvatarUrl = !!currentBot?.avatar?.data
    ? getMediaUrl(currentBot.avatar.data.attributes.url)
    : undefined;

  const startingChatLog = currentBot ? getStartingChatLog(currentBot) : null;
  const sidebar = (
    <>
      {/* {areAssumptionsShown && <ChatAssumptions />} */}
      {/* <ChatSuggestions className="mt-auto max-h-24 overflow-y-auto sm:max-h-fit" /> */}
      <ChatSuggestions />
    </>
  );

  return (
    <ChatContextProvider startingChatLog={startingChatLog}>
      <ChatLayout sidebar={sidebar}>
        <ChatMessages botAvatarUrl={botAvatarUrl} className="h-full" />
        <ChatInput />
      </ChatLayout>
    </ChatContextProvider>
  );
}
