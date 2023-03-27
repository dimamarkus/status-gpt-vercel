declare module "react-speech-kit" {
  type OnEndCallback = () => void;

  //  SPEAKING
  // ============================================================================
  interface SpeakOptions {
    text: string;
    voice: SpeechSynthesisVoice;
  }

  export interface SpeechSynthesisReturnType {
    speak: (options: SpeakOptions) => void;
    cancel: () => void;
    speaking: boolean;
    supported: boolean;
    voices: SpeechSynthesisVoice[];
  }

  function useSpeechSynthesis(onEnd?: OnEndCallback): SpeechSynthesisReturnType;

  //  LISTENING
  // ============================================================================
  type OnResultCallback = (result: string) => void;

  interface ListenOptions {
    lang: string;
    interimResults: boolean;
  }

  interface SpeechRecognitionReturnType {
    listen: (options: ListenOptions | EventHandler) => void;
    stop: () => void;
    listening: boolean;
    supported: boolean;
  }

  function useSpeechRecognition({
    onEnd,
    onResult,
  }: {
    onEnd?: OnEndCallback;
    onResult?: OnResultCallback;
  }): SpeechRecognitionReturnType;

  export { useSpeechSynthesis, useSpeechRecognition };
}
