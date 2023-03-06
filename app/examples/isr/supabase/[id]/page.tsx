import { createServerSideSupabase } from '#/lib/supabase-server';
import { notFound } from 'next/navigation';

// Cache this page for 10 seconds (revalidate after)
export const revalidate = 10;

// During revalidation, generateStaticParams will not be called again.
export async function generateStaticParams() {
  const supabase = createServerSideSupabase();
  const response = await supabase.from('products').select('id');
  const products = response.data;

  if (response.error) {
    throw new Error(response.error.message);
  }

  if (!products) {
    notFound();
  }

  // Generates all products at build time
  return products.map(({ id }) => ({
    id,
  }));
}

export default async function Product({
  params: { id },
}: {
  params: { id: string };
}) {
  const supabase = createServerSideSupabase();
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
