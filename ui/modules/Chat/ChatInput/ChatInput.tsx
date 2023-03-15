"use client";
import cn from "classnames";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import styles from "./ChatInput.module.scss";
import { CHATBOX_ID } from "#/app/chat/lib/hooks/useChatGpt";
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
  // const { inputFormContext, onSubmit, onFocus, onBlur, onHamburgerClick, className } = props;
  const { inputFormContext, getAnswer, setShowSuggestions } = useChatContext();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Autofocus textarea on render
    if (typeof window === "object") {
      document.getElementById(CHATBOX_ID)?.focus();
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
      className={cn(styles.ChatInput, "form-control relative flex-row md:flex-col", className)}
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
      <label className="input-sizer stacked">
        <FormTextarea<ChatFormFields>
          id={CHATBOX_ID}
          name={CHATBOX_ID}
          label="Chat Input"
          placeholder="Write your message"
          className="text-md h-full w-full cursor-text rounded-none border-0 bg-neutral-100 leading-[150%] placeholder-neutral-500 outline-offset-2 focus:placeholder-gray-400 md:w-auto lg:min-w-full"
          rules={{ required: "You must write a message first." }}
          errors={errors}
          onFocus={() => isMobile && setShowSuggestions(false)}
          onBlur={() => setShowSuggestions(true)}
          rows={1}
          required
          autoFocus
          register={register}
        />
      </label>

      <Button
        type="submit"
        text={!isMobile ? "Send Message" : "Send"}
        className="h-full rounded-none md:h-auto md:rounded-t-none"
      />
    </form>
  );
};
export default ChatInput;
