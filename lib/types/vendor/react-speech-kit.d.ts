declare module "react-speech-kit" {
  type OnEndCallback = () => void;

  interface SpeakOptions {
    text: string;
    voice: SpeechSynthesisVoice;
  }

  interface ReactSpeechKitReturnType {
    speak: (options: SpeakOptions) => void;
    cancel: () => void;
    speaking: boolean;
    supported: boolean;
    voices: SpeechSynthesisVoice[];
  }

  function useSpeechSynthesis(onEnd?: OnEndCallback): ReactSpeechKitReturnType;

  export { useSpeechSynthesis };
}
