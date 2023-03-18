import { makeBaseRequest } from "#/lib/helpers/request-helpers/makeBaseRequest";

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

// ============================================================================
//  BASE
// ============================================================================

export const makeServerRequest = async <TRequestBody>(
  endpoint: Request | string,
  method: HTTPMethod = "GET",
  body?: TRequestBody,
  headers: HeadersInit = {},
  options: RequestInit = {},
): Promise<Response> => {
  const url = (process.env.APP_API_URL || "/api") + endpoint;
  const response = await makeBaseRequest(url, method, body, headers, options);

  return response;
};

export const makeAsyncServerRequest = async <TResponse, TRequestBody>(
  endpoint: Request | string,
  method: HTTPMethod = "GET",
  body?: TRequestBody,
  headers: HeadersInit = {},
  options: RequestInit = {},
): Promise<TResponse> => {
  const response = await makeServerRequest(endpoint, method, body, headers, options);

  const responseData = (await response.json()) as TResponse;

  return responseData;
};

// ============================================================================
//  WRAPPERS
// ============================================================================

export const makeServerPostRequest = async <TResponse, TRequestBody>(
  endpoint: Request | string,
  body?: TRequestBody,
  async: boolean = false,
  headers: HeadersInit = {},
  options: RequestInit = {},
): Promise<TResponse> => {
  return makeAsyncServerRequest<TResponse, TRequestBody>(endpoint, "POST", body);
};
