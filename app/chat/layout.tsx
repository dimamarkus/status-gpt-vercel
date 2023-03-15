import { getResourceFieldsFromCms } from "#/lib/helpers/request-helpers/makeCmsRequest";
import { Bot } from "#/lib/types/cms";
import { TabGroup } from "#/ui/examples/tab-group";
import LandingLayout from "#/ui/layouts/LandingLayout/LandingLayout";

type StrapiPageProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: StrapiPageProps) {
  const botMenuResults = await getResourceFieldsFromCms<Bot>("bots", ["name", "slug"]);
  const botNames = botMenuResults.data || [];

  return (
    <LandingLayout data-theme="light">
      <TabGroup
        path="/chat"
        items={[
          ...botNames.map((bot) => ({
            text: `${bot.attributes.name}`,
            slug: bot.attributes.slug,
          })),
        ]}
      />
      {children}
    </LandingLayout>
  );
}
