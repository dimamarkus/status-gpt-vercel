"use client";

import { getBotParam } from "#/app/chat/lib/helpers/bot-helpers";
import { USER_INPUT_FIELD_ID } from "#/app/chat/lib/hooks/useChatGpt";
import { useChatContext } from "#/lib/contexts/ChatContext";
import { useIsMobile } from "#/lib/hooks/useIsMobile";
import ChatRangeInput from "#/ui/atoms/inputs/ChatRangeInput/ChatRangeInput";
import { FormTextarea } from "#/ui/atoms/inputs/Textarea/Textarea";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import clsx from "clsx";
import { useEffect } from "react";
import styles from "./ChatInput.module.scss";

type ChatInputProps = {
  className?: string;
};

export type ChatFormFields = {
  chatInput: string;
  max_tokens: number;
};

export const ChatInput = (props: ChatInputProps) => {
  const { className } = props;
  const { bot, inputFormContext, getAnswer, loading, setShowSuggestions, cancelStream, resetChat } =
    useChatContext();
  const isMobile = useIsMobile();
  const maxTokens = getBotParam(bot, "max_tokens") as number;
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
    watch,
    formState: { errors },
  } = inputFormContext;

  const submitMessage = handleSubmit(({ chatInput }) => getAnswer(chatInput));

  return (
    <form
      className={clsx(styles.root, className, "bg-base-100 px-4 ")}
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
      <ChatRangeInput<ChatFormFields>
        register={register}
        name="max_tokens"
        max={maxTokens}
        currentValue={watch("max_tokens")}
      />
      <fieldset className="relative">
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
          className="ring-black"
          onListen={(result: string) => inputFormContext.setValue(USER_INPUT_FIELD_ID, result)}
        />
        {!loading ? (
          <BaseButton
            title="Send your chat message"
            type="submit"
            disabled={loading}
            className="absolute right-3 top-3 md:relative md:right-auto md:top-auto md:rounded-t-none"
          >
            {
              <span className="pt-1 md:pt-0">
                Send <span className="hidden md:inline">Message</span>
              </span>
            }
          </BaseButton>
        ) : (
          <BaseButton
            text="Cancel"
            type="button"
            theme="error"
            className="h-full rounded-none md:h-auto md:rounded-b-md"
            onClick={handleCancelStream}
          />
        )}
      </fieldset>
      <BaseButton
        onClick={resetChat}
        text="Start Over"
        type="reset"
        flavor="hollow"
        className="border-none font-light capitalize opacity-50 hover:bg-inherit"
      />
    </form>
  );
};
export default ChatInput;
