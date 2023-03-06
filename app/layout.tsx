import 'server-only';

import { AuthContextProvider } from '#/lib/context/authContext';
import { createServerSideSupabase } from '#/lib/supabase-server';
import '#/styles/globals.scss';

export const metadata = {
  title: {
    default: 'Next.js App Router',
    template: '%s | Next.js App Router',
  },
  description:
    'A playground to explore new Next.js App Router features such as nested layouts, instant loading states, streaming, and component level data fetching.',
};

// This will ensure that every time a new route is loaded, our session data in RootLayout will always be up-to-date.
export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerSideSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const accessToken = session?.access_token || null;

  return (
    <html lang="en" className="[color-scheme:dark]">
      <AuthContextProvider accessToken={accessToken}>
        {children}
      </AuthContextProvider>
    </html>
  );
}
