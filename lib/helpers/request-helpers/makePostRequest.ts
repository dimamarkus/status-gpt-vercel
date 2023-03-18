import { makeRequest } from "#/lib/helpers/request-helpers/makeRequest";
import { Price } from "#/lib/types/stripe";

/**
 * A helper wrapper around the makeRequest function to make POST requests
 */
export const makePostRequest = async <TResponse, TRequestBody>(
  url: RequestInfo,
  data: any = null,
  headers: HeadersInit = {},
): Promise<TResponse> => {
  return await makeRequest<TResponse, TRequestBody>(url, "POST", data, headers);
};

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
