import React from "react";
import LandingLayout from "#/ui/layouts/LandingLayout/LandingLayout";
import { FeatureToggleContextProvider } from "#/lib/contexts/FeatureToggleContext";
import { TabGroup } from "#/ui/examples/tab-group";
import { getResourceFieldsFromCms } from "#/lib/helpers/request-helpers/makeCmsRequest";
import { Bot } from "#/lib/types/cms";

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
