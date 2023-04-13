import { SITE_TITLE } from "#/lib/constants/settings";

export const getTitlePrefix = () => {
  if (process.env.NODE_ENV === "development") {
    return "🔴";
  } else if (process.env.VERCEL_ENV === "preview") {
    return "";
  }
  return "";
};

const getFavicon = () => {
  if (process.env.NODE_ENV === "development") {
    return "/favicon/favicon-dev.ico";
  } else if (process.env.VERCEL_ENV === "preview") {
    return "/favicon/favicon-test.ico";
  }
  return "/favicon/favicon.ico";
};

export const globalMetadata = {
  title: getTitlePrefix() + "AI Financial Coach | StatusMoney",
  // template: "%s | Next.js App Router",
  description: "Your personal financial advisor powered by AI",
  favicon: getFavicon(),
  icons: {
    favicon: getFavicon(),
    other: [
      {
        rel: "apple-touch-icon",
        url: "/favicon/apple-touch-icon.png",
      },
      {
        rel: "icon",
        url: getFavicon(),
        type: "image/x-icon",
      },
    ],
    appleIcon: "/favicon/apple-touch-icon.png",
    appleIcon120: "/favicon/apple-touch-icon-120x120.png",
    appleIcon152: "/favicon/apple-touch-icon-152x152.png",
    appleIcon180: "/favicon/apple-touch-icon-180x180.png",
    appleIcon167: "/favicon/apple-touch-icon-167x167.png",
    appleIcon60: "/favicon/apple-touch-icon-60x60.png",
    appleIcon76: "/favicon/apple-touch-icon-76x76.png",
    appleIconPrecomposed: "/favicon/apple-touch-icon-precomposed.png",
    appleStartup: "/favicon/apple-touch-startup-image-640x920.png",
    favicon16: "/favicon/favicon-16x16.png",
    favicon32: "/favicon/favicon-32x32.png",
    favicon96: "/favicon/favicon-96x96.png",
    msTileImage: "/favicon/mstile-144x144.png",
    msTileColor: "#000030",
  },
  manifest: "/manifest.json",
  themeColor: "#000030",
  openGraph: {
    title: "AI Financial Coach | StatusMoney",
    description: "Your personal financial advisor powered by AI.",
    url: "https://ai.statusmoney.com",
    siteName: "StatusMoney.com",
    images: [
      {
        url: "https://statusmoney.com/resources/images/share_twitter.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    title: "AI Financial Coach | StatusMoney",
    description: "Your personal financial advisor powered by AI.",
    images: [
      {
        url: "https://statusmoney.com/resources/images/share_twitter.png",
        width: 800,
        height: 600,
      },
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 3,
  },
  appleWebApp: {
    title: SITE_TITLE,
    statusBarStyle: "black-translucent",
    startupImage: [
      "favicon/apple-touch-icon.png",
      {
        url: "favicon/apple-touch-icon.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
};
