import { fetchCategories } from '#/lib/examples/get-categories';
import { ClickCounter } from '#/ui/examples/click-counter';
import { TabGroup } from '#/ui/examples/tab-group';
import React from 'react';

export const metadata = {
  title: 'Nested Layouts',
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await fetchCategories();
  return (
    <div className="space-y-9">
      <div className="flex justify-between">
        <TabGroup
          path="/examples/layouts"
          items={[
            {
              text: 'Home',
            },
            ...categories.map((x) => ({
              text: x.name,
              slug: x.slug,
            })),
          ]}
        />

        <div className="self-start">
          <ClickCounter />
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}
