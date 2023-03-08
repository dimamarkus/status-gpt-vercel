'use client';

import { RenderingInfo } from '#/ui/examples/rendering-info';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page({ params }: { params: { id: string } }) {
  const url = `https://jsonplaceholder.typicode.com/posts/${params.id}`;
  const { data, error, isLoading } = useSWR(url, fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div className="grid grid-cols-6 gap-x-6 gap-y-3">
      <div className="col-span-full space-y-3 lg:col-span-4">
        <h1 className="truncate text-2xl font-medium capitalize text-gray-200">
          {data.title}
        </h1>
        <p className="font-medium text-gray-500 line-clamp-3">{data.body}</p>
      </div>
      <div className="-order-1 col-span-full lg:order-none lg:col-span-2">
        <RenderingInfo type="spa" />
      </div>
    </div>
  );
}
