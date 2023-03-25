import { Analytics } from "@vercel/analytics/react";
import { FeatureToggleContextProvider } from "#/lib/contexts/FeatureToggleContext";
import { FullScreenContextProvider } from "#/lib/contexts/FullScreenContext";
import { LanguageContextProvider } from "#/lib/contexts/LanguageContext";
import "#/styles/index.scss";
import GoogleAnalytics from "#/ui/atoms/util/GoogleAnalytics";
import { globalMetadata } from "./metadata";

// This will ensure that every time a new route is loaded, our session data in RootLayout will always be up-to-date.
// export const revalidate = 0;

export const metadata = globalMetadata;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Analytics />
      <GoogleAnalytics />
      <FeatureToggleContextProvider>
        <LanguageContextProvider>
          <FullScreenContextProvider>{children}</FullScreenContextProvider>
        </LanguageContextProvider>
      </FeatureToggleContextProvider>
    </html>
  );
}
