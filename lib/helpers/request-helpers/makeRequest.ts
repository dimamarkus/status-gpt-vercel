import { makeBaseRequest } from "#/lib/helpers/request-helpers/makeBaseRequest";

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
  const response = await makeBaseRequest(url, method, body, headers, options);
  const responseData = (await response.json()) as TResponse;

  return responseData;
};
