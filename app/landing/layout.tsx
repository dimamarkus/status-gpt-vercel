import { getTitlePrefix } from "#/app/metadata";
import { inProdEnv } from "#/lib/helpers/env-helpers";
import { fetchBot, fetchLandingPage } from "#/lib/helpers/request-helpers/makeCmsRequest";
import LandingLayout from "#/ui/atoms/layouts/LandingLayout/LandingLayout";
import FeaturesPanelButton from "#/ui/molecules/FeaturesPanel/FeaturesPanelButton";

type LandingPageLayoutProps = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
};

export const revalidate = 0;

export async function generateMetadata({ params }: LandingPageLayoutProps) {
  const landing = !!params.slug ? await fetchLandingPage(params.slug) : null;
  if (!landing) {
    return;
  }
  const { metaTitle, metaDescription } = landing.seo;
  return {
    title: metaTitle + " | Status AIdvisor",
    description: metaDescription,
  };
}

export default async function LandingPageLayout({ children }: LandingPageLayoutProps) {
  return (
    <LandingLayout>
      {!inProdEnv && <FeaturesPanelButton />}
      {children}
    </LandingLayout>
  );
}
