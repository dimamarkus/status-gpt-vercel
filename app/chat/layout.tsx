import { getTitlePrefix } from "#/app/metadata";
import { fetchBots } from "#/lib/databases/cms";
import { inProdEnv } from "#/lib/helpers/env-helpers";
import LandingLayout from "#/ui/atoms/layouts/LandingLayout/LandingLayout";
import FeaturesPanelButton from "#/ui/molecules/FeaturesPanel/FeaturesPanelButton";
import { SITE_TITLE } from "#/lib/constants/settings";

type ChatPageLayoutProps = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
};

export const revalidate = 0;

export async function generateMetadata({ params }: ChatPageLayoutProps) {
  const bots = await fetchBots();
  const bot = bots.find((bot) => bot.slug === params.slug);
  const name = bot?.name || "AIdvisor Chat";
  return { title: getTitlePrefix() + name + ` | ${SITE_TITLE}` };
}

export default async function ChatPageLayout({ children }: ChatPageLayoutProps) {
  return (
    <LandingLayout>
      {!inProdEnv && <FeaturesPanelButton />}
      {children}
    </LandingLayout>
  );
}
