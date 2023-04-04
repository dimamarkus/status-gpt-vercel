"use client";

import { GPT4_MODEL } from "#/app/chat/lib/constants";
import { getBotParam } from "#/app/chat/lib/helpers/bot-helpers";
import { createChatMessage } from "#/app/chat/lib/helpers/chat-helpers";
import { USER_INPUT_FIELD_ID } from "#/app/chat/lib/hooks/useChatGpt";
import { useConversationsContext } from "#/lib/contexts/ConversationContext";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { useIsMobile } from "#/lib/hooks/useIsMobile";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import ChatRangeInput from "#/ui/atoms/inputs/ChatRangeInput/ChatRangeInput";
import { MicrophoneIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { FC, KeyboardEvent, useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";

export type ChatFormFields = {
  [USER_INPUT_FIELD_ID]: string;
  max_tokens: number;
};

export const ChatInput: FC = () => {
  const { features } = useFeatureToggleContext();
  const {
    appState,
    appActions,
    dataState: { bot },
  } = useConversationsContext();
  const { answerStream, selectedConversation, textareaRef, formContext } = appState;
  const { setCurrentMessage, submitQuery, cancelStream } = appActions;
  const model = selectedConversation?.model || GPT4_MODEL;
  const [content, setContent] = useState<string>();
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const maxTokens = getBotParam(bot, "max_tokens") as number;
  const { register, handleSubmit, watch } = formContext;
  const chatInputProps = register(USER_INPUT_FIELD_ID);
  const submitMessage = handleSubmit(() => handleSend());
  const isMobile = useIsMobile();

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      setContent(result);
    },
  });

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

  const handleSend = () => {
    if (answerStream) {
      return;
    }

    if (!content) {
      alert("Please enter a message");
      return;
    }
    const userMessage = createChatMessage("user", content);
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

  const wrapperStyles =
    "absolute bottom-0 left-0 w-full border-transparent bg-gradient-to-b from-transparent via-white to-white pt-6 dark:border-white/20 dark:via-[#343541] dark:to-[#343541] md:pt-2";

  const rootStyles =
    "stretch  mx-2 mt-4 flex flex-row gap-3 last:mb-2 md:mx-4 md:mt-[52px] md:last:mb-6 lg:mx-auto lg:max-w-3xl";

  const microphoneButton = (
    <BaseButton
      type={features.autoSubmitSpeech ? "submit" : "button"}
      flavor="icon"
      icon={<MicrophoneIcon />}
      onMouseDown={listen}
      onMouseUp={stop}
      onMouseOut={stop}
      size="lg"
      theme={listening ? "primary" : "secondary"}
      className={clsx("z-4 absolute right-1 -mt-1", listening && "animate-pulse")}
      // className={clsx("z-4 ", listening && "animate-pulse")}
      title="Hold to speak"
    />
  );

  return (
    <form className={wrapperStyles} onSubmit={submitMessage}>
      <div className={rootStyles}>
        <ChatRangeInput<ChatFormFields>
          register={register}
          name="max_tokens"
          max={maxTokens}
          currentValue={watch("max_tokens")}
          className="absolute -top-2 left-0 right-0"
        />
        <div className="relative flex w-full flex-grow flex-col rounded-md border border-black/10 bg-white py-2 shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:border-gray-900/50 dark:bg-[#40414F] dark:text-white dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] md:py-3 md:pl-4">
          {microphoneButton}
          <textarea
            id={USER_INPUT_FIELD_ID}
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
        </div>
        {!appState.loading ? (
          <BaseButton
            title="Send your chat message"
            type="submit"
            size={isMobile ? "sm" : "md"}
            disabled={appState.loading}
            className="m-auto shadow-lg shadow-blue-500/40"
            text="Send"
          />
        ) : (
          <BaseButton
            text="Cancel"
            type="reset"
            theme="error"
            className="mt-auto"
            onClick={cancelStream}
          />
        )}
      </div>
    </form>
  );
};

export default ChatInput;
