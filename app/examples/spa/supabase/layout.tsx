"use client";

import React, { useEffect, useState } from "react";
import { clientSideSupabase } from "#/lib/helpers/supabase-helpers/supabase-client";
import { Product } from "#/types/db";
import { TabGroup } from "#/ui/examples/tab-group";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[] | null>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await clientSideSupabase.from("products").select();

      if (response.error) {
        throw new Error(response.error.message);
      }

      setProducts(response.data);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  if (!products) {
    return <p>No products found.</p>;
  }

  return isLoading ? (
    <p>Loading..</p>
  ) : (
    <div className="space-y-9">
      <TabGroup
        path="/examples/spa/supabase"
        items={[
          {
            text: "Home",
          },
          ...products.map((product) => ({
            text: `Product ${product.name}`,
            slug: product.id,
          })),
          {
            text: "Non-existant Product",
            slug: "prod_idontexit",
          },
        ]}
      />
      <div>{children}</div>
    </div>
  );
}
