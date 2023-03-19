import { getActiveProductsWithPrices } from "#/lib/helpers/supabase-helpers/supabase-server";
import Pricing from "#/ui/examples/supabase/Pricing";
import LandingLayout from "#/ui/atoms/layouts/LandingLayout/LandingLayout";

export const revalidate = 60;

export default async function PricingPage() {
  const products = await getActiveProductsWithPrices();
  return (
    <LandingLayout>
      <Pricing products={products} />
    </LandingLayout>
  );
}
