import { createSupabaseClient } from '#/lib/supabase-server';
import { notFound } from 'next/navigation';

// This function is what makes this statically generated and not just server rendered.
// https://supabase.com/blog/fetching-and-caching-supabase-data-in-next-js-server-components#static
export async function generateStaticParams() {
  const supabase = createSupabaseClient();
  const { data: products } = await supabase.from('products').select('id');

  // Generates all pages at build time
  return products?.map(({ id }) => ({
    id,
  }));
}

export default async function Product({
  params: { id },
}: {
  params: { id: string };
}) {
  const supabase = createSupabaseClient();
  const { data: product } = await supabase
    .from('products')
    .select()
    .match({ id })
    .single();

  if (!product) {
    notFound();
  }

  return <pre>{JSON.stringify(product, null, 2)}</pre>;
}
