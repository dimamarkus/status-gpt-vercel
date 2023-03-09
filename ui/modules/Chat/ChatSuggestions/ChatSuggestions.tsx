import { ChevronRightIcon } from "@heroicons/react/20/solid";
import cn from "classnames";
import { useState } from "react";
import styles from "./ChatSuggestions.module.scss";
import { EXAMPLE_PROMPTS } from "#/lib/constants/gpt-prompt";
import { useIsMobile } from "#/lib/hooks/useIsMobile";
import LoadingDots from "#/ui/examples/supabase/LoadingDots";

type ChatSuggestionsProps = {
  query?: string;
  questions?: string[] | null;
  onClick: (question: string) => void;
  className?: string;
  loading?: boolean;
};

const ChatSuggestions = ({
  query,
  questions,
  onClick,
  loading,
  className = "",
}: ChatSuggestionsProps) => {
  // const [ suggestions, loading ] = useSuggestions(query);

  const useIsTablet = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(!useIsTablet);
  const [suggestions, setSuggestions] = useState<string[] | null>(EXAMPLE_PROMPTS);

  if (suggestions === null) {
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
            className="min-h-0 peer"
            checked={isExpanded}
            onChange={() => null}
          />
          <div className="flex justify-between min-h-0 p-0 pt-0 pb-3 mb-1 font-semibold text-blue-900 uppercase collapse-title md:mb-0">
            Questions You Can Try
            <ChevronRightIcon
              className={
                "h-5 w-5 text-inherit transition md:hidden" + " " + (isExpanded && "rotate-90")
              }
            />
          </div>
          <ul className="p-0 space-y-2 collapse-content peer-checked:text-secondary-content">
            {suggestions !== null &&
              suggestions.map((prompt, index) => (
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
