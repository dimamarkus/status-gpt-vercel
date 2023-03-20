import { CmsResourceSlug } from "#/lib/types/cms";

const sanitizeUrl = (str: string) => {
  let url = str;
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Optionally including trailing `/`.
  // url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

export function getAppURL() {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  return sanitizeUrl(url);
}

export function getStrapiUrl() {
  let url = process?.env?.STRAPI_CMS_URL ?? "http://localhost:1337";
  return sanitizeUrl(url);
}

export function getCmsUrl(endpoint: string) {
  return getStrapiUrl() + "/api/" + endpoint;
}

export function getMediaUrl(mediaPath: string) {
  // If the media path is already a URL, return it.
  const pattern = /^((http|https|ftp):\/\/)/;
  if (pattern.test(mediaPath)) {
    return mediaPath;
  }

  return getStrapiUrl() + mediaPath;
}

export const pluralizeCmsModel = (model: string) =>
  (model === "chat-syntax" ? "chat-syntaxes" : model + "s") as CmsResourceSlug;
