'use client';

import { getActiveProductsWithPrices } from '#/lib/supabase-client';
import Pricing from '#/ui/examples/supabase/Pricing';
import LandingLayout from '#/ui/layouts/LandingLayout/LandingLayout';

export const revalidate = 60;

export default async function PricingPage() {
  const products = await getActiveProductsWithPrices();
  return (
    <LandingLayout>
      <Pricing products={products} />
    </LandingLayout>
  );
}
