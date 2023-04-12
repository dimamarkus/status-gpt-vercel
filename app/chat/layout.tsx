import { getTitlePrefix } from "#/app/metadata";
import { inProdEnv } from "#/lib/helpers/env-helpers";
import { fetchBot } from "#/lib/databases/cms";
import LandingLayout from "#/ui/atoms/layouts/LandingLayout/LandingLayout";
import FeaturesPanelButton from "#/ui/molecules/FeaturesPanel/FeaturesPanelButton";

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
      {!inProdEnv && <FeaturesPanelButton />}
      {children}
    </LandingLayout>
  );
}
