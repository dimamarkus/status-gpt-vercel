import { useEffect, useState } from "react";
import { BACKEND_SUMMARY, EXAMPLE_PROMPTS } from "#/lib/constants/gpt-prompt";
import { useAssumptionsContext } from "#/lib/contexts/AssumptionsContext";
import { getStream } from "#/lib/functions/getStream";
import { findArrayInString } from "#/lib/helpers/helpers";

export const useSuggestions = async (suggestionContext?: string) => {
  const { assumptions } = useAssumptionsContext();
  const assumptionsJson = JSON.stringify(assumptions);
  const [suggestions, setSuggestions] = useState<string[] | null>(EXAMPLE_PROMPTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const createSuggestionsPrompt = (context?: string) => {
      let promptArray = [
        `My current financial situation is ${assumptionsJson} \n`,
        `given my siutation, give me a JS string array (with no variable) of 3 questions you think I should ask you (Stat) as follow up \n`,
      ];
      context && promptArray.unshift(context);
      promptArray.unshift(BACKEND_SUMMARY);

      return JSON.stringify(promptArray);
    };

    async function getSuggestions() {
      setLoading(true);
      setSuggestions([]);
      const promptJson = createSuggestionsPrompt(suggestionContext);
      const response = await getStream(promptJson);

      if (response) {
        const suggestionsArray = findArrayInString(response);
        setSuggestions(suggestionsArray);
      }

      setLoading(false);
    }

    getSuggestions();
  }, [assumptionsJson, suggestionContext]);

  return await {
    suggestions,
    loading,
  };
};
