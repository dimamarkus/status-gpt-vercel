import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  CHAT_GPT_MODEL,
  STARTING_CHAT_LOG,
  TRAINING_MESSAGE,
} from "#/features/chat/constants/gpt-prompt";
import { useSuggestions } from "#/features/chat/hooks/useSuggestions";
import { CHAT_GPT_SETTINGS } from "#/lib/constants/settings";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { useGetStream } from "#/lib/hooks/useGetStream";
import { GENERATE_CHAT_ENDPOINT } from "#/pages/api/chat/generate";
import { GENERATE_CHAT_STREAM_ENDPOINT } from "#/pages/api/chat/generate-stream";
import { ChatMessage } from "#/types";
import { ChatFormFields } from "#/ui/modules/Chat/ChatInput/ChatInput";

const CHAT_MEMORY = 6;
export const CHATBOX_ID = "chatInput";

type UseChatGptReturn = {
  /**
   * An array of all the messages that have been sent and received in the chat
   */
  chatLog: ChatMessage[];
  /**
   * This is the answer streamed in real time.
   */
  streamedAnswer?: string;
  /**
   * This is the complete answer compiled from a finished stream.
   */
  answer?: string;
  /**
   * This will be true while waiting for the answer to come back from the OpenAI API
   */
  loading: boolean;
  /**
   * This is an array of suggestions that OpenAI will generate based on the last few messages exchanged
   */
  suggestions: string[] | null;
  /**
   * This will be true while waiting for the suggestions to come back from the OpenAI API
   */
  suggestionsLoading: boolean;
  /**
   * This will be set if there is an error with the OpenAI API call
   */
  error: string;
  /**
   * The return of useForm hook. Use this to create the user's chat input bot
   */
  inputFormContext: UseFormReturn<ChatFormFields, any>;
  /**
   * Triggers a call to the OpenAI API to get an answer which comes back in the form of a 'stream' or 'answer'
   */
  getAnswer: (query?: string, systemMode?: boolean) => Promise<void>;
};

export const useChatGpt = (): UseChatGptReturn => {
  const [chatLog, setChatLog] = useState(STARTING_CHAT_LOG);
  const [answer, setAnswer] = useState<string | undefined>(undefined);
  const { features } = useFeatureToggleContext();

  const isChatGpt = features.model === CHAT_GPT_MODEL;
  const endpointUrl = features.useStream ? GENERATE_CHAT_STREAM_ENDPOINT : GENERATE_CHAT_ENDPOINT;
  const { stream, loading, error, getStream } = useGetStream(endpointUrl);

  const formContext = useForm<ChatFormFields>({});
  const { getValues, setValue } = formContext;
  const chatInput = getValues(CHATBOX_ID);
  const clearInput = () => setValue(CHATBOX_ID, "");

  const { suggestions, loading: suggestionsLoading } = useSuggestions();
  // const { assumptions, areAssumptionsShown, setShowAssumptions } = useAssumptionsContext();
  // const assumptionsJson = JSON.stringify(assumptions);
  // const assumptionsDeclaration = `Consider everything going forward assuming the following things about me: ${assumptionsJson}`;
  // const assumptionsMessage = { role: "system", content: assumptionsDeclaration, timestamp: Date.now() } as ChatMessage;

  const getAnswer = async (query?: string, systemMode?: boolean) => {
    setAnswer("");
    clearInput();

    const rawContent = query || chatInput;
    const containsPunctuation = !!rawContent && /[.;!?]$/.test(rawContent);
    const content = containsPunctuation ? query : `${query}.`;
    const latestMessage = { role: "user", content, timestamp: Date.now() } as ChatMessage;

    const outOfMemory = chatLog.length > CHAT_MEMORY;
    const recentMessages = outOfMemory ? chatLog.slice(1).slice(-CHAT_MEMORY) : chatLog;
    const nextChatLog: ChatMessage[] = [...chatLog, latestMessage];
    const messagesWithTimestamps: ChatMessage[] = [...recentMessages, latestMessage];
    outOfMemory && messagesWithTimestamps.unshift(TRAINING_MESSAGE);
    const messages = messagesWithTimestamps.map(({ role, content }) => ({ role, content }));
    const prompt = messages.map(({ content }) => content).join("\n");
    const requestBody = isChatGpt ? { messages } : { prompt };

    setChatLog(nextChatLog);

    console.log("============================================================");
    console.log(`I'm asking ${features.model} a question:`, requestBody);

    const response = await getStream({
      model: features.model,
      ...requestBody,
      ...CHAT_GPT_SETTINGS,
    });

    setAnswer(response);

    if (response) {
      const responseMessage = {
        role: "assistant",
        content: response,
        timestamp: Date.now(),
      } as ChatMessage;
      setChatLog([...nextChatLog, responseMessage]);
    }
  };

  return {
    getAnswer,
    answer,
    loading,
    suggestions,
    suggestionsLoading,
    error,
    chatLog,
    streamedAnswer: stream,
    inputFormContext: formContext,
  };
};
