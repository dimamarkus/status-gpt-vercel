"use client";
import { useEffect, useState } from "react";

import { clientSideSupabase } from "#/lib/helpers/supabase-helpers/supabase-client";

// realtime subscriptions need to be set up client-side
// this component takes initial products as props and automatically
// updates when new products are inserted into Supabase's `products` table
export default function RealtimeProducts({ serverProducts }: { serverProducts: any }) {
  const [products, setProducts] = useState(serverProducts);

  useEffect(() => {
    // this overwrites `products` any time the `serverProducts` prop changes
    // this happens when the parent Server Component is re-rendered
    setProducts(serverProducts);
  }, [serverProducts]);

  useEffect(() => {
    // ensure you have enabled replication on the `products` table
    // https://app.supabase.com/project/_/database/replication
    const channel = clientSideSupabase
      .channel("*")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "products" }, (payload) =>
        setProducts((products: any) => [...products, payload.new]),
      )
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "products" }, (payload) =>
        setProducts((products: any) => [...products, payload.new]),
      )
      .subscribe();

    return () => {
      clientSideSupabase.removeChannel(channel);
    };
  }, [serverProducts]);

  return <pre>{JSON.stringify(products, null, 2)}</pre>;
}
