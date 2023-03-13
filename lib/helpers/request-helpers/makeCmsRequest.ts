import { HTTPMethod, makeRequest } from "#/lib/helpers/request-helpers/makeRequest";
import { getCmsUrl } from "#/lib/helpers/url-helpers";
import {
  Bot,
  CmsResources,
  CmsResponse,
  StrapiArrayResponse,
  StrapiOperator,
  StrapiResource,
  StrapiSingleResponse,
} from "#/types/cms";

// ============================================================================
//  BASE
// ============================================================================
export async function makeCmsRequest<TResponse extends Response, TRequestBody extends Request | {}>(
  endpoint: string,
  method: HTTPMethod,
  body?: any,
  headers?: HeadersInit,
): Promise<TResponse> {
  const cmsUrl = getCmsUrl(endpoint);
  const authHeaders = { Authorization: `Bearer ${process.env.STRAPI_API_KEY ?? ""}` };

  return await makeRequest<TResponse, TRequestBody>(cmsUrl, method, body, authHeaders);
}

export async function postToCms<TResponse, TRequestBody extends Request>(
  endpoint: string,
  body: TRequestBody,
  headers?: HeadersInit,
): Promise<CmsResponse<TResponse>> {
  return await makeCmsRequest<CmsResponse<TResponse>, TRequestBody>(
    endpoint,
    "POST",
    body,
    headers,
  );
}

// ============================================================================
//  CMS REOURCES
// ============================================================================

export async function getResourcesFromCms<T extends StrapiResource>(
  resource: CmsResources,
  urlParams?: string,
): Promise<StrapiArrayResponse<T>> {
  const endpoint = resource + (urlParams || "");

  return await makeCmsRequest<StrapiArrayResponse<T>, {}>(endpoint, "GET");
}

export async function getResourceFromCms<T extends StrapiResource>(
  resource: CmsResources,
  id?: string,
): Promise<StrapiSingleResponse<T>> {
  const endpoint = id ? `${resource}/${id}` : resource;

  return await makeCmsRequest<StrapiSingleResponse<T>, {}>(endpoint, "GET");
}

export async function filterResourceFromCms<TResource extends StrapiResource>(
  resource: CmsResources,
  param: keyof TResource["attributes"],
  query: string | number,
  operator?: StrapiOperator,
): Promise<StrapiArrayResponse<TResource>> {
  const queryParams = "?filters[" + param.toString() + "][" + (operator || "$eq") + "]=" + query;

  return await getResourcesFromCms<TResource>(resource, queryParams);
}

export async function getResourceFieldsFromCms<TResource extends StrapiResource>(
  resource: CmsResources,
  fields: keyof TResource["attributes"] | (keyof TResource["attributes"])[],
): Promise<StrapiArrayResponse<TResource>> {
  const fieldsToFetch = Array.isArray(fields) ? fields : [fields];
  const queryParams = fieldsToFetch
    .map((field, index) => `?fields[${index}]=${field.toString()}`)
    .join("&");

  return await getResourcesFromCms<TResource>(resource, queryParams);
}
