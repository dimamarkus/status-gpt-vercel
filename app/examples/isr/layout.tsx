import { Tab } from '#/ui/examples/tab';
import React from 'react';

export const metadata = {
  title: 'Incremental Static Regeneration (ISR)',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-9">
      <div className="flex flex-wrap items-center gap-2">
        <Tab path="/examples/ssg" item={{ text: 'Home' }} />
        <Tab
          path="/examples/isr/"
          item={{ text: 'Default', slug: 'default' }}
        />
        <Tab
          path="/examples/isr/"
          item={{ text: 'Supabase', slug: 'supabase' }}
        />
      </div>
      <div>{children}</div>
    </div>
  );
}
