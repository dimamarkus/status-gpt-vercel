import { get } from "@vercel/edge-config";
import { Suspense } from "react";
import { fetchBot } from "#/lib/helpers/request-helpers/makeCmsRequest";
import LandingLayout from "#/ui/layouts/LandingLayout/LandingLayout";
import ChatBotMenu from "#/ui/modules/Chat/ChatBotMenu/ChatBotMenu";

type StrapiPageProps = {
  children: React.ReactNode;
};

export const revalidate = 0;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const bot = !!params.slug ? await fetchBot(params.slug) : null;
  const name = bot?.name || "AIdvisor Chat";
  return { title: name + " | Status AIdvisor" };
}

export default async function Layout({ children }: StrapiPageProps) {
  return (
    <LandingLayout>
      {/* @ts-expect-error Async Server Component */}
      <ChatBotMenu />
      {children}
    </LandingLayout>
  );
}
