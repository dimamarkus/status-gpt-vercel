import { getTitlePrefix } from "#/app/metadata";
import { fetchLandingPage } from "#/lib/databases/cms";
import { LandingPage, PageSection } from "#/lib/types/cms";
import BlurbSection from "#/ui/modules/LandingPages/BlurbSection/BlurbSection";
import FooterSection from "#/ui/modules/LandingPages/FooterSection/FooterSection";
import HeroSection from "#/ui/modules/LandingPages/HeroSection/HeroSection";
import { MediaSection } from "#/ui/modules/LandingPages/MediaSection/MediaSection";
import { RichTextSection } from "#/ui/modules/LandingPages/RichTextSection/RichTextSection";
import { TeamSection } from "#/ui/modules/LandingPages/TeamSection/TeamSection";
import { TestimonialsSection } from "#/ui/modules/LandingPages/TestimonialsSection/TestimonialsSection";
import { SITE_TITLE } from "#/lib/constants/settings"

export type LandingPagePageProps = {
  params: {
    slug: LandingPage["slug"];
  };
  searchParams: {
    query: string;
  };
};

export const revalidate = 0;
// export const runtime = "edge";

export async function generateMetadata({ params }: LandingPagePageProps) {
  // TODO - see if fetches are cached and switch to fetchLandingPages() to save on page call
  const landingPage = await fetchLandingPage(params.slug);
  const name = landingPage?.title || "aBLT Chat";
  return { title: getTitlePrefix() + name + ` | ${SITE_TITLE}` };
}

// export async function generateStaticParams() {
//   const response = await getResourceFieldsFromCms<LandingPage>("landingPages", ["name", "slug"]);
//   const landingPages = response.data;
//   return landingPages.map((landingPage) => ({
//     slug: landingPage.attributes.slug,
//   }));
// }

async function getData(slug: string) {
  return await fetchLandingPage(slug);
}

export default async function LandingPagePage({ params, searchParams }: LandingPagePageProps) {
  const landingPage = await getData(params.slug);
  const { title, hero_section, sections } = landingPage;

  const SECTION_COMPONENT_MAP: Record<PageSection["__component"], (props: any) => JSX.Element> = {
    "sections.blurb-section": BlurbSection,
    "sections.footer-section": FooterSection,
    "sections.media-section": MediaSection,
    "sections.rich-text-section": RichTextSection,
    "sections.team-section": TeamSection,
    "sections.testimonials-section": TestimonialsSection,
    "sections.hero-section": HeroSection,
  };

  return (
    <>
      <h1>{title}</h1>
      <HeroSection {...hero_section} />
      {sections.map((section, index) => {
        const SectionComponent = SECTION_COMPONENT_MAP[section.__component];
        return <SectionComponent key={index} {...section} />;
      })}
    </>
  );
}
