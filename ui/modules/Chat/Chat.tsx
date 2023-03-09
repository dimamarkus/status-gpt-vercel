import cn from "classnames";
import React, { useState } from "react";
import styles from "./Chat.module.scss";
import { useAssumptionsContext } from "#/lib/contexts/AssumptionsContext";
import { useFullScreenContext } from "#/lib/contexts/FullScreenContext";
import { useChatGpt } from "#/lib/hooks/useChatGpt";
import { useIsMobile, useIsTablet } from "#/lib/hooks/useIsMobile";
import ChatInput from "#/ui/modules/Chat/ChatInput/ChatInput";
import ChatSuggestions from "#/ui/modules/Chat/ChatSuggestions/ChatSuggestions";
import ChatWindow from "#/ui/modules/Chat/ChatWindow/ChatWindow";

export type OpenAIModel = "text-davinci-003" | "chatgpt-turbo-001";
const DEFAULT_AI_MODEL = "text-davinci-003";

type ChatProps = {
  children?: React.ReactNode;
};

export const Chat = (props: ChatProps) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { isFullScreen } = useFullScreenContext();
  const { chatLog, streamedAnswer, loading, error, getAnswer, inputFormContext } = useChatGpt();
  const [showSuggestions, setShowSuggestions] = useState(true);
  // const { suggestions, loading } = useSuggestions();

  const { assumptions, areAssumptionsShown, setShowAssumptions } = useAssumptionsContext();
  const toggleAssumptions = () => setShowAssumptions(!areAssumptionsShown);

  const suggestionsChild = (
    <ChatSuggestions
      // questions={suggestions}
      // loading={loading}
      onClick={getAnswer}
      className={
        "mt-auto max-h-24 overflow-y-auto sm:max-h-fit" + " " + (!showSuggestions && "hidden")
      }
    />
  );

  const desktopSidebar = !isTablet && (
    <aside className="flex flex-col justify-start p-2 pr-1 md:justify-end lg:w-3/12 lg:p-0 lg:pl-1 lg:pr-5 lg:pt-2">
      {/* {hamburgerChild} */}
      {/* {areAssumptionsShown && <ChatAssumptions />} */}
      {suggestionsChild}
    </aside>
  );

  return (
    <section
      className={cn(
        styles.Chat,
        "flex h-full max-h-full flex-col overflow-hidden rounded border-2 border-blue-100 bg-blue-100 drop-shadow-lg lg:mb-16 lg:flex-row",
        isFullScreen ? "absolute left-0 top-0 h-full w-full" : "",
      )}
    >
      <div className="relative flex flex-col order-last h-full p-1 bg-blue-100 md:order-first md:p-4 lg:w-9/12">
        <ChatWindow
          className="h-full"
          chatHistory={chatLog}
          currentResponse={streamedAnswer || error}
        />
        {/* {/* {isTablet && areAssumptionsShown && <ChatAssumptions />} */}
        {isTablet && !areAssumptionsShown && suggestionsChild}
        <ChatInput
          inputFormContext={inputFormContext}
          onBlur={() => setShowSuggestions(true)}
          onFocus={() => isMobile && setShowSuggestions(false)}
          onSubmit={({ chatInput }) => getAnswer(chatInput)}
          onHamburgerClick={isTablet ? toggleAssumptions : undefined}
        />
      </div>
      {desktopSidebar}
    </section>
  );
};
export default Chat;
