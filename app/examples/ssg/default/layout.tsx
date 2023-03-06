import { RandomPostTab } from '#/app/examples/ssg/random-post-tab';
import { Tab } from '#/ui/examples/tab';
import React from 'react';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-9">
      <div className="flex flex-wrap items-center gap-2">
        <Tab path="/examples/ssg/default" item={{ text: 'Home' }} />
        <Tab
          path="/examples/ssg/default"
          item={{ text: 'Post 1', slug: '1' }}
        />
        <Tab
          path="/examples/ssg/default"
          item={{ text: 'Post 2', slug: '2' }}
        />
        <RandomPostTab path="/examples/ssg/default" />
      </div>
      <div>{children}</div>
    </div>
  );
}
