import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useState } from "react";
import { MyUserContextProvider } from "#/lib/hooks/useUser";
import "#/styles/index.scss";
import { Database } from "#/lib/types/supabase";
import { Layout } from "#/ui/examples/page-directory/layout";

// Using next/font instead of a manual setup, we get:
// - significantly easier setup
// - automatic best font practices
// - reduced layout shift
// - no network requests from the browser
const primaryFont = Inter({
  subsets: ["latin"],
  variable: "--primary-font",
});

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient<Database>());
  return (
    <main className={`${primaryFont.variable} font-sans`}>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MyUserContextProvider>
      </SessionContextProvider>
    </main>
  );
}
