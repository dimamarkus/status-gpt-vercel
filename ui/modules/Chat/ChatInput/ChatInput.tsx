"use client";
import { useSpeechRecognition } from "react-speech-kit";

import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from "./ChatInput.module.scss";
import { USER_INPUT_FIELD_ID } from "#/app/chat/lib/hooks/useChatGpt";
import { useIsMobile } from "#/lib/hooks/useIsMobile";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import { FormTextarea } from "#/ui/atoms/inputs/Textarea/Textarea";
import { useChatContext } from "#/lib/contexts/ChatContext";
import { useSuggestions } from "#/app/chat/lib/hooks/useSuggestions";
import { MicrophoneIcon } from "@heroicons/react/24/solid";

type ChatInputProps = {
  className?: string;
};

export type ChatFormFields = {
  chatInput: string;
};

export const ChatInput = (props: ChatInputProps) => {
  const { className } = props;
  const { inputFormContext, getAnswer, loading, setShowSuggestions, cancelStream, resetChat } =
    useChatContext();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Autofocus textarea on render
    if (typeof window === "object") {
      document.getElementById(USER_INPUT_FIELD_ID)?.focus();
    }
  }, []);

  const handleCancelStream = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    cancelStream();
  };

  if (!inputFormContext) {
    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = inputFormContext;

  const submitMessage = handleSubmit(({ chatInput }) => getAnswer(chatInput));

  return (
    <form
      className={clsx(styles.root, className)}
      onSubmit={submitMessage}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey && !loading) {
          submitMessage(e);
        }
      }}
    >
      {/* {onHamburgerClick && (
        <BaseButton
          type="hamburger"
          className="absolute right-20 top-1 md:right-1"
          title="Show Assumptions that Stat the AI coach should consider..."
          onClick={isTablet ? () => setShowAssumptions(!areAssumptionsShown) : undefined}
        />
      )} */}

      <FormTextarea<ChatFormFields>
        id={USER_INPUT_FIELD_ID}
        name={USER_INPUT_FIELD_ID}
        label="Chat Input"
        placeholder="Write your message"
        rules={{ required: "You must write a message first." }}
        errors={errors}
        onFocus={() => isMobile && setShowSuggestions(false)}
        onBlur={() => setShowSuggestions(true)}
        rows={3}
        required
        autoFocus
        register={register}
        className="ring-black"
        onListen={(result: string) => inputFormContext.setValue(USER_INPUT_FIELD_ID, result)}
      />
      {!loading ? (
        <BaseButton
          title="Send your chat message"
          type="submit"
          disabled={loading}
          className="h-full rounded-none md:h-auto md:rounded-b-md"
        >
          {
            <span className="pt-1 md:pt-0">
              Send <span className="hidden md:inline">Message</span>
            </span>
          }
        </BaseButton>
      ) : (
        <BaseButton text="Cancel" type="button" theme="error" onClick={handleCancelStream} />
      )}
      <BaseButton
        onClick={resetChat}
        text="Start Over"
        type="reset"
        flavor="hollow"
        className="border-none hover:bg-inherit"
      />
    </form>
  );
};
export default ChatInput;
