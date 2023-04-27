import { AuthContextProvider } from "#/lib/contexts/AuthContext";
import { FeatureToggleContextProvider } from "#/lib/contexts/FeatureToggleContext";
import { LayoutContextProvider } from "#/lib/contexts/LayoutContext";
import { SettingsContextProvider } from "#/lib/contexts/SettingsContext";
import { supabaseServerComponent } from "#/lib/databases/supabase/supabase-server-component";
import "#/styles/index.scss";
import GoogleAnalytics from "#/ui/atoms/util/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";
import { globalMetadata } from "./metadata";

// This will ensure that every time a new route is loaded, our session data in RootLayout will always be up-to-date.
export const revalidate = 0;

export const metadata = globalMetadata;

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
