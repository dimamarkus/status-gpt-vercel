import type { ExampleProduct } from '#/types/examples';
import { Ping } from '#/ui/examples/ping';
import { ProductEstimatedArrival } from '#/ui/examples/product-estimated-arrival';
import { ProductLowStockWarning } from '#/ui/examples/product-low-stock-warning';
import { ProductPrice } from '#/ui/examples/product-price';
import { ProductSplitPayments } from '#/ui/examples/product-split-payments';
import { ProductUsedPrice } from '#/ui/examples/product-used-price';
import { dinero, type DineroSnapshot } from 'dinero.js';
import { Suspense } from 'react';
import { AddToCart } from './add-to-cart';

function LoadingDots() {
  return (
    <div className="text-sm">
      <span className="space-x-0.5">
        <span className="inline-flex animate-[loading_1.4s_ease-in-out_infinite] rounded-full">
          &bull;
        </span>
        <span className="inline-flex animate-[loading_1.4s_ease-in-out_0.2s_infinite] rounded-full">
          &bull;
        </span>
        <span className="inline-flex animate-[loading_1.4s_ease-in-out_0.4s_infinite] rounded-full">
          &bull;
        </span>
      </span>
    </div>
  );
}

async function UserSpecificDetails({ productId }: { productId: string }) {
  const data = await fetch(
    `https://app-dir.vercel.app/api/products?id=${productId}&delay=500&filter=price,usedPrice,leadTime,stock`,
    {
      // We intentionally disable Next.js Cache to better demo
      // streaming
      cache: 'no-store',
    },
  );

  const product = (await data.json()) as ExampleProduct;

  const price = dinero(product.price as DineroSnapshot<number>);

  return (
    <>
      <ProductSplitPayments price={price} />
      {product.usedPrice ? (
        <ProductUsedPrice usedPrice={product.usedPrice} />
      ) : null}
      <ProductEstimatedArrival leadTime={product.leadTime} hasDeliveryTime />
      {product.stock <= 1 ? (
        <ProductLowStockWarning stock={product.stock} />
      ) : null}
    </>
  );
}

export function Pricing({
  product,
  cartCount,
}: {
  product: ExampleProduct;
  cartCount: string;
}) {
  const price = dinero(product.price as DineroSnapshot<number>);

  return (
    <div className="p-3 space-y-4 bg-gray-900 rounded-lg">
      <ProductPrice price={price} discount={product.discount} />

      <div className="relative">
        <div className="absolute top-1 -left-4">
          <Ping />
        </div>
      </div>

      <Suspense fallback={<LoadingDots />}>
        {/* @ts-expect-error Async Server Component */}
        <UserSpecificDetails productId={product.id} />
      </Suspense>

      <AddToCart initialCartCount={Number(cartCount)} />
    </div>
  );
}
