import { ConversationsDataState } from "#/app/chat/lib/reducer";
import { useConversationsContext } from "#/lib/contexts/ConversationContext";
import { ClearConversations } from "#/ui/modules/ChatSidebar/ClearConversations";
import { Import } from "#/ui/modules/ChatSidebar/Import";
import { SidebarButton } from "#/ui/modules/ChatSidebar/SidebarButton";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "next-i18next";
import { FC } from "react";
interface Props {
  conversationsCount: number;
  onClearConversations: () => void;
  onExportConversations: () => void;
}

export const SidebarSettings: FC<Props> = ({
  conversationsCount,
  onClearConversations,
  onExportConversations,
}) => {
  const { appActions, dataActions } = useConversationsContext();
  const { t } = useTranslation("sidebar");

  const handleImportConversations = (data: ConversationsDataState) => {
    const { rootConversations, folders } = data;
    const rootConversation = rootConversations[rootConversations.length - 1];
    const nestedConversation = folders[0]?.conversations[0];
    dataActions.setConversations(data);
    appActions.selectConversation(rootConversation || nestedConversation);
  };

  return (
    <div className="mt-auto flex flex-col items-center space-y-1 border-t border-neutral-500/20 pt-1 text-sm">
      {conversationsCount > 0 ? (
        <ClearConversations onClearConversations={onClearConversations} />
      ) : null}

      <Import onImport={handleImportConversations} />

      <SidebarButton
        text={t("Export conversations")}
        icon={<ArrowDownTrayIcon width={18} height={18} />}
        onClick={() => onExportConversations()}
      />
    </div>
  );
};
