import { inProdEnv } from "#/lib/helpers/env-helpers";
import { getResourcesFromCms } from "#/lib/helpers/request-helpers/makeCmsRequest";
import { getBotAvatar } from "#/lib/helpers/url-helpers";
import { Bot } from "#/lib/types/cms";
import ChatMessageAvatar from "#/ui/modules/Chat/ChatMessageAvatar/ChatMessageAvatar";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

export const revalidate = 0;

type ChatBotSelectProps = {
  featuredOnly?: boolean;
  selectedSlug: string | null;
};

export function ChatBotSelect({ featuredOnly, selectedSlug }: ChatBotSelectProps) {
  const [bots, setBots] = useState<Bot[]>([]);

  useEffect(() => {
    getResourcesFromCms<Bot>("bots", undefined, true).then((res) => {
      if (res?.data) {
        const bots = res.data.map((bot) => bot.attributes);
        setBots(bots);
      }
    });
  }, []);

  const botOptions = bots.filter((bot) => (inProdEnv ? bot.is_featured : true));

  return (
    <nav className="flex flex-col">
      {botOptions.map(
        (botOption) =>
          botOption.slug !== selectedSlug && (
            <Link
              key={botOption.slug}
              href={`/chat/${botOption.slug}`}
              title={botOption.name}
              className={clsx("flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100")}
            >
              <ChatMessageAvatar avatarUrl={getBotAvatar(botOption, true)} />
              <div className="ml-2 flex flex-col">
                <span className="text-sm font-medium">{botOption.name}</span>
                <span className="text-xs text-gray-500">{botOption.description}</span>
              </div>
            </Link>
          ),
      )}
    </nav>
  );
}

export default ChatBotSelect;
