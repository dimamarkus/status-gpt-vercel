import { ChevronRightIcon } from "@heroicons/react/20/solid";
import cn from "classnames";
import { useEffect, useState } from "react";
import styles from "./ChatSuggestions.module.scss";
import { useIsMobile } from "#/lib/hooks/useIsMobile";
import LoadingDots from "#/ui/examples/supabase/LoadingDots";
import { useSuggestions } from "#/lib/hooks/useSuggestions";
import { PERMANENT_SUGGESTIONS } from "#/lib/constants/gpt-prompt";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";

type ChatSuggestionsProps = {
  suggestions: string[] | null;
  className?: string;
  loading?: boolean;
  onClick: (question: string) => void;
};

export const ChatSuggestions = (props: ChatSuggestionsProps) => {
  const { suggestions, onClick, loading, className = "" } = props;
  const useIsTablet = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(!useIsTablet);
  const {
    features: { debugMode },
  } = useFeatureToggleContext();

  const displaySuggestions = !!debugMode
    ? [...(suggestions || []), ...PERMANENT_SUGGESTIONS]
    : suggestions;

  if (displaySuggestions === null) {
    return null;
  }

  return (
    <div
      className={cn(
        styles.ChatSuggestions,
        "max-h-48 flex-shrink-0 border-neutral-200 bg-blue-50 p-4 pb-0 text-sm md:shadow-none lg:bg-inherit lg:p-0",
        className,
      )}
    >
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="collapse" onClick={() => useIsTablet && setIsExpanded(!isExpanded)}>
          <input
            type="checkbox"
            name="collapse"
            className="peer min-h-0"
            checked={isExpanded}
            onChange={() => null}
          />
          <div className="collapse-title mb-1 flex min-h-0 justify-between p-0 pt-0 pb-3 font-semibold uppercase text-blue-900 md:mb-0">
            Questions You Can Try
            <ChevronRightIcon
              className={
                "h-5 w-5 text-inherit transition md:hidden" + " " + (isExpanded && "rotate-90")
              }
            />
          </div>
          <ul className="collapse-content space-y-2 p-0 peer-checked:text-secondary-content">
            {displaySuggestions !== null &&
              displaySuggestions.map((prompt, index) => (
                <li key={index} className="w-full">
                  <button
                    type="submit"
                    className="text-left text-blue-500"
                    title={"Ask: '" + prompt + "'"}
                    onClick={(e) => onClick(prompt)}
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
