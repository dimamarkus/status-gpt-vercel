import { makeServerRequest } from "#/lib/helpers/requests/makeServerRequest";
import { useState } from "react";

type UseRequestStreamReturnType<TRequestType> = {
  fullValue: string;
  loading: boolean;
  stream?: string;
  error: string;
  requestWasCancelled?: boolean;
  cancelStream: (resetState?: boolean) => Promise<void>;
  startStream: (requestBody: TRequestType) => void;
};

export const useRequestStream = <TRequestType>(
  endpoint: string,
): UseRequestStreamReturnType<TRequestType> => {
  const [controller, setController] = useState<AbortController | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [requestWasCancelled, setQueryWasCancelled] = useState<boolean>();
  const [fullValue, setFullValue] = useState<string>("");
  const [stream, setStream] = useState<string | undefined>(undefined);

  const cancelStream = async (resetState?: boolean) => {
    if (controller) {
      controller.abort();
      setController(null);
      setLoading(false);
      setQueryWasCancelled(true);
      resetState && setStream(undefined);
    }
  };

  const startStream = async (requestBody: TRequestType) => {
    setLoading(true);
    try {
      setQueryWasCancelled(false);
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
      let fullValue = "";
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        fullValue += chunkValue;
        !!setFullValue && setFullValue(fullValue);
        !!setStream && setStream(fullValue);
      }
      if (done) {
        setLoading(false);
        setStream(undefined);
        return fullValue;
      }
    } catch (err: any) {
      setError(err);
    }
  };

  return { fullValue, loading, stream, error, cancelStream, startStream, requestWasCancelled };
};
