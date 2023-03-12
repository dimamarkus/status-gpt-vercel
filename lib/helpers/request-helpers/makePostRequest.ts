import { Price } from "types/stripe";
import { makeRequest } from "#/lib/helpers/request-helpers/makeRequest";

/**
 * A helper wrapper around the makeRequest function to make POST requests
 */
export const makePostRequest = async <TResponse extends Response, TRequestBody extends Request>(
  url: RequestInfo,
  data: any = null,
  headers: HeadersInit = {},
): Promise<TResponse> => {
  return makeRequest<TResponse, TRequestBody>(url, "POST", data, headers);
};

export async function postData(req: { url: string; data?: { price: Price } }) {
  const { url, data } = req;
  console.log("posting,", url, data);

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
