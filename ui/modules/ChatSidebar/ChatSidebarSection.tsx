import { SidebarState } from "#/app/chat/lib/hooks/useChatSidebar";
import { useConversationsContext } from "#/lib/contexts/ConversationContext";
import Duo from "#/ui/_base/Duo/Duo";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { FC } from "react";

type ChatSidebarSectionProps = {
  children: React.ReactNode;
  title: string;
  section: keyof SidebarState;
  className?: string;
};

export const ChatSidebarSection: FC<ChatSidebarSectionProps> = (props) => {
  const { children, title, section, className } = props;
  const {
    appState: { sidebar },
    appActions: { toggleSidebarSection },
  } = useConversationsContext();
  const isSectionOpen = sidebar[section];
  const inputName = `${section}-input`;
  const titleStyles = "collapse-title flex items-center text-xs font-medium py-1 p-0 min-h-0";
  return (
    <div className={clsx("collapse flex flex-col px-4 font-normal", className)}>
      <label htmlFor={inputName} className={titleStyles}>
        {title}
        <ChevronRightIcon
          width={12}
          height={12}
          className={clsx("animate-rotate ml-auto", isSectionOpen && "rotate-90")}
        />
      </label>
      <input
        id={inputName}
        type="checkbox"
        checked={isSectionOpen}
        onChange={() => toggleSidebarSection(section)}
        className="absolute h-4"
      />

      <div className="collapse-content flex h-full flex-col overflow-auto p-0">{children}</div>
    </div>
  );
};

export default ChatSidebarSection;
