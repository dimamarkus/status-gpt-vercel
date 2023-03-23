import ChatBotMenu from "#/ui/modules/Chat/ChatBotMenu/ChatBotMenu";
import { getTitlePrefix } from "#/app/layout";
import { ChatContextProvider } from "#/lib/contexts/ChatContext";
import { fetchBot } from "#/lib/helpers/request-helpers/makeCmsRequest";
import { getMediaUrl } from "#/lib/helpers/url-helpers";
import { Bot } from "#/lib/types/cms";
import ChatLayout from "#/ui/atoms/layouts/ChatLayout/ChatLayout";
import ChatInput from "#/ui/modules/Chat/ChatInput/ChatInput";
import ChatMessages from "#/ui/modules/Chat/ChatMessages/ChatMessages";
import ChatSuggestions from "#/ui/modules/Chat/ChatSuggestions/ChatSuggestions";
import ChatSubmissions from "#/ui/modules/Chat/ChatSubmissions/ChatSubmissions";
import ChatStats from "#/ui/modules/Chat/ChatStats/ChatStats";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";

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
  const botAvatarUrl = !!currentBot?.avatar?.data
    ? getMediaUrl(currentBot.avatar.data.attributes.url)
    : undefined;

  const sidebar = (
    <>
      {/* {areAssumptionsShown && <ChatAssumptions />} */}
      <ChatStats />
      <ChatSuggestions className="hidden md:block" />
    </>
  );

  return (
    <ChatContextProvider bot={currentBot}>
      <ChatLayout sidebar={sidebar}>
        <ChatMessages botAvatarUrl={botAvatarUrl} className="h-full" />
        <ChatSuggestions className="lg:hidden" />
        <ChatSubmissions />
        <ChatInput />
      </ChatLayout>
    </ChatContextProvider>
  );
}
