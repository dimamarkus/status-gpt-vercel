import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { STARTING_CHAT_LOG, TRAINING_MESSAGE } from "#/lib/constants/gpt-prompt";
import { useAssumptionsContext } from "#/lib/contexts/AssumptionsContext";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { useGetStream } from "#/lib/hooks/useGetStream";
import { ChatMessage } from "#/types";
import { ChatFormFields } from "#/ui/modules/Chat/ChatInput/ChatInput";
import { useSuggestions } from "#/lib/hooks/useSuggestions";

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

/**
 * Primary UI component for user interaction
 */
export const useChatGpt = (): UseChatGptReturn => {
  const [chatLog, setChatLog] = useState(STARTING_CHAT_LOG);
  const [answer, setAnswer] = useState<string | undefined>(undefined);
  const { features } = useFeatureToggleContext();

  const isChatGpt = features.model === "chat-gpt";
  const apiEndpoint = "api/" + (isChatGpt ? "generateChat" : "generate");
  const { stream, loading, error, getStream } = useGetStream(apiEndpoint);

  const formContext = useForm<ChatFormFields>({});
  const { getValues, setValue } = formContext;
  const chatInput = getValues(CHATBOX_ID);
  const clearInput = () => setValue(CHATBOX_ID, "");

  const { suggestions, loading: suggestionsLoading, getSuggestions } = useSuggestions();
  // const { assumptions, areAssumptionsShown, setShowAssumptions } = useAssumptionsContext();
  // const assumptionsJson = JSON.stringify(assumptions);
  // const assumptionsDeclaration = `Consider everything going forward assuming the following things about me: ${assumptionsJson}`;

  /**
   * This function makes the call to the OpenAI API and updates the stream state in real time
   * At the end of the stream, the answer is compiled and set to the answer state
   * @param query This is query or message that the user is currently asking
   * @param systemMode Sends a message that will be logged in the chat log but not visible to the user
   */
  const getAnswer = async (query?: string, systemMode?: boolean) => {
    setAnswer("");
    clearInput();

    const containsPunctuation = !!query && /[.;!?]$/.test(query);
    const punctuatedQuery = containsPunctuation ? query : `${query}.`;

    const latestMessage = {
      role: "user",
      content: `${punctuatedQuery || chatInput}`,
      timestamp: Date.now(),
    } as ChatMessage;

    // const assumptionsMessage = {
    //   role: "system",
    //   content: assumptionsDeclaration,
    //   timestamp: Date.now(),
    // } as ChatMessage;

    const outOfMemory = chatLog.length > CHAT_MEMORY;
    const recentMessages = outOfMemory ? chatLog.slice(1).slice(-CHAT_MEMORY) : chatLog;
    const nextChatLog: ChatMessage[] = [...chatLog, latestMessage];
    const messagesWithTimestamps: ChatMessage[] = [...recentMessages, latestMessage];
    outOfMemory && messagesWithTimestamps.unshift(TRAINING_MESSAGE);
    const messages = messagesWithTimestamps.map(({ role, content }) => ({ role, content }));
    const prompt = messages.map(({ content }) => content).join("\n");
    const requestBody = isChatGpt ? { messages } : { prompt };
    setChatLog(nextChatLog);

    console.log("--------------------------------------------------------");
    console.log(`I'm asking ${features.model} a question:`, requestBody);
    const answer = await getStream(requestBody);
    setAnswer(answer);

    if (answer) {
      const finalChatLog = [
        ...nextChatLog,
        { role: "assistant", content: answer, timestamp: Date.now() } as ChatMessage,
      ];
      const lastFewMessages = finalChatLog.slice(1).slice(-5);
      getSuggestions(lastFewMessages);
      setChatLog(finalChatLog);
      setAnswer("");
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
