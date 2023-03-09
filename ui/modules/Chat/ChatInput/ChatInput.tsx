import cn from "classnames";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import styles from "./ChatInput.module.scss";
import { CHATBOX_ID } from "#/lib/hooks/useChatGpt";
import { useIsMobile } from "#/lib/hooks/useIsMobile";
import Button from "#/ui/atoms/Button/Button";
import { FormTextarea } from "#/ui/atoms/inputs/Textarea/Textarea";

type ChatInputProps = {
  className?: string;
  onHamburgerClick?: () => void;
  onSubmit: (chatInput: ChatFormFields) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  inputFormContext: UseFormReturn<ChatFormFields, any>;
};

export type ChatFormFields = {
  chatInput: string;
};

export const ChatInput = (props: ChatInputProps) => {
  const { inputFormContext, onSubmit, onFocus, onBlur, onHamburgerClick, className } = props;
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

  const submitMessage = handleSubmit(onSubmit);

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
      {onHamburgerClick && (
        <Button
          type="hamburger"
          className="absolute right-20 top-1 md:right-1"
          title="Show Assumptions that Stat the AI coach should consider..."
          onClick={onHamburgerClick}
        />
      )}
      <label className="input-sizer stacked">
        <FormTextarea<ChatFormFields>
          id={CHATBOX_ID}
          name={CHATBOX_ID}
          label="Chat Input"
          placeholder="Write your message"
          className="text-md h-full w-full cursor-text rounded-none border-0 bg-neutral-100 leading-[150%] placeholder-neutral-500 outline-offset-2 focus:placeholder-gray-400 md:w-auto lg:min-w-full"
          rules={{ required: "You must write a message first." }}
          errors={errors}
          onFocus={onFocus}
          onBlur={onBlur}
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
