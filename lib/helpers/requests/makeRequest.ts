import { makeBaseRequest } from "#/lib/helpers/requests/makeBaseRequest";

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

// ============================================================================
//  BASE
// ============================================================================

export const makeRequest = async <TRequestBody>(
  url: Request | string,
  method: HTTPMethod = "GET",
  body?: TRequestBody,
  headers: HeadersInit = {},
  options: RequestInit = {},
): Promise<Response> => {
  const response = await makeBaseRequest(url, method, body, headers, options);

  return response;
};

export const makeAsyncRequest = async <TResponse, TRequestBody>(
  url: Request | string,
  method: HTTPMethod = "GET",
  body?: TRequestBody,
  headers: HeadersInit = {},
  options: RequestInit = {},
): Promise<TResponse> => {
  const response = await makeRequest(url, method, body, headers, options);

  if (response.status === 200) {
    const responseData = (await response.json()) as TResponse;
    return responseData;
  }

  return response as unknown as TResponse;
};

// ============================================================================
//  WRAPPERS
// ============================================================================

export const makeGetRequest = async <TResponse>(
  url: Request | string,
  headers?: HeadersInit,
  options?: RequestInit,
): Promise<TResponse> => {
  return makeAsyncRequest<TResponse, {}>(url, "GET", undefined, headers, options);
};

export const makePostRequest = async <TResponse, TRequestBody>(
  url: RequestInfo,
  data: any = null,
  headers: HeadersInit = {},
): Promise<TResponse> => {
  return await makeAsyncRequest<TResponse, TRequestBody>(url, "POST", data, headers);
};
