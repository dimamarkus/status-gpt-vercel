import React from "react";
import { getResourcesFromCms } from "#/lib/helpers/request-helpers/makeCmsRequest";
import { Bot } from "#/types/cms";
import { TabGroup } from "#/ui/examples/tab-group";
import LandingLayout from "#/ui/layouts/LandingLayout/LandingLayout";

export const metadata = {
  title: "Strapi Test",
};

async function getData(slug: string) {
  return getResourcesFromCms<Bot>("bots");
}

type StrapiPageProps = {
  children: React.ReactNode;
  params: {
    slug: Bot["attributes"]["slug"];
  };
};

export default async function Layout({ children, params }: StrapiPageProps) {
  const response = await getData(params.slug);
  const bots = response.data;

  if (!bots) {
    return <p>No bots found.</p>;
  }

  return (
    <LandingLayout>
      <div className="space-y-9">
        <TabGroup
          path="/chat"
          items={[
            {
              text: "Home",
            },
            ...bots.map((bot) => ({
              text: `Bot ${bot.attributes.name}`,
              slug: bot.attributes.slug,
            })),
          ]}
        />
        <div>{children}</div>
      </div>
    </LandingLayout>
  );
}
