import { useState } from "react";
import { GPT3_MODEL, DEFAULT_SUBMISSIONS, EXAMPLE_PROMPTS } from "#/app/chat/lib/constants";
import { createSubmissionsPrompt } from "#/app/chat/lib/helpers/chat-helpers";
import { OpenAiRequest, OpenAiResponse } from "#/app/chat/lib/types";
import { findArrayInString, findJsonInString } from "#/lib/helpers/string-helpers";
import { StatusChatMessage } from "#/app/chat/lib/types";
import { GENERATE_CHAT_ENDPOINT } from "#/pages/api/chat/generate";
import { makeServerPostRequest } from "#/lib/helpers/requests/makeServerRequest";

export const DEFAULT_SUBMISSIONS_RETURN: UseSubmissionsReturn = {
  loading: false,
  submissions: {},
  showSubmissions: false,
  getSubmissions: async () => {},
  setShowSubmissions: () => {},
};

export type UseSubmissionsReturn = {
  /**
   * This is an array of submissions that OpenAI will generate based on the last few messages exchanged
   */
  submissions: Record<string, unknown>;
  getSubmissions: (submissionContext?: StatusChatMessage[]) => Promise<void>;
  showSubmissions: boolean;
  setShowSubmissions: (show: boolean) => void;
  loading: boolean;
};

export const useSubmissions = (): UseSubmissionsReturn => {
  const [submissions, setSubmissions] = useState<Record<string, unknown>>(DEFAULT_SUBMISSIONS);
  const [loading, setLoading] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);

  /**
   * Pass a chat context (conversation history) for OpenAI to use as a basis for submissions
   * @param query This is query or message that the user is currently asking
   */
  const getSubmissions = async (submissionContext?: StatusChatMessage[]) => {
    setLoading(true);
    if (!!submissionContext) {
      setSubmissions({});
      const messages = createSubmissionsPrompt(submissionContext);
      console.log(`I'm asking ${GPT3_MODEL} for submissions:`, messages);
      const result = await makeServerPostRequest<string, OpenAiRequest>(GENERATE_CHAT_ENDPOINT, {
        model: GPT3_MODEL,
        messages,
      });

      if (result) {
        const submissionsJson = findJsonInString(result);
        setSubmissions(submissionsJson || {});
      }
    }
    setLoading(false);
  };

  return {
    showSubmissions,
    setShowSubmissions,
    getSubmissions,
    submissions,
    loading,
  };
};
