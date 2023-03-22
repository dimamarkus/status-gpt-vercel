import { DEFAULT_CHAT_BOT } from "#/lib/constants/settings";
import { ChatContextProvider } from "#/lib/contexts/ChatContext";
import { getCurrentTime } from "#/lib/helpers/datetime-helpers";
import { fetchBot } from "#/lib/helpers/request-helpers/makeCmsRequest";
import { getMediaUrl } from "#/lib/helpers/url-helpers";
import ChatLayout from "#/ui/atoms/layouts/ChatLayout/ChatLayout";
import LandingLayout from "#/ui/atoms/layouts/LandingLayout/LandingLayout";
import ChatInput from "#/ui/modules/Chat/ChatInput/ChatInput";
import ChatMessages from "#/ui/modules/Chat/ChatMessages/ChatMessages";
import ChatSuggestions from "#/ui/modules/Chat/ChatSuggestions/ChatSuggestions";

export const revalidate = 0;

export async function getData() {
  /**
   * The very first timestamp should come from the server to avoid hydration errors
   * Further timestamps are generated on the client
   */
  return getCurrentTime();
}

export default async function HomePage() {
  const bot = await fetchBot(DEFAULT_CHAT_BOT);
  const startTime = await getData();

  const botAvatarUrl = !!bot?.avatar?.data
    ? getMediaUrl(bot.avatar.data.attributes.url)
    : undefined;

  const sidebar = (
    <>
      {/* {areAssumptionsShown && <ChatAssumptions />} */}
      {/* <ChatSuggestions className="hidden md:block" /> */}
    </>
  );

  return (
    <LandingLayout>
      <ChatContextProvider bot={bot}>
        <ChatLayout sidebar={sidebar}>
          <ChatMessages botAvatarUrl={botAvatarUrl} startTime={startTime} className="h-full" />
          <ChatSuggestions className="lg:hidden" />
          <ChatInput />
        </ChatLayout>
      </ChatContextProvider>
    </LandingLayout>
  );
}
