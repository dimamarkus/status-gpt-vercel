import { SidebarState } from "#/app/chat/lib/hooks/useChatSidebar";
import { useChatContext } from "#/lib/contexts/ChatContext";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { FC } from "react";

type ChatSidebarSectionProps = {
  title: string;
  children: React.ReactNode;
  // Slug by which the state of the section can be found
  section: keyof SidebarState;
  // Will this section expand on click or is always open if false
  expandable?: boolean;
  // Will this section shrink in order to make room for other sections
  shrinkable?: boolean;
  className?: string;
};

export const ChatSidebarSection: FC<ChatSidebarSectionProps> = (props) => {
  const { children, title, section, expandable = true, shrinkable, className } = props;
  const {
    appState: { sidebar },
    appActions: { toggleSidebarSection },
  } = useChatContext();

  const isSectionOpen = sidebar[section];
  const inputName = `${section}-input`;
  const titleStyles = "collapse-title flex items-center text-xs p-2 min-h-0 hover:bg-white/50 rounded rounded-b-none";
  const contentStyles = "collapse-content flex h-full flex-col p-0 px-2";
  const rootStyles = clsx(
    "collapse flex flex-col px-2 font-normal",
    shrinkable ? "flex-shrink" : "flex-shrink-0",
    className,
  );

  const label = expandable ? (
    <label htmlFor={inputName} className={titleStyles}>
      {title}
      <ChevronRightIcon
        width={12}
        height={12}
        className={clsx("animate-rotate ml-auto", isSectionOpen && "rotate-90")}
      />
    </label>
  ) : (
    <label className={titleStyles}>{title}</label>
  );
  return (
    <section className={rootStyles}>
      {label}
      {expandable && (
        <input
          id={inputName}
          type="checkbox"
          checked={isSectionOpen}
          onChange={() => toggleSidebarSection(section)}
          className="absolute h-4"
        />
      )}
      <div className={contentStyles}>{children}</div>
    </section>
  );
};

export default ChatSidebarSection;
