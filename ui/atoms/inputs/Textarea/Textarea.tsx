import { CHAT_BOT_INPUT_MAX_CHARS } from "#/lib/constants/settings";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import { MicrophoneIcon } from "@heroicons/react/24/solid";
import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
import { DetailedHTMLProps, TextareaHTMLAttributes, useCallback } from "react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { useSpeechRecognition } from "react-speech-kit";
import styles from "./Textarea.module.scss";

export type FormTextareaProps<TFormValues extends FieldValues> = {
  id: string;
  name: Path<TFormValues>;
  label: string;
  className?: string;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  onListen?: (result: string) => void;
} & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export const FormTextarea = <TFormValues extends Record<string, any>>({
  id,
  name,
  label,
  register,
  rules,
  errors,
  className,
  onListen,
  ...props
}: FormTextareaProps<TFormValues>): JSX.Element => {
  const errorMessages = !!errors ? errors[name] : null;
  const hasError = !!(errors && errorMessages);
  const hookFieldProps = register?.(name, rules);
  const { features } = useFeatureToggleContext();

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      onListen && onListen(result);
    },
  });

  const onChange = useCallback(
    (e: any) => {
      const parent = e.target.parentNode;
      if (!!parent) {
        parent.dataset.value = e.target.value;
        hookFieldProps?.onChange(e);
      }
    },
    [hookFieldProps],
  );

  const fieldProps = {
    id: id,
    name: name,
    "aria-label": label,
    "aria-invalid": !!(errors && errorMessages),
    maxLength: CHAT_BOT_INPUT_MAX_CHARS,
    onChange,
    className: "ring-none ring-transparent",
    ...props,
    placeholder: listening ? "Listening..." : props.placeholder,
  };

  const microphoneButton = onListen && (
    <BaseButton
      type={features.autoSubmitSpeech ? "submit" : "button"}
      flavor="icon"
      icon={<MicrophoneIcon />}
      onMouseDown={listen}
      onMouseUp={stop}
      onMouseOut={stop}
      size="sm"
      theme={listening ? "primary" : "secondary"}
      className={clsx("z-4 absolute right-1 top-1", listening && "animate-pulse")}
    />
  );

  return (
    <label className={clsx(styles.root, styles.stacked, hasError && styles.hasError)}>
      {!!register ? <textarea {...hookFieldProps} {...fieldProps} /> : <textarea {...fieldProps} />}
      {microphoneButton}
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => <small className="text-red-500">{message}</small>}
      />
    </label>
  );
};

export default FormTextarea;
