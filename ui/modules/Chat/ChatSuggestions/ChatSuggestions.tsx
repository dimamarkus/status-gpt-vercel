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

type ChatSuggestionsProps = {
  className?: string;
};

export const ChatSuggestions = ({ className }: ChatSuggestionsProps) => {
  const { chatLog, suggestions, getAnswer, suggestionsLoading, loading } = useChatContext();
  const { features } = useFeatureToggleContext();
  const useIsTablet = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(!useIsTablet);

  const displaySuggestions = !!features.debugMode
    ? [...(suggestions || []), ...DEBUG_SUGGESTIONS]
    : suggestions;

  // if (!displaySuggestions || displaySuggestions === null || (chatLog && chatLog.length < 3)) {
  if (!displaySuggestions || displaySuggestions === null || !features.enableSuggestions) {
    return null;
  }

  return (
    <div
      className={clsx(styles.root, "collapse", className)}
      onClick={() => useIsTablet && setIsExpanded(!isExpanded)}
    >
      {loading || suggestionsLoading ? (
        <div className="relative -top-2 ml-2 text-blue-400 md:m-4 md:ml-2">
          <Spinner />
        </div>
      ) : (
        <>
          <input
            type="checkbox"
            name="collapse"
            className="peer min-h-0"
            checked={isExpanded}
            onChange={() => null}
            aria-label="Show/hide chat suggestions"
          />
          <h3>
            Questions You Can Try
            <ChevronRightIcon
              width={20}
              className={clsx(
                "h-5 w-5 text-inherit transition md:hidden",
                isExpanded && "rotate-90",
              )}
            />
          </h3>
          <ul className="collapse-content space-y-2 p-0 peer-checked:text-secondary-content">
            {displaySuggestions !== null &&
              displaySuggestions.map((prompt, index) => (
                <li key={index} className="w-full">
                  <button
                    type="submit"
                    className="text-left text-blue-600"
                    title={"Ask: '" + prompt + "'"}
                    onClick={(e) => getAnswer(prompt)}
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
