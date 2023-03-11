import React from "react";
import { createServerSideSupabase } from "#/lib/helpers/supabase-helpers/supabase-server";
import { TabGroup } from "#/ui/examples/tab-group";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = createServerSideSupabase();
  const response = await supabase.from("products").select();
  const products = response.data;

  if (response.error) {
    throw new Error(response.error.message);
  }

  if (!products) {
    return <p>No products found.</p>;
  }

  return (
    <div className="space-y-9">
      <TabGroup
        path="/examples/ssg/supabase"
        items={[
          {
            text: "Home",
          },
          ...products.map((product) => ({
            text: `Product ${product.name}`,
            slug: product.id,
          })),
        ]}
      />
      <div>{children}</div>
    </div>
  );
}
