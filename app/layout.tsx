import { AuthContextProvider } from "#/lib/contexts/AuthContext";
import { FeatureToggleContextProvider } from "#/lib/contexts/FeatureToggleContext";
import { LayoutContextProvider } from "#/lib/contexts/LayoutContext";
import { SettingsContextProvider } from "#/lib/contexts/SettingsContext";
import { supabaseServerComponent } from "#/lib/databases/supabase/supabase-server-component";
import "#/styles/index.scss";
import GoogleAnalytics from "#/ui/atoms/util/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";
import { globalMetadata } from "./metadata";
import { fetchGlobalSettings } from "#/lib/databases/cms";

// This will ensure that every time a new route is loaded, our session data in RootLayout will always be up-to-date.
export const revalidate = 0;

export async function generateMetadata() {
  const globalSettings = await fetchGlobalSettings();
  if (globalSettings) {
    const shareImage = globalSettings?.default_meta_image?.data?.attributes?.url
    const socialMetadata = {
      title: globalSettings.default_meta_title,
      description: globalSettings.default_meta_description,
      images: [{
        url: shareImage || "",
        width: 800,
        height: 600,
      }],
    }
    return {
      ...globalMetadata,
      title: globalSettings.default_meta_title,
      description: globalSettings.default_meta_description,
      openGraph: {
        ...socialMetadata,
        url: process.env.APP_URL,
        title: globalSettings.site_name,
      },
      twitter: socialMetadata,
      appleWebApp: {
        title: globalSettings.default_meta_title,
      }
    }
  }
  return globalMetadata
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const supabase = supabaseServerComponent();

  const { data} = await supabase.auth.getSession();

  const accessToken = data?.session?.access_token || null;

  return (
    <html lang="en">
      <Analytics />
      <GoogleAnalytics />
      <AuthContextProvider accessToken={accessToken}>
        <FeatureToggleContextProvider>
          <SettingsContextProvider>
            <LayoutContextProvider>{children}</LayoutContextProvider>
          </SettingsContextProvider>
        </FeatureToggleContextProvider>
      </AuthContextProvider>
    </html>
  );
}
