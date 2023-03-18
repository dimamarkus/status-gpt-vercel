import { makeRequest } from "#/lib/helpers/request-helpers/makeRequest";

/**
 * A helper wrapper around the makeRequest function to make GET requests
 */
export const makeGetRequest = async <TResponse>(
  url: Request | string,
  headers?: HeadersInit,
  options?: RequestInit,
): Promise<TResponse> => {
  return makeRequest<TResponse, {}>(url, "GET", undefined, headers, options);
};
