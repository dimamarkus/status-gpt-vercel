"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from "./ChatInput.module.scss";
import { USER_INPUT_FIELD_ID } from "#/app/chat/lib/hooks/useChatGpt";
import { useIsMobile } from "#/lib/hooks/useIsMobile";
import Button from "#/ui/atoms/buttons/Button/Button";
import { FormTextarea } from "#/ui/atoms/inputs/Textarea/Textarea";
import { useChatContext } from "#/lib/contexts/ChatContext";
import { useSuggestions } from "#/app/chat/lib/hooks/useSuggestions";

type ChatInputProps = {
  className?: string;
};

export type ChatFormFields = {
  chatInput: string;
};

export const ChatInput = (props: ChatInputProps) => {
  const { className } = props;
  const { inputFormContext, getAnswer, setShowSuggestions } = useChatContext();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Autofocus textarea on render
    if (typeof window === "object") {
      document.getElementById(USER_INPUT_FIELD_ID)?.focus();
    }
  }, []);

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
        if (e.key === "Enter" && !e.shiftKey) {
          submitMessage(e);
        }
      }}
    >
      {/* {onHamburgerClick && (
        <Button
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
        rows={2}
        required
        autoFocus
        register={register}
      />

      <Button type="submit" className="h-full rounded-none md:h-auto md:rounded-b-md">
        {
          <>
            Send <span className="hidden md:block">&nbsp;Message</span>
          </>
        }
      </Button>
    </form>
  );
};
export default ChatInput;
