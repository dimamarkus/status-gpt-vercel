import '#/styles/globals.scss';
import { AddressBar } from '#/ui/examples/address-bar';
import { GlobalNav } from '#/ui/examples/global-nav';
import { VercelLogo } from '#/ui/examples/vercel-logo';

export const metadata = {
  title: {
    default: 'Next.js App Router',
    template: '%s | Next.js App Router',
  },
  description:
    'A playground to explore new Next.js App Router features such as nested layouts, instant loading states, streaming, and component level data fetching.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="[color-scheme:dark]">
      <head />
      {children}
    </html>
  );
}
