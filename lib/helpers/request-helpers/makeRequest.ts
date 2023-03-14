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
export const makeRequest = async <TResponse, TRequestBody>(
  url: Request | string,
  method: HTTPMethod = "GET",
  body?: TRequestBody,
  headers: HeadersInit = {},
  options: RequestInit = {},
): Promise<TResponse> => {
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
      console.error("response", response);
      console.error("response.body", response.body);
      console.error("response.json()", response.json());
      throw new Error("Network response was not ok.");
    }
    const responseData = (await response.json()) as TResponse;
    // console.log("responseData", responseData.data);
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * A helper wrapper around the makeRequest function to make POST requests
 */
export const post = async <TResponse, TRequestBody>(
  url: Request | string,
  body: TRequestBody,
  headers?: HeadersInit,
  options?: RequestInit,
): Promise<TResponse> => {
  return makeRequest<TResponse, TRequestBody>(url, "POST", body, headers, options);
};

/**
 * A helper wrapper around the makeRequest function to make GET requests
 */
export const get = async <TResponse>(
  url: Request | string,
  headers?: HeadersInit,
  options?: RequestInit,
): Promise<TResponse> => {
  return makeRequest<TResponse, {}>(url, "GET", undefined, headers, options);
};
