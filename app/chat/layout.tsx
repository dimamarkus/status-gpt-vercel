import React from "react";
import { getResourceFieldsFromCms } from "#/lib/helpers/request-helpers/makeCmsRequest";
import { Bot } from "#/lib/types/cms";
import { TabGroup } from "#/ui/examples/tab-group";
import LandingLayout from "#/ui/layouts/LandingLayout/LandingLayout";

export const metadata = {
  title: "AIdvisor Chat",
};

type StrapiPageProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: StrapiPageProps) {
  const response = await getResourceFieldsFromCms<Bot>("bots", ["name", "slug"]);
  const bots = response.data;

  if (!bots) {
    return <p>No bots found.</p>;
  }

  return (
    <LandingLayout ssr data-theme="light">
      <div className="space-y-9">
        <TabGroup
          path="/chat"
          items={[
            {
              text: "Home",
            },
            ...bots.map((bot) => ({
              text: `${bot.attributes.name}`,
              slug: bot.attributes.slug,
            })),
          ]}
        />
        <div>{children}</div>
      </div>
    </LandingLayout>
  );
}
