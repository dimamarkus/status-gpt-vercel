import { DEFAULT_CHAT_BOT } from "#/lib/constants/settings";
import { ChatContextProvider } from "#/lib/contexts/ChatContext";
import { ConversationsContextProvider } from "#/lib/contexts/ConversationContext";
import { getCurrentTime } from "#/lib/helpers/datetime-helpers";
import { fetchBot } from "#/lib/helpers/request-helpers/makeCmsRequest";
import ChatLayout from "#/ui/atoms/layouts/ChatLayout/ChatLayout";
import LandingLayout from "#/ui/atoms/layouts/LandingLayout/LandingLayout";
import ChatInput from "#/ui/modules/Chat/ChatInput/ChatInput";
import ChatMessages from "#/ui/modules/Chat/ChatMessages/ChatMessages";
import ChatStats from "#/ui/modules/Chat/ChatStats/ChatStats";
import ChatSubmissions from "#/ui/modules/Chat/ChatSubmissions/ChatSubmissions";
import ChatSuggestions from "#/ui/modules/Chat/ChatSuggestions/ChatSuggestions";

export const revalidate = 0;

async function getData() {
  /**
   * The very first timestamp should come from the server to avoid hydration errors
   * Further timestamps are generated on the client
   */
  return getCurrentTime();
}

export default async function HomePage() {
  const bot = await fetchBot(DEFAULT_CHAT_BOT);
  const startTime = await getData();

  return (
    <LandingLayout>
      <ConversationsContextProvider bot={bot}>
        <ChatContextProvider bot={bot}>
          <ChatLayout>
            <ChatMessages startTime={startTime} className="h-full" />
            <ChatSuggestions className="lg:hidden" />
            <ChatSubmissions />
            <ChatInput />
          </ChatLayout>
        </ChatContextProvider>
      </ConversationsContextProvider>
    </LandingLayout>
  );
}
