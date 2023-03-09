import { useState } from "react";

export const useGetStream = <TBodyType>(endpoint: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [stream, setStream] = useState<string | undefined>(undefined);

  const getStream = async (requestBody: TBodyType) => {
    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // This stream is a ReadableStream
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

  return { loading, stream, error, getStream };
};
