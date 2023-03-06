export type Item = {
  name: string;
  slug: string;
  description?: string;
};

export const demos: { name: string; items: Item[] }[] = [
  {
    name: 'Layouts',
    items: [
      {
        name: 'Nested Layouts',
        slug: 'layouts',
        description: 'Create UI that is shared across routes',
      },
      {
        name: 'Grouped Layouts',
        slug: 'route-groups',
        description: 'Organize routes without affecting URL paths',
      },
    ],
  },
  {
    name: 'File Conventions',
    items: [
      {
        name: 'Loading',
        slug: 'loading',
        description:
          'Create meaningful Loading UI for specific parts of an app',
      },
      {
        name: 'Error',
        slug: 'error-handling',
        description: 'Create Error UI for specific parts of an app',
      },
      {
        name: 'Not Found',
        slug: 'not-found',
        description: 'Create Not Found UI for specific parts of an app',
      },
    ],
  },
  {
    name: 'Data Fetching',
    items: [
      {
        name: 'Realtime with Supabase',
        slug: 'realtime',
        description:
        'Realtime responding to data changes on the Supabase database',
      },
      {
        name: 'Server-Side Rendering (SSR)',
        slug: 'ssr',
        description: 'Server-render pages',
      },
      {
        name: 'Single Page App (SPA)',
        slug: 'spa',
        description:
        'Client side rendering with data fetching from the client',
      },
      {
        name: 'Static-Site Generation (SSG)',
        slug: 'ssg',
        description: 'Generate static pages',
      },
      {
        name: 'Static-site Regeneratiom (ISR)',
        slug: 'isr',
        description: 'Get the best of both worlds between static & dynamic',
      },
      {
        name: 'Streaming with Suspense',
        slug: 'streaming',
        description:
          'Streaming data fetching from the server with React Suspense',
      },
    ],
  },
  {
    name: 'Components',
    items: [
      // TODO: Re-add this page once hooks have been updated.
      // {
      //   name: 'Hooks',
      //   slug: 'hooks',
      //   description:
      //     'Preview the hooks available for Client and Server Components',
      // },
      {
        name: 'Client Context',
        slug: 'context',
        description:
          'Pass context between Client Components that cross Server/Client Component boundary',
      },
    ],
  },
  {
    name: 'Misc',
    items: [
      {
        name: 'CSS and CSS-in-JS',
        slug: 'styling',
        description: 'Preview the supported styling solutions',
      },
      {
        name: 'Code Snippets',
        slug: 'snippets',
        description: 'A collection of useful App Router code snippets',
      },
    ],
  },
];
