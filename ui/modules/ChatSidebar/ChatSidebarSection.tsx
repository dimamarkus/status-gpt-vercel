import { SidebarState } from "#/app/chat/lib/hooks/useChatSidebar";
import { useConversationsContext } from "#/lib/contexts/ConversationContext";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { FC } from "react";

type ChatSidebarSectionProps = {
  children: React.ReactNode;
  title: string;
  section: keyof SidebarState;
  className?: string;
  expandable?: boolean;
};

export const ChatSidebarSection: FC<ChatSidebarSectionProps> = (props) => {
  const { children, title, section, expandable = true, className } = props;
  const {
    appState: { sidebar },
    appActions: { toggleSidebarSection },
  } = useConversationsContext();
  const isSectionOpen = sidebar[section];
  const inputName = `${section}-input`;
  const titleStyles = "collapse-title flex items-center text-xs py-1 p-0 min-h-0";
  return expandable ? (
    <section className={clsx("collapse flex flex-col px-4 font-normal", className)}>
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
    </section>
  ) : (
    <div className={clsx("collapse flex flex-col px-4 font-normal", className)}>
      <label className={titleStyles}>{title}</label>
      <div className="collapse-content flex h-full flex-col overflow-auto p-0">{children}</div>
    </div>
  );
};

export default ChatSidebarSection;
