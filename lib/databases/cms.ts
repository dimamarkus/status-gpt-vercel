"use server";

import { HTTPMethod, makeAsyncRequest } from "#/lib/helpers/requests/makeRequest";
import { getCmsUrl } from "#/lib/helpers/url-helpers";
import {
  Bot,
  ChatSettings,
  CmsResource,
  CmsResourceSlug,
  CmsResponse,
  LandingPage,
} from "#/lib/types/cms";
import { StrapiArrayResponse, StrapiOperator, StrapiSingleResponse } from "#/lib/types/strapi";

// ============================================================================
//  BASE
// ============================================================================
export async function makeCmsRequest<TResponse extends Response, TRequestBody extends Request | {}>(
  endpoint: string,
  method: HTTPMethod,
  body?: any,
): Promise<TResponse> {
  const cmsUrl = getCmsUrl(endpoint);
  const apiKey = process.env.STRAPI_API_KEY || process.env.NEXT_PUBLIC_STRAPI_API_KEY;
  const authHeaders = { Authorization: `Bearer ${apiKey ?? ""}` };

  return await makeAsyncRequest<TResponse, TRequestBody>(cmsUrl, method, body, authHeaders);
}

export async function postToCms<TResponse extends CmsResource, TRequestBody extends Request>(
  endpoint: string,
  body: TRequestBody,
): Promise<CmsResponse<TResponse>> {
  return await makeCmsRequest<CmsResponse<TResponse>, TRequestBody>(endpoint, "POST", body);
}

// ============================================================================
//  UTIL
// ============================================================================
export async function extractResources<T extends CmsResource>(
  response: StrapiArrayResponse<T>,
): Promise<T[]> {
  if (!response.data || !response.data.length) {
    throw new Error("Fetch resource failed with status " + response.status);
  }
  const bots = response?.data.map((bot) => bot.attributes);
  return bots;
}

export async function extractResource<T extends CmsResource>(
  response: StrapiArrayResponse<T>,
): Promise<T> {
  if (!response.data || !response.data.length) {
    throw new Error("Fetch resource failed with status " + response.status);
  }
  return response?.data[0]?.attributes;
}

// ============================================================================
//  GENERIC
// ============================================================================
const getPopulateString = (populateFields: string[]) =>
  populateFields.includes("*")
    ? "populate=*"
    : populateFields.map((field, index) => `&populate[${index}]=${field}`).join("");

export async function getResourcesFromCms<T extends CmsResource>(
  endpoint: CmsResourceSlug,
  urlParams?: string,
  populate?: boolean,
): Promise<StrapiArrayResponse<T>> {
  // TODO  - PERFORMANCE ISSUE - fetches media with every request (should be optional)
  const PERFORMANCE_HIT = (urlParams ? "&" : "?") + "populate=*";
  const queryString = urlParams ? "?" + urlParams : "";
  const url = endpoint + queryString + (populate ? PERFORMANCE_HIT : "");

  return await makeCmsRequest<StrapiArrayResponse<T>, {}>(url, "GET");
}

export async function getResourceFromCms<T extends CmsResource>(
  endpoint: CmsResourceSlug,
  id?: string,
  populate?: boolean,
): Promise<StrapiSingleResponse<T>> {
  const resourcePath = id ? `${endpoint}/${id}` : endpoint;
  const url = resourcePath + (populate ? "?populate=$" : "");

  return await makeCmsRequest<StrapiSingleResponse<T>, {}>(url, "GET");
}

export async function filterResourceFromCms<TResource extends CmsResource>(
  endpoint: CmsResourceSlug,
  param: keyof TResource,
  query: string | number,
  operator?: StrapiOperator,
  populate?: boolean,
): Promise<StrapiArrayResponse<TResource>> {
  const queryParams = "filters[" + param.toString() + "][" + (operator || "$eq") + "]=" + query;

  return await getResourcesFromCms<TResource>(endpoint, queryParams, populate);
}

export async function getResourceFieldsFromCms<TResource extends CmsResource>(
  endpoint: CmsResourceSlug,
  fields: keyof TResource | (keyof TResource)[],
): Promise<StrapiArrayResponse<TResource>> {
  const fieldsToFetch = Array.isArray(fields) ? fields : [fields];
  const queryParams = fieldsToFetch
    .map((field, index) => `fields[${index}]=${field.toString()}`)
    .join("&");

  return await getResourcesFromCms<TResource>(endpoint, queryParams);
}

export async function putResourceToCms<T extends CmsResource>(
  endpoint: CmsResourceSlug,
  resource: T,
): Promise<StrapiArrayResponse<T>> {
  return await makeCmsRequest<StrapiArrayResponse<T>, T>(endpoint, "PUT", { data: resource });
}

// ============================================================================
//  RESOURCES
// ============================================================================
export async function fetchLandingPage(slug: LandingPage["slug"]): Promise<LandingPage> {
  const populateString = `&populate[hero_section][populate]=*&populate[sections][populate]=*&populate[seo][populate]=*`;
  const queryString = slug + populateString;
  const response = await filterResourceFromCms<LandingPage>(
    "landing-pages",
    "slug",
    queryString,
    undefined,
    true,
  );
  return await extractResource(response);
}

export async function fetchBots(): Promise<Bot[]> {
  const populateString = getPopulateString(["avatar"]);

  const response = await getResourcesFromCms<Bot>("bots", populateString);
  return await extractResources(response);
}

export async function fetchBot(slug: Bot["slug"]): Promise<Bot> {
  const response = await filterResourceFromCms<Bot>("bots", "slug", slug);
  return await extractResource(response);
}

export async function fetchChatSettings(): Promise<ChatSettings> {
  const response = await getResourcesFromCms<ChatSettings>("chat-setting");
  return await extractResource(response);
}

export async function updateChatSettings(settings: ChatSettings): Promise<ChatSettings> {
  const response = await putResourceToCms<ChatSettings>("chat-setting", settings);
  return await extractResource(response);
}
