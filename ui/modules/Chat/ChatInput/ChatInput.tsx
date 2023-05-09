"use client";

import { GPT4_MODEL } from "#/app/chat/lib/constants";
import { getBotParam } from "#/app/chat/lib/helpers/bot-helpers";
import { createChatMessage } from "#/app/chat/lib/helpers/chat-helpers";
import { CHAT_BOT_INPUT_MAX_CHARS } from "#/lib/constants/settings";
import { useChatContext } from "#/lib/contexts/ChatContext";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { useSettingsContext } from "#/lib/contexts/SettingsContext";
import { useDebounce } from "#/lib/hooks/useDebounce";
import { useIsMobile } from "#/lib/hooks/useIsMobile";
import useUpdateEffect from "#/lib/hooks/useUpdateEffect";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import ChatRangeInput from "#/ui/atoms/inputs/ChatRangeInput/ChatRangeInput";
import { MicrophoneIcon, StopIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { FC, KeyboardEvent, useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";

export const USER_INPUT_FIELD_ID = "chatInput";

export type ChatFormFields = {
  [USER_INPUT_FIELD_ID]: string;
  max_tokens: number;
};

export type ChatInputProps = {
  query?: string;
};

export const ChatInput: FC<ChatInputProps> = ({ query }) => {
  const { settings } = useSettingsContext();
  const {
    appState,
    appActions,
    dataActions,
    dataState: { bot },
  } = useChatContext();

  const { answerStream, selectedConversation, textareaRef, formContext, loading } = appState;
  const { setCurrentMessage, submitQuery, cancelStream } = appActions;
  const model = selectedConversation?.model || GPT4_MODEL;
  const [content, setContent] = useState<string>();
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const { register, handleSubmit } = formContext;
  const chatInputProps = register(USER_INPUT_FIELD_ID);
  const submitMessage = handleSubmit(() => handleSend());
  const isMobile = useIsMobile();

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      setContent(result);
    },
  });

  useUpdateEffect(() => {
    if (query) {
      console.log("query", query);
      // submitQuery(createChatMessage("user", query));
      // dataActions.addMessage(selectedConversation, createChatMessage("user", query));
      setContent(query);
      handleSend(query);
    }
  }, []);

  useEffect(() => {
    // if (debouncedSearchTerm) {
    //   console.log("debouncedSearchTerm", debouncedSearchTerm);
    //   submitQuery(createChatMessage("user", debouncedSearchTerm));
    //   setContent(debouncedSearchTerm);
    //   handleSend(debouncedSearchTerm);
    // }
    // const fetchData = async () => {
    //   const response = await fetch(`/api/your-api-endpoint?param=${queryParam}`);
    //   const result = await response.json();
    //   setData(result);
    // };
    // fetchData();
  }, []);

  useEffect(() => {
    // Autofocus textarea on render
    if (typeof window === "object") {
      document.getElementById(USER_INPUT_FIELD_ID)?.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const maxLength = model === GPT4_MODEL ? 12000 : 24000;

    if (value.length > maxLength) {
      alert(
        `Message limit is ${maxLength} characters. You have entered ${value.length} characters.`,
      );
      return;
    }

    setContent(value);
    chatInputProps.onChange(e);
  };

  const handleSend = (query?: string) => {
    if (answerStream && loading) {
      return;
    }
    const question = content || query;
    if (!question) {
      alert("Please enter a message");
      return;
    }
    const userMessage = createChatMessage("user", question);
    setCurrentMessage(userMessage);
    submitQuery(userMessage);
    setContent("");

    if (window.innerWidth < 640 && textareaRef && textareaRef.current) {
      textareaRef.current.blur();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isTyping) {
      if (e.key === "Enter" && !e.shiftKey && !isMobile) {
        e.preventDefault();
        handleSend();
      }
    }
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
      textareaRef.current.style.overflow = `${
        textareaRef?.current?.scrollHeight > 400 ? "auto" : "hidden"
      }`;
    }
  }, [content, textareaRef]);

  const rootStyles =
    "absolute bottom-0 left-0 w-full border-transparent bg-gradient-to-b from-transparent via-white to-white pt-6 dark:border-white/20 dark:via-base-200 dark:to-base-300 md:pt-2 md:pb-0 pb-16";

  const wrapperStyles =
    "stretch mx-2 mt-4 flex flex-row gap-3 last:mb-2 md:mx-4 lg:mx-6 md:mt-[52px] md:last:mb-6";

  const fieldsetStyles =
    "relative flex w-full flex-grow flex-col rounded-md border border-black/10 bg-white py-2 shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:border-gray-900/50 dark:bg-[#40414F] dark:text-white dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] md:py-3 md:pl-4";

  const handleReleaseMicrophone = () => {
    stop()
    settings.autoSubmitSpeech && submitMessage();
  }

  const stopButton = (
    <div className="flex absolute bottom-[16px] left-0 right-0 md:top-[13px] w-full">
      <BaseButton
        flavor="icon"
        icon={<StopIcon />}
        onClick={() => appActions.cancelStream(false)}
        text="Stop Generating"
        title="Stop generating a response"
        size="sm"
        className="gap-0 text-xs font-medium text-center mx-auto flex items-center flex-col"
      />
    </div>
  );

  return (
    <form className={rootStyles} onSubmit={submitMessage}>
      <div className={wrapperStyles}>
        { loading ? stopButton : <ChatRangeInput className="absolute bottom-0 left-0 right-0 md:-top-2" /> }
        <fieldset className={fieldsetStyles}>
          <BaseButton
            type={settings.autoSubmitSpeech ? "submit" : "button"}
            flavor="icon"
            icon={<MicrophoneIcon />}
            onMouseDown={listen}
            onMouseUp={handleReleaseMicrophone}
            onMouseOut={handleReleaseMicrophone}
            onTouchStart={listen}
            onTouchEnd={handleReleaseMicrophone}
            size="lg"
            theme={listening ? "primary" : "neutral"}
            className={clsx(
              "z-4 absolute bottom-1 right-1 md:bottom-2 select-none",
              listening ? "animate-pulse opacity-100" : "opacity-50",
            )}
            title="Hold to speak"
          />
          <textarea
            id={USER_INPUT_FIELD_ID}
            aria-label="Enter your message to the bot here"
            maxLength={CHAT_BOT_INPUT_MAX_CHARS}
            {...chatInputProps}
            ref={textareaRef}
            className="m-0 w-full resize-none border-0 bg-transparent p-0 px-3 text-black outline-none focus:ring-0 focus-visible:ring-0 dark:bg-transparent dark:text-white md:pl-0"
            style={{
              resize: "none",
              bottom: `${textareaRef?.current?.scrollHeight}px`,
              maxHeight: "400px",
              overflow: `${
                textareaRef.current && textareaRef.current.scrollHeight > 400 ? "auto" : "hidden"
              }`,
            }}
            placeholder={listening ? "Listening..." : "Type a message..."}
            value={content}
            rows={1}
            onCompositionStart={() => setIsTyping(true)}
            onCompositionEnd={() => setIsTyping(false)}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
          />
        </fieldset>
        {!appState.loading ? (
          <BaseButton
            text="Send"
            title="Send your chat message"
            type="submit"
            size={isMobile ? "sm" : "md"}
            disabled={appState.loading}
            className={clsx(
              "shadow-lg shadow-blue-500/30 transition-all duration-300 ease-in-out dark:shadow-blue-600/30",
              !content || content.length < 55 ? "m-auto" : "mt-auto",
            )}
          />
        ) : (
          <BaseButton
            text="Cancel"
            title="Cancel your message and reset"
            type="reset"
            theme="error"
            size={isMobile ? "sm" : "md"}
            className="mt-auto"
            onClick={() => cancelStream(true)}
          />
        )}
      </div>
    </form>
  );
};

export default ChatInput;
