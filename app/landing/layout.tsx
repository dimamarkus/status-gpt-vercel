import { inProdEnv } from "#/lib/helpers/env-helpers";
import { SITE_TITLE } from "#/lib/constants/settings"
import { fetchLandingPage } from "#/lib/databases/cms";
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
    title: metaTitle + ` | ${SITE_TITLE}`,
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
