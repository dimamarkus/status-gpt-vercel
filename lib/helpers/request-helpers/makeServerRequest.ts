import { makeRequest } from "#/lib/helpers/request-helpers/makeRequest";

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

// ============================================================================
//  BASE
// ============================================================================

export const makeServerRequest = async <TRequestBody>(
  endpoint: Request | string,
  method: HTTPMethod = "GET",
  body?: TRequestBody,
): Promise<Response> => {
  const url = (process.env.APP_API_URL || "/api") + endpoint;
  const response = await makeRequest(url, method, body);

  return response;
};

export const makeAsyncServerRequest = async <TResponse, TRequestBody>(
  endpoint: Request | string,
  method: HTTPMethod = "GET",
  body?: TRequestBody,
): Promise<TResponse> => {
  const response = await makeServerRequest(endpoint, method, body);

  const responseData = (await response.json()) as TResponse;

  return responseData;
};

// ============================================================================
//  WRAPPERS
// ============================================================================

export const makeServerGetRequest = async <TResponse, TRequestBody>(
  endpoint: Request | string,
  body?: TRequestBody,
): Promise<TResponse> => {
  return makeAsyncServerRequest<TResponse, TRequestBody>(endpoint, "GET", body);
};

export const makeServerPostRequest = async <TResponse, TRequestBody>(
  endpoint: Request | string,
  body?: TRequestBody,
): Promise<TResponse> => {
  return makeAsyncServerRequest<TResponse, TRequestBody>(endpoint, "POST", body);
};
