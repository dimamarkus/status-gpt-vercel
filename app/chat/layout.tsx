import { getTitlePrefix } from "#/app/layout";
import { inProdEnv } from "#/lib/helpers/env-helpers";
import { fetchBot } from "#/lib/helpers/request-helpers/makeCmsRequest";
import LandingLayout from "#/ui/atoms/layouts/LandingLayout/LandingLayout";
import FeaturesPanel from "#/ui/molecules/FeaturesPanel/FeaturesPanel";

type ChatPageLayoutProps = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
};

export const revalidate = 0;

export async function generateMetadata({ params }: ChatPageLayoutProps) {
  const bot = !!params.slug ? await fetchBot(params.slug) : null;
  const name = bot?.name || "AIdvisor Chat";
  return { title: getTitlePrefix() + name + " | Status AIdvisor" };
}

export default async function ChatPageLayout({ children }: ChatPageLayoutProps) {
  return (
    <LandingLayout>
      {!inProdEnv && <FeaturesPanel />}
      {children}
    </LandingLayout>
  );
}
