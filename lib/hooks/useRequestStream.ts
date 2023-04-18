import { makeServerRequest } from "#/lib/helpers/requests/makeServerRequest";
import { useState } from "react";

export type UseRequestStreamReturnType<TRequestType> = {
  stream?: string;
  streamResult: string;
  loading: boolean;
  error: string;
  cancelStream: (resetState?: boolean) => Promise<string | undefined>
  startStream: (requestBody: TRequestType) => void;
};

export const useRequestStream = <TRequestType>(
  endpoint: string,
): UseRequestStreamReturnType<TRequestType> => {
  const [controller, setController] = useState<AbortController | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [streamResult, setFullAnswer] = useState<string>("");
  const [stream, setStream] = useState<string | undefined>(undefined);

  const cancelStream = async () => {
    if (controller) {
      setController(null);
      setLoading(false);
      setStream(undefined);
      controller.abort();
      return streamResult
    }
  };

  const startStream = async (requestBody: TRequestType) => {
    setLoading(true);
    try {
      const newController = new AbortController();
      setController(newController);
      const cancelSignal = newController.signal;

      const headers = {};
      const response = await makeServerRequest(endpoint, "POST", requestBody, headers, {
        signal: cancelSignal,
      });

      const stream = response.body;
      if (!stream) {
        return;
      }

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let streamResult = "";
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        streamResult += chunkValue;
        !!setFullAnswer && setFullAnswer(streamResult);
        !!setStream && setStream(streamResult);
      }

      setLoading(false);
      setStream(undefined);
      return streamResult;
    } catch (err: any) {
      setError(err);
    }
  };

  return { streamResult, loading, stream, error, cancelStream, startStream };
};
