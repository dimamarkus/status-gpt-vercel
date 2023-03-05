import { fetchCategoryBySlug } from '#/lib/examples/get-categories';
import { Boundary } from '#/ui/examples/boundary';
import { TabGroup } from '#/ui/examples/tab-group';
import { notFound } from 'next/navigation';
import { Counter } from '../context-click-counter';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { categorySlug: string };
}) {
  const category = await fetchCategoryBySlug(params.categorySlug);
  if (!category) notFound();

  return (
    <Boundary labels={['Layout [Server Component]']} animateRerendering={false}>
      <div className="space-y-9">
        <TabGroup
          path={`/examples/context/${category.slug}`}
          items={[
            {
              text: 'All',
            },
            ...category.items.map((x) => ({
              text: x.name,
              slug: x.slug,
            })),
          ]}
        />
        <Counter />
        <div>{children}</div>
      </div>
    </Boundary>
  );
}
