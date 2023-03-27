"use client";
import { useChatContext } from "#/lib/contexts/ChatContext";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { SpeechSynthesisReturnType } from "react-speech-kit";

type ChatSpeakButtonProps = SpeechSynthesisReturnType & {
  text: string;
  className?: string;
};

export const ChatSpeakButton = (props: ChatSpeakButtonProps) => {
  const { speak, cancel, speaking, voices, text, className } = props;
  const { bot } = useChatContext();
  const voice =
    voices.find(({ voiceURI }) =>
      bot?.voice ? voiceURI === bot?.voice : voiceURI === "Google UK English Male",
    ) || voices[0];

  return (
    <BaseButton
      onClick={() => (!!speaking ? cancel() : speak({ text, voice }))}
      title={!!speaking ? "Stop speaking" : "Speak the message out loud."}
      icon={speaking ? <SpeakerXMarkIcon /> : <SpeakerWaveIcon />}
      className={clsx(speaking && "animate-pulse", className)}
      flavor="icon"
      theme={speaking ? "primary" : "secondary"}
      size="sm"
    />
  );
};
export default ChatSpeakButton;
