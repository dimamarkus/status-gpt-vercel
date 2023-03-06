'server-only';

import { createSupabaseClient } from '#/lib/supabase-server';
import { RenderingInfo } from '#/ui/examples/rendering-info';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createSupabaseClient();
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
      <div className="space-y-3 col-span-full lg:col-span-4">
        <h1 className="text-2xl font-medium text-gray-200 capitalize truncate">
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
