import { getTitlePrefix } from "#/app/metadata";
import { fetchBots, fetchGlobalSettings } from "#/lib/databases/cms";
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

async function getData() {
  const bots = await fetchBots();
  const globalSettings = await fetchGlobalSettings();
  return { bots, globalSettings }
}

export default async function ChatPageLayout({ children, params }: ChatPageLayoutProps) {
  const { globalSettings, bots } = await getData();
  const selectedBot = bots.find((bot) => bot.slug === params.slug) || bots[0];

  return (
    <ChatContextProvider bot={selectedBot}>
      <LandingLayout globalSettings={ globalSettings }>
        {!inProdEnv && <FeaturesPanelButton />}
        {children}
      </LandingLayout>
    </ChatContextProvider>
  );
}
