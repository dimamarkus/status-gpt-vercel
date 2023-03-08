'server-only';

import { createServerSideSupabase } from '#/lib/supabase-server';
import { RenderingInfo } from '#/ui/_examples/rendering-info';
import { notFound } from 'next/navigation';

// do not cache this page
export const revalidate = 0;

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createServerSideSupabase();
  const { data: product } = await supabase
    .from('products')
    .select()
    .match({ id: params.id })
    .single();

  if (!product) {
    notFound();
  }

  return (
    <div className="grid grid-cols-6 gap-x-6 gap-y-3">
      <div className="col-span-full space-y-3 lg:col-span-4">
        <h1 className="truncate text-2xl font-medium capitalize text-gray-200">
          {product.name}
        </h1>
        <p className="font-medium text-gray-500">
          <pre>{JSON.stringify(product, null, 2)}</pre>
        </p>
      </div>
      <div className="-order-1 col-span-full lg:order-none lg:col-span-2">
        <RenderingInfo type="ssr" />
      </div>
    </div>
  );
}
