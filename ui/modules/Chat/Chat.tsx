import cn from "classnames";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.scss";
import { useAssumptionsContext } from "#/lib/contexts/AssumptionsContext";
import { useFullScreenContext } from "#/lib/contexts/FullScreenContext";
import { useChatGpt } from "#/features/chat/hooks/useChatGpt";
import { useIsMobile, useIsTablet } from "#/lib/hooks/useIsMobile";
import ChatInput from "#/ui/modules/Chat/ChatInput/ChatInput";
import ChatMessages from "#/ui/modules/Chat/ChatMessages/ChatMessages";
import ChatSuggestions from "#/ui/modules/Chat/ChatSuggestions/ChatSuggestions";
import { useSuggestions } from "#/features/chat/hooks/useSuggestions";

type ChatProps = {
  children?: React.ReactNode;
};

export const Chat = (props: ChatProps) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { isFullScreen } = useFullScreenContext();
  const [showSuggestions, setShowSuggestions] = useState(true);
  const { areAssumptionsShown, setShowAssumptions } = useAssumptionsContext();
  const { suggestions, loading: suggestionsLoading, getSuggestions } = useSuggestions();
  const { chatLog, streamedAnswer, loading, error, answer, getAnswer, inputFormContext } =
    useChatGpt();

  const prevProp = useRef<string>();
  useEffect(() => {
    prevProp.current = answer;
  });
  const answerChanged = prevProp.current !== answer;

  useEffect(() => {
    if (answerChanged && !loading) {
      getSuggestions(chatLog);
    }
  }, [answer, answerChanged, chatLog, getSuggestions, loading, streamedAnswer]);

  const suggestionsChild = (
    <ChatSuggestions
      suggestions={suggestions}
      loading={suggestionsLoading}
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
        "flex h-full max-h-full flex-col overflow-hidden rounded border-2 border-blue-100 bg-blue-100 drop-shadow-lg dark:bg-blue-900 lg:mb-16 lg:flex-row",
        isFullScreen ? "absolute left-0 top-0 h-full w-full" : "",
      )}
    >
      <div className="relative order-last flex h-full flex-col p-1 md:order-first md:p-4 lg:w-9/12">
        <ChatMessages
          className="h-full"
          messages={chatLog}
          currentResponse={streamedAnswer || error}
          responseLoading={loading}
        />
        {/* {/* {isTablet && areAssumptionsShown && <ChatAssumptions />} */}
        {isTablet && !areAssumptionsShown && suggestionsChild}
        <ChatInput
          inputFormContext={inputFormContext}
          onBlur={() => setShowSuggestions(true)}
          onFocus={() => isMobile && setShowSuggestions(false)}
          onSubmit={({ chatInput }) => getAnswer(chatInput)}
          onHamburgerClick={isTablet ? () => setShowAssumptions(!areAssumptionsShown) : undefined}
        />
      </div>
      {desktopSidebar}
    </section>
  );
};
export default Chat;
