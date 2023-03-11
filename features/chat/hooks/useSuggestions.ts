import { useState } from "react";
import {
  CHAT_GPT_MODEL,
  EXAMPLE_PROMPTS,
  SUGGESTIONS_REQUEST,
} from "#/features/chat/constants/gpt-prompt";
import { OpenAiCompletionResponse } from "#/features/chat/openai";
import { post } from "#/lib/helpers/request-helpers/makeRequest";
import { findArrayInString } from "#/lib/helpers/string-helpers";
import { GENERATE_CHAT_ENDPOINT } from "#/pages/api/chat/generate";
import { ChatMessage } from "#/types";

type UseSuggestionsReturn = {
  loading: boolean;
  suggestions: string[] | null;
  getSuggestions: (suggestionContext?: ChatMessage[]) => Promise<void>;
};

export const useSuggestions = (): UseSuggestionsReturn => {
  const [suggestions, setSuggestions] = useState<string[] | null>(EXAMPLE_PROMPTS);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    if (suggestionContext) {
      setSuggestions([]);
      const messages = createSuggestionsPrompt(suggestionContext);
      console.log(`I'm asking ${CHAT_GPT_MODEL} for suggestions:`, messages);
      const result = await post<string>(GENERATE_CHAT_ENDPOINT, {
        model: CHAT_GPT_MODEL,
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
    getSuggestions,
    suggestions,
    loading,
  };
};
