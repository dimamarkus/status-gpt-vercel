export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

/**
 * A wrapper around the fetch API to make requests
 *
 * @param url request url
 * @param method HTTP request method (get, post, put, delete)
 * @param body request body
 * @param options Pass additional headers or other request options
 * @returns request response data or error
 */
export const makeBaseRequest = async <TRequestBody>(
  url: Request | string,
  method: HTTPMethod = "GET",
  body?: TRequestBody,
  headers: HeadersInit = {},
  options: RequestInit = {},
): Promise<Response> => {
  const request: RequestInit = {
    method,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    ...options,
  };

  if (method !== "GET") {
    request.body = body ? JSON.stringify(body) : "";
  }

  try {
    const response = await fetch(url, request);
    if (!response.ok) {
      console.warn("Error status", response.status);
      console.warn("Error on request.url", url);
      console.warn("Error on response.body", response.body);
      throw new Error("Network response was not ok.");
    }

    return response;
  } catch (error) {
    throw error;
  }
};
