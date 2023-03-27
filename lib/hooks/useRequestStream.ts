import { makeServerRequest } from "#/lib/helpers/request-helpers/makeServerRequest";
import { useState } from "react";

export const useRequestStream = <TRequestType>(endpoint: string) => {
  const [controller, setController] = useState<AbortController | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [fullValue, setFullValue] = useState<string>("");
  const [stream, setStream] = useState<string | undefined>(undefined);

  const cancelStream = async () => {
    if (controller) {
      controller.abort();
      setController(null);
      setLoading(false);
      setStream(undefined);
    }
  };

  const requestStream = async (requestBody: TRequestType) => {
    setLoading(true);
    try {
      if (controller) {
        controller.abort();
        setController(null);
      }
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

  return { loading, stream, error, cancelStream, requestStream };
};
