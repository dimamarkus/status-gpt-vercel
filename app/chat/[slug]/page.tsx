import { notFound } from "next/navigation";
("server-only");
import { filterResourceFromCms } from "#/lib/helpers/request-helpers/makeCmsRequest";
import { Bot } from "#/types/cms";
import { RenderingInfo } from "#/ui/examples/rendering-info";

// do not cache this page
export const revalidate = 0;

async function getData(slug: string) {
  return filterResourceFromCms<Bot>("bots", "slug", slug);
}

type StrapiPageProps = {
  params: {
    slug: keyof Bot["attributes"];
  };
};

export default async function Page({ params }: StrapiPageProps) {
  const response = await getData(params.slug);
  const bot = response.data[0];

  if (!bot) {
    return notFound();
  }

  return (
    <div className="grid grid-cols-6 gap-x-6 gap-y-3">
      <div className="col-span-full space-y-3 lg:col-span-4">
        <h1 className="truncate text-2xl font-medium capitalize">{bot.attributes.name}</h1>
        <div className="font-medium text-gray-500">
          <pre>{JSON.stringify(bot, null, 2)}</pre>
        </div>
      </div>
      <div className="-order-1 col-span-full lg:order-none lg:col-span-2">
        <RenderingInfo type="ssr" />
      </div>
    </div>
  );
}
