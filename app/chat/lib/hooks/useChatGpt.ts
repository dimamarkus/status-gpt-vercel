import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { CHAT_GPT_MODEL } from "#/app/chat/lib/constants";
import { CHAT_GPT_SETTINGS } from "#/lib/constants/settings";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { useGetStream } from "#/lib/hooks/useGetStream";
import { StatusChatMessage } from "#/lib/types";
import { GENERATE_CHAT_ENDPOINT } from "#/pages/api/chat/generate";
import { GENERATE_CHAT_STREAM_ENDPOINT } from "#/pages/api/chat/generate-stream";
import { ChatFormFields } from "#/ui/modules/Chat/ChatInput/ChatInput";
import { createChatSystemMessage } from "#/app/chat/lib/helpers/chat-helpers";

const CHAT_MEMORY = 6;
export const CHATBOX_ID = "chatInput";

export type UseChatGptReturn = {
  /**
   * An array of all the messages that have been sent and received in the chat. Chat log is null
   * if no bot can be found.
   */
  chatLog: StatusChatMessage[] | null;
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
   * This will be set if there is an error with the OpenAI API call
   */
  error: string | null;
  /**
   * The return of useForm hook. Use this to create the user's chat input bot
   */
  inputFormContext: UseFormReturn<ChatFormFields, any> | null;
  /**
   * Triggers a call to the OpenAI API to get an answer which comes back in the form of a 'stream' or 'answer'
   */
  getAnswer: (query?: string, systemMode?: boolean) => Promise<void>;
};

export const useChatGpt = (startingChatLog: StatusChatMessage[] | null): UseChatGptReturn => {
  const [chatLog, setChatLog] = useState(startingChatLog);
  const [answer, setAnswer] = useState<string | undefined>(undefined);
  const { features } = useFeatureToggleContext();
  const trainingMessage = chatLog ? createChatSystemMessage(chatLog[0].content) : null;

  const isChatGpt = features.model === CHAT_GPT_MODEL;
  const endpointUrl = features.useStream ? GENERATE_CHAT_STREAM_ENDPOINT : GENERATE_CHAT_ENDPOINT;
  const { stream, loading, error, getStream } = useGetStream(endpointUrl);

  const formContext = useForm<ChatFormFields>({});
  const { getValues, setValue } = formContext;
  const chatInput = getValues(CHATBOX_ID);
  const clearInput = () => setValue(CHATBOX_ID, "");

  const getAnswer = async (query?: string, systemMode?: boolean) => {
    setAnswer("");
    clearInput();

    const rawContent = query || chatInput;
    const containsPunctuation = !!rawContent && /[.;!?]$/.test(rawContent);
    const content = containsPunctuation ? query : `${query}.`;
    const latestMessage = { role: "user", content, timestamp: Date.now() } as StatusChatMessage;

    const outOfMemory = chatLog && chatLog.length > CHAT_MEMORY;
    const recentMessages = outOfMemory ? chatLog.slice(1).slice(-CHAT_MEMORY) : chatLog;
    const nextChatLog: StatusChatMessage[] = [...(chatLog || []), latestMessage];
    const messagesWithTimestamps: StatusChatMessage[] = [...(recentMessages || []), latestMessage];
    outOfMemory && trainingMessage && messagesWithTimestamps.unshift(trainingMessage);
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
      } as StatusChatMessage;
      setChatLog([...nextChatLog, responseMessage]);
    }
  };

  return {
    getAnswer,
    answer,
    loading,
    error,
    chatLog,
    streamedAnswer: stream,
    inputFormContext: formContext || null,
  };
};
