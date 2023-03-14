"use server";

import { HTTPMethod, makeRequest } from "#/lib/helpers/request-helpers/makeRequest";
import { getCmsUrl } from "#/lib/helpers/url-helpers";
import { CmsResource, CmsResourceSlug, CmsResponse } from "#/lib/types/cms";
import { StrapiArrayResponse, StrapiOperator, StrapiSingleResponse } from "#/lib/types/strapi";

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

export async function postToCms<TResponse extends CmsResource, TRequestBody extends Request>(
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

export async function getResourcesFromCms<T extends CmsResource>(
  resource: CmsResourceSlug,
  urlParams?: string,
  populate?: boolean,
): Promise<StrapiArrayResponse<T>> {
  // TODO  - PERFORMANCE ISSUE - fetches media with every request (should be optional)
  const PERFORMANCE_HIT = (urlParams ? "&" : "?") + "populate=*";
  const queryString = urlParams ? "?" + urlParams : "";
  const endpoint = resource + queryString + (populate ? PERFORMANCE_HIT : "");

  return await makeCmsRequest<StrapiArrayResponse<T>, {}>(endpoint, "GET");
}

export async function getResourceFromCms<T extends CmsResource>(
  resource: CmsResourceSlug,
  id?: string,
  populate?: boolean,
): Promise<StrapiSingleResponse<T>> {
  const resourcePath = id ? `${resource}/${id}` : resource;
  const endpoint = resourcePath + (populate ? "?populate=*" : "");

  return await makeCmsRequest<StrapiSingleResponse<T>, {}>(endpoint, "GET");
}

export async function filterResourceFromCms<TResource extends CmsResource>(
  resource: CmsResourceSlug,
  param: keyof TResource,
  query: string | number,
  operator?: StrapiOperator,
): Promise<StrapiArrayResponse<TResource>> {
  const queryParams = "filters[" + param.toString() + "][" + (operator || "$eq") + "]=" + query;

  return await getResourcesFromCms<TResource>(resource, queryParams, true);
}

export async function getResourceFieldsFromCms<TResource extends CmsResource>(
  resource: CmsResourceSlug,
  fields: keyof TResource | (keyof TResource)[],
): Promise<StrapiArrayResponse<TResource>> {
  const fieldsToFetch = Array.isArray(fields) ? fields : [fields];
  const queryParams = fieldsToFetch
    .map((field, index) => `fields[${index}]=${field.toString()}`)
    .join("&");

  return await getResourcesFromCms<TResource>(resource, queryParams);
}
