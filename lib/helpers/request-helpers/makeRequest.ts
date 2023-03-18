import { makeBaseRequest } from "#/lib/helpers/request-helpers/makeBaseRequest";
import { Price } from "#/lib/types/stripe";

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
  const responseData = (await response.json()) as TResponse;

  return responseData;
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

// ============================================================================
//  EXAMPLE GARBAGE
// ============================================================================
// TODO - DELETE THIS. Used in the old example code
export async function postData(req: { url: string; data?: { price: Price } }) {
  const { url, data } = req;

  const res: Response = await fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.log("Error in postData", { url, data, res });

    throw Error(res.statusText);
  }

  return res.json();
}
