interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers: HeadersInit;
  body?: BodyInit | null;
}

export interface RequestInitWithBody extends Omit<RequestInit, "body"> {
  body: string;
}

type RequestInfo = Request | string;

/**
 * A wrapper around the fetch API to make requests
 *
 * @param url request url
 * @param method HTTP request method (get, post, put, delete)
 * @param data request body
 * @param headers additional headers you may want to add
 * @returns request response data or error
 */
export const makeRequest = async <T>(
  url: RequestInfo,
  method: RequestOptions["method"] = "GET",
  data: any = null,
  headers: HeadersInit = {},
): Promise<T> => {
  const options: RequestInitWithBody = {
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
    const responseData = (await response.json()) as T;
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * A helper wrapper around the makeRequest function to make POST requests
 */
export const post = async <T>(
  url: RequestInfo,
  data: any = null,
  headers: HeadersInit = {},
): Promise<T> => {
  return makeRequest<T>(url, "POST", data, headers);
};

/**
 * A helper wrapper around the makeRequest function to make GET requests
 */
export const get = async <T>(
  url: RequestInfo,
  data: any = null,
  headers: HeadersInit = {},
): Promise<T> => {
  return makeRequest<T>(url, "GET", data, headers);
};
