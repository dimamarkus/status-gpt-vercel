"use client";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import styles from "./ChatSuggestions.module.scss";
import { PERMANENT_SUGGESTIONS } from "#/app/chat/lib/constants";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { useIsMobile } from "#/lib/hooks/useIsMobile";
import LoadingDots from "#/ui/examples/supabase/LoadingDots";
import { useChatContext } from "#/lib/contexts/ChatContext";
import Spinner from "#/ui/atoms/icons/Spinner";

type ChatSuggestionsProps = {
  className?: string;
};

export const ChatSuggestions = ({ className }: ChatSuggestionsProps) => {
  const { chatLog, suggestions, answer, getAnswer, getSuggestions, suggestionsLoading, loading } =
    useChatContext();
  const useIsTablet = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(!useIsTablet);
  const {
    features: { debugMode },
  } = useFeatureToggleContext();

  const displaySuggestions = !!debugMode
    ? [...(suggestions || []), ...PERMANENT_SUGGESTIONS]
    : suggestions;

  const prevProp = useRef<string>();
  useEffect(() => {
    prevProp.current = answer;
  });
  const answerChanged = prevProp.current !== answer;

  useEffect(() => {
    if (answerChanged && !loading && chatLog) {
      getSuggestions(chatLog);
    }
  }, [answerChanged, chatLog, getSuggestions, loading]);

  if (!displaySuggestions || displaySuggestions === null) {
    return null;
  }
  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;
  return (
    <div className={cn(styles.root, className)}>
      {loading || suggestionsLoading ? (
        <div className="m-4 mb-8 ml-0 text-blue-400">
          <Spinner />
        </div>
      ) : (
        <div className="collapse" onClick={() => useIsTablet && setIsExpanded(!isExpanded)}>
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
              className={cn("h-5 w-5 text-inherit transition md:hidden", isExpanded && "rotate-90")}
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
        </div>
      )}
    </div>
  );
};

export default ChatSuggestions;
