import { RequestOptions } from "http";

/**
 * A wrapper around the fetch API to make requests
 *
 * @param url request url
 * @param method HTTP request method (get, post, put, delete)
 * @param data request body
 * @param headers additional headers you may want to add
 * @returns request response data or error
 */
export const makeStreamRequest = async (
  url: RequestInfo,
  method: RequestOptions["method"] = "GET",
  data: any = null,
  headers: HeadersInit = {},
): Promise<Response> => {
  const options: RequestInit = {
    method,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : "",
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
