/**
 * @function getStream
 * @description Asynchronously fetch a streaming response from our API
 * @param {string} prompt The prompt for the streaming response
 * @param {function} [setStream] Optional callback to set the streaming response
 * @returns {string} The final collated value of the streaming response
 */
export async function getStream(prompt: string, setStream?: (str: string) => void) {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      currentModel: "text-davinci-003",
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // This data is a ReadableStream
  const data = response.body;
  if (!data) {
    return;
  }

  const reader = data.getReader();
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
    return fullValue;
  }
}
