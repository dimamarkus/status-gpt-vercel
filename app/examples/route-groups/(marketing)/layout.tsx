import { fetchCategories } from '#/lib/examples/get-categories';
import { Boundary } from '#/ui/examples/boundary';
import { ClickCounter } from '#/ui/examples/click-counter';
import { TabGroup } from '#/ui/examples/tab-group';
import React from 'react';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await fetchCategories();
  return (
    <Boundary
      labels={['marketing layout']}
      color="violet"
      animateRerendering={false}
    >
      <div className="space-y-9">
        <div className="flex justify-between">
          <TabGroup
            path="/examples/route-groups"
            items={[
              {
                text: 'Home',
              },
              ...categories.map((x) => ({
                text: x.name,
                slug: x.slug,
              })),
              { text: 'Checkout', slug: 'checkout' },
              { text: 'Blog', slug: 'blog' },
            ]}
          />

          <div className="self-start">
            <ClickCounter />
          </div>
        </div>

        <div>{children}</div>
      </div>
    </Boundary>
  );
}
