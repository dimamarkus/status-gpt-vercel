import React from 'react';

export const metadata = {
  title: 'Realtime with Supabase',
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const ids = [{ id: '1' }, { id: '2' }, { id: '3' }];

  return (
    <div className="space-y-9">
      {/* <TabGroup
        path="/examples/ssr/realtime"
        items={[
          {
            text: 'Home',
          },
          ...ids.map((x) => ({
            text: `Post ${x.id}`,
            slug: x.id,
          })),
        ]}
      /> */}
      <div>{children}</div>
    </div>
  );
}
