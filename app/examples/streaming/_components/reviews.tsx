import type { ExampleReview } from '#/types/examples';
import { ProductReviewCard } from '#/ui/examples/product-review-card';

export async function Reviews({ data }: { data: Promise<Response> }) {
  const reviews = (await data.then((res) => res.json())) as ExampleReview[];

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium text-white">Customer Reviews</div>
      <div className="space-y-8">
        {reviews.map((review) => {
          return <ProductReviewCard key={review.id} review={review} />;
        })}
      </div>
    </div>
  );
}

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;

function Skeleton() {
  return (
    <div className="space-y-4">
      <div className="w-2/6 h-6 bg-gray-900 rounded-lg" />
      <div className="w-1/6 h-4 bg-gray-900 rounded-lg" />
      <div className="w-full h-4 bg-gray-900 rounded-lg" />
      <div className="w-4/6 h-4 bg-gray-900 rounded-lg" />
    </div>
  );
}

export function ReviewsSkeleton() {
  return (
    <div className="space-y-6">
      <div className={`h-7 w-2/5 rounded-lg bg-gray-900 ${shimmer}`} />

      <div className="space-y-8">
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
}
