import { getTitlePrefix } from "#/app/metadata";
import { fetchBots } from "#/lib/databases/cms";
import { inProdEnv } from "#/lib/helpers/env-helpers";
import LandingLayout from "#/ui/atoms/layouts/LandingLayout/LandingLayout";
import FeaturesPanelButton from "#/ui/molecules/FeaturesPanel/FeaturesPanelButton";
import { DEFAULT_CHAT_BOT, SITE_TITLE } from "#/lib/constants/settings";
import { ChatContextProvider } from "#/lib/contexts/ChatContext";

type ChatPageLayoutProps = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
};

export const revalidate = 0;

export async function generateMetadata({ params }: ChatPageLayoutProps) {
  const bots = await fetchBots();
  const bot = bots.find((bot) => bot.slug === params.slug);
  const name = bot?.name || "AIdvisor Chat";
  return { title: getTitlePrefix() + name + ` | ${SITE_TITLE}` };
}

export default async function ChatPageLayout({ children }: ChatPageLayoutProps) {
  const bots = await fetchBots();
  const selectedBot = bots.find((bot) => bot.slug === DEFAULT_CHAT_BOT) || bots[0];

  return (
    <ChatContextProvider bot={selectedBot}>
      <LandingLayout>
        {!inProdEnv && <FeaturesPanelButton />}
        {children}
      </LandingLayout>
    </ChatContextProvider>
  );
}
