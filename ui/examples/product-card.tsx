import { ExampleProduct } from '#/types/examples';
import { ProductBestSeller } from '#/ui/examples/product-best-seller';
import { ProductEstimatedArrival } from '#/ui/examples/product-estimated-arrival';
import { ProductLowStockWarning } from '#/ui/examples/product-low-stock-warning';
import { ProductPrice } from '#/ui/examples/product-price';
import { ProductRating } from '#/ui/examples/product-rating';
import { ProductUsedPrice } from '#/ui/examples/product-used-price';
import { dinero, type DineroSnapshot } from 'dinero.js';
import Image from 'next/image';
import Link from 'next/link';

export const ProductCard = ({
  product,
  href,
}: {
  product: ExampleProduct;
  href: string;
}) => {
  const price = dinero(product.price as DineroSnapshot<number>);

  return (
    <Link href={href} className="block group">
      <div className="space-y-2">
        <div className="relative">
          {product.isBestSeller ? (
            <div className="absolute z-10 flex top-2 left-2">
              <ProductBestSeller />
            </div>
          ) : null}
          <Image
            src={`/${product.image}`}
            width={400}
            height={400}
            className="rounded-xl grayscale group-hover:opacity-80"
            alt={product.name}
            placeholder="blur"
            blurDataURL={product.imageBlur}
          />
        </div>

        <div className="text-sm font-medium text-white truncate group-hover:text-vercel-cyan">
          {product.name}
        </div>

        {product.rating ? <ProductRating rating={product.rating} /> : null}

        <ProductPrice price={price} discount={product.discount} />

        {/* <ProductSplitPayments price={price} /> */}

        {product.usedPrice ? (
          <ProductUsedPrice usedPrice={product.usedPrice} />
        ) : null}

        <ProductEstimatedArrival leadTime={product.leadTime} />

        {product.stock <= 1 ? (
          <ProductLowStockWarning stock={product.stock} />
        ) : null}
      </div>
    </Link>
  );
};
