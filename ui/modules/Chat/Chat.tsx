import { Bot } from "#/lib/types/cms";
import ChatHeader from "#/ui/modules/Chat/ChatHeader/ChatHeader";
import ChatInput from "#/ui/modules/Chat/ChatInput/ChatInput";
import ChatLayout from "#/ui/modules/Chat/ChatLayout/ChatLayout";
import ChatMessages from "#/ui/modules/Chat/ChatMessages/ChatMessages";
import ChatSidebar from "#/ui/modules/Chat/ChatSidebar/ChatSidebar";
import ChatSubmissions from "#/ui/modules/Chat/ChatSubmissions/ChatSubmissions";

type ChatSidebarProps = {
  startTime: string;
  bots: Bot[];
  selectedBot: Bot;
  // If a query string is passed, it is auto-submitted as a question.
  query?: string;
};

export const Chat = (props: ChatSidebarProps) => {
  const { bots, selectedBot, query, startTime } = props;
  return (
    <ChatLayout sidebar={<ChatSidebar bots={bots} selectedBot={selectedBot} />}>
      <ChatHeader />
      <ChatMessages startTime={startTime} />
      <ChatSubmissions />
      <ChatInput query={query} />
    </ChatLayout>
  );
};

export default Chat;
