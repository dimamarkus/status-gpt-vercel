import { createServerSideSupabase } from '#/lib/supabase-server';
import { notFound } from 'next/navigation';

//! TODO - Remove this once the error below is fixed
export const dynamic = 'force-static';

// This function is what makes this statically generated and not just server rendered.
// https://supabase.com/blog/fetching-and-caching-supabase-data-in-next-js-server-components#static
export async function generateStaticParams() {
  //! TODO - figure out how to generate these params statically
  //! This causes an error: Error: Invariant: Method expects to have requestAsyncStorage, none available
  //! https://github.com/vercel/next.js/issues/46356
  // const supabase = createServerSideSupabase();
  // const response = await supabase.from('products').select('id');
  // const products = response.data;
  // if (response.error) {
  //   throw new Error(response.error.message);
  // }
  // if (!products) {
  //   notFound();
  // }
  // // Generates all products at build time
  // return products.map(({ id }) => ({
  //   id,
  // }));
  return [];
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
