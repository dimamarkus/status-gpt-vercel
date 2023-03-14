import { notFound } from "next/navigation";
import { createChatBotMessage } from "#/app/chat/lib/helpers/chat-helpers";
import { collateBotTraining } from "#/app/chat/lib/helpers/training-helpers";
import {
  filterResourceFromCms,
  getResourceFieldsFromCms,
} from "#/lib/helpers/request-helpers/makeCmsRequest";
import { getMediaUrl } from "#/lib/helpers/url-helpers";
import { Bot } from "#/lib/types/cms";
import { RenderingInfo } from "#/ui/examples/rendering-info";
import ChatMessages from "#/ui/modules/Chat/ChatMessages/ChatMessages";

type BotPageProps = {
  params: {
    slug: keyof Bot;
  };
};

export async function generateStaticParams() {
  const response = await getResourceFieldsFromCms<Bot>("bots", ["name", "slug"]);
  const bots = response.data;
  return bots.map((bot) => ({
    slug: bot.attributes.slug,
  }));
}

export default async function Page({ params }: BotPageProps) {
  const botResults = await filterResourceFromCms<Bot>("bots", "slug", params.slug);
  const bot = botResults.data[0];

  if (!botResults || !bot?.attributes) {
    return notFound();
  }
  const { avatar, name, welcome_message } = bot.attributes;

  const trainingContent = collateBotTraining(bot.attributes);
  const trainingMessage = createChatBotMessage(trainingContent);

  return (
    <>
      <div className="grid grid-cols-6 gap-x-6 gap-y-3">
        <div className="col-span-full space-y-3 lg:col-span-4">
          <h1 className="truncate text-2xl font-medium capitalize">{name}</h1>
          <ChatMessages
            botAvatarUrl={!!avatar?.data ? getMediaUrl(avatar.data.attributes.url) : undefined}
            className="h-full"
            messages={[trainingMessage, createChatBotMessage(welcome_message || "")]}
            // currentResponse={streamedAnswer || error}
            // responseLoading={loading}
          />
        </div>
        <div className="-order-1 col-span-full lg:order-none lg:col-span-2">
          <RenderingInfo type="ssg" />
          <div className="font-medium text-gray-500">
            {/* <pre>{JSON.stringify(bot, null, 2)}</pre> */}
          </div>
        </div>
      </div>
    </>
  );
}
