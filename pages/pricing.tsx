import { getActiveProductsWithPrices } from '#/lib/supabase-client';
import Pricing from '#/ui/examples/supabase/Pricing';
import { GetStaticPropsResult } from 'next';
import { StripeProduct } from 'types/stripe';

interface Props {
  products: StripeProduct[];
}

export default function PricingPage({ products }: Props) {
  return <Pricing products={products} />;
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const products = await getActiveProductsWithPrices();

  return {
    props: {
      products,
    },
    revalidate: 60,
  };
}
