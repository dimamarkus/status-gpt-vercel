import { useState } from "react";
import { GPT3_MODEL, EXAMPLE_PROMPTS } from "#/app/chat/lib/constants";
import { createSuggestionsPrompt } from "#/app/chat/lib/helpers/chat-helpers";
import { OpenAiRequest, OpenAiResponse } from "#/app/chat/lib/types";
import { findArrayInString } from "#/lib/helpers/string-helpers";
import { StatusChatMessage } from "#/app/chat/lib/types";
import { GENERATE_CHAT_ENDPOINT } from "#/pages/api/chat/generate";
import { makeServerPostRequest } from "#/lib/helpers/request-helpers/makeServerRequest";

export const DEFAULT_SUGGESTIONS_RETURN: UseSuggestionsReturn = {
  loading: false,
  suggestions: [],
  showSuggestions: false,
  getSuggestions: async () => {},
  setShowSuggestions: () => {},
};

export type UseSuggestionsReturn = {
  /**
   * This is an array of suggestions that OpenAI will generate based on the last few messages exchanged
   */
  suggestions: string[] | null;
  getSuggestions: (suggestionContext?: StatusChatMessage[]) => Promise<void>;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  loading: boolean;
};

export const useSuggestions = (): UseSuggestionsReturn => {
  const [suggestions, setSuggestions] = useState<string[] | null>(EXAMPLE_PROMPTS);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  /**
   * Pass a chat context (conversation history) for OpenAI to use as a basis for suggestions
   * @param query This is query or message that the user is currently asking
   */
  const getSuggestions = async (suggestionContext?: StatusChatMessage[]) => {
    setLoading(true);
    if (!!suggestionContext) {
      setSuggestions([]);
      const messages = createSuggestionsPrompt(suggestionContext);
      console.log(`I'm asking ${GPT3_MODEL} for suggestions:`, messages);
      const result = await makeServerPostRequest<string, OpenAiRequest>(GENERATE_CHAT_ENDPOINT, {
        model: GPT3_MODEL,
        messages,
      });

      if (result) {
        const suggestionsArray = findArrayInString(result);
        setSuggestions(suggestionsArray || []);
      }
    }
    setLoading(false);
  };

  return {
    showSuggestions,
    setShowSuggestions,
    getSuggestions,
    suggestions,
    loading,
  };
};
