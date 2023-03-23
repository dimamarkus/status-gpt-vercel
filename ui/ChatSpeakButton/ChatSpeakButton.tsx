"use client";
import { useChatContext } from "#/lib/contexts/ChatContext";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";
import { useSpeechSynthesis } from "react-speech-kit";

type ChatSpeakButtonProps = {
  text: string;
};

export const ChatSpeakButton = ({ text }: ChatSpeakButtonProps) => {
  const { speak, cancel, speaking, voices } = useSpeechSynthesis();
  const { bot } = useChatContext();
  const voice =
    voices.find(({ voiceURI }) =>
      bot?.voice ? voiceURI === bot?.voice : voiceURI === "Google US English Male",
    ) || voices[0];

  return (
    <button
      onClick={() => (!!speaking ? cancel() : speak({ text, voice }))}
      className="w-4"
      title={!!speaking ? "Stop speaking" : "Speak the message out loud."}
    >
      {speaking ? <SpeakerXMarkIcon /> : <SpeakerWaveIcon />}
    </button>
  );
};
export default ChatSpeakButton;
