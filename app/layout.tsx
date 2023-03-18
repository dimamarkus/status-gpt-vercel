import { Analytics } from "@vercel/analytics/react";
import { AuthContextProvider } from "#/lib/contexts/AuthContext";
import { FeatureToggleContextProvider } from "#/lib/contexts/FeatureToggleContext";
import { FullScreenContextProvider } from "#/lib/contexts/FullScreenContext";
import { LanguageContextProvider } from "#/lib/contexts/LanguageContext";
import "#/styles/globals.scss";

// This will ensure that every time a new route is loaded, our session data in RootLayout will always be up-to-date.
// export const revalidate = 0;

const devIcon = process.env.NODE_ENV === "development" ? "🚧 " : "";
export const metadata = {
  title: devIcon + "AI Financial Coach | StatusMoney",
  // template: "%s | Next.js App Router",
  description: "Your personal financial advisor powered by AI",
  favicon: "/favicon/favicon.ico",
  icons: {
    other: [
      {
        rel: "apple-touch-icon",
        url: "/favicon/apple-touch-icon.png",
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
    title: "Status AIdvisor",
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const supabase = createServerSideSupabase();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  // const accessToken = session?.access_token || null;
  return (
    <html lang="en">
      <Analytics />
      <AuthContextProvider accessToken={null}>
        <FeatureToggleContextProvider>
          <LanguageContextProvider>
            <FullScreenContextProvider>{children}</FullScreenContextProvider>
          </LanguageContextProvider>
        </FeatureToggleContextProvider>
      </AuthContextProvider>
    </html>
  );
}
