import { getActiveProductsWithPrices } from '#/lib/supabase-client';
import LandingLayout from '#/ui/atoms/layouts/LandingLayout/LandingLayout';
import Pricing from '#/ui/examples/supabase/Pricing';

export const revalidate = 60;

export default async function PricingPage() {
  const products = await getActiveProductsWithPrices();
  return (
    <LandingLayout>
      <Pricing products={products} />
    </LandingLayout>
  );
}
