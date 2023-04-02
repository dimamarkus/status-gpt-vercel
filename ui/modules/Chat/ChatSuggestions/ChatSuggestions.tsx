"use client";
import { DEBUG_SUGGESTIONS } from "#/app/chat/lib/constants";
import { useChatContext } from "#/lib/contexts/ChatContext";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { useIsMobile } from "#/lib/hooks/useIsMobile";
import Spinner from "#/ui/atoms/svgs/Spinner";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";
import styles from "./ChatSuggestions.module.scss";
import { useConversationsContext } from "#/lib/contexts/ConversationContext";
import { createChatMessage } from "#/app/chat/lib/helpers/chat-helpers";

type ChatSuggestionsProps = {
  className?: string;
};

export const ChatSuggestions = ({ className }: ChatSuggestionsProps) => {
  const {
    appActions: { submitQuery },
    appState: { selectedConversation, loading, suggestions, suggestionsLoading },
  } = useConversationsContext();
  const chatLog = selectedConversation?.messages;
  const { features } = useFeatureToggleContext();

  const displaySuggestions = !!features.debugMode
    ? [...(suggestions || []), ...DEBUG_SUGGESTIONS]
    : suggestions;

  // if (!displaySuggestions || displaySuggestions === null || (chatLog && chatLog.length < 3)) {
  if (!displaySuggestions || displaySuggestions === null || !features.enableSuggestions) {
    return null;
  }

  return (
    <div className={clsx(styles.root, className)}>
      {loading || suggestionsLoading ? (
        <div className="relative -top-2 ml-2 text-blue-400 md:m-4 md:ml-2">
          <Spinner />
        </div>
      ) : (
        <>
          <ul className="space-y-2 p-0 peer-checked:text-secondary-content">
            {displaySuggestions !== null &&
              displaySuggestions.map((prompt, index) => (
                <li key={index} className="w-full">
                  <button
                    type="submit"
                    className="text-left text-blue-600"
                    title={"Ask: '" + prompt + "'"}
                    onClick={(e) => submitQuery(createChatMessage("user", prompt))}
                  >
                    {prompt}
                  </button>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ChatSuggestions;
