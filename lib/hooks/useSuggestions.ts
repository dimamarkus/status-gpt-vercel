import { useEffect, useState } from "react";
import { BACKEND_SUMMARY, EXAMPLE_PROMPTS, SUGGESTIONS_REQUEST } from "#/lib/constants/gpt-prompt";
import { useAssumptionsContext } from "#/lib/contexts/AssumptionsContext";
import { useGetStream } from "#/lib/hooks/useGetStream";
import { findArrayInString } from "#/lib/helpers/string-helpers";
import { DAVINCI_URL } from "#/lib/fetchers/fetchOpenAiStream";
import { ChatMessage } from "#/types";

type UseSuggestionsReturn = {
  loading: boolean;
  suggestions: string[] | null;
  getSuggestions: (suggestionContext?: ChatMessage[]) => Promise<void>;
};

export const useSuggestions = (): UseSuggestionsReturn => {
  const [suggestions, setSuggestions] = useState<string[] | null>(EXAMPLE_PROMPTS);
  const { loading, getStream } = useGetStream("api/generateChat");

  const createSuggestionsPrompt = (context: ChatMessage[]) => {
    const messages = context.map(({ role, content }) => ({ role, content }));
    const messageQuery = [
      ...messages,
      {
        role: "user",
        content: SUGGESTIONS_REQUEST,
      },
    ];

    return messageQuery;
  };

  /**
   * Pass a chat context (conversation history) for OpenAI to use as a basis for suggestions
   * @param query This is query or message that the user is currently asking
   */
  const getSuggestions = async (suggestionContext?: ChatMessage[]) => {
    if (!suggestionContext) return;
    setSuggestions([]);
    const messages = createSuggestionsPrompt(suggestionContext);
    console.log("I'm asking chat-gpt for suggestions:", messages);
    const response = await getStream({ messages });

    if (response) {
      const suggestionsArray = findArrayInString(response);
      setSuggestions(suggestionsArray || []);
    }
  };

  return {
    getSuggestions,
    suggestions,
    loading,
  };
};
