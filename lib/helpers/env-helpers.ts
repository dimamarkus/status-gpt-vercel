let inDevEnv = false;
let inPreviewEnv = false;
let inProdEnv = true;

if (process) {
  if (process.env.NODE_ENV === "development") {
    inDevEnv = true;
    inPreviewEnv = false;
    inProdEnv = false;
  } else if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
    inDevEnv = false;
    inPreviewEnv = true;
    inProdEnv = false;
  }
}

export { inDevEnv, inPreviewEnv, inProdEnv };

export const isBrainaics =
  process.env.STRAPI_CMS_URL === "https://cms.brainaics.com" ? "Brainaics" : "Status AIdvisor";
