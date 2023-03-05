import { Tab } from '#/ui/examples/tab';
import React from 'react';
import { RandomPostTab } from './random-post-tab';

export const metadata = {
  title: 'Static Site Generation (SSG)',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-9">
      <div className="flex flex-wrap items-center gap-2">
        <Tab path="/examples/ssg" item={{ text: 'Home' }} />
        <Tab path="/examples/ssg" item={{ text: 'Post 1', slug: '1' }} />
        <Tab path="/examples/ssg" item={{ text: 'Post 2', slug: '2' }} />
        <RandomPostTab path="/examples/ssg" />
      </div>

      <div>{children}</div>
    </div>
  );
}
