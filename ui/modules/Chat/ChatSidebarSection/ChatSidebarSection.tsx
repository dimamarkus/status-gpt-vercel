import { SidebarState } from "#/app/chat/lib/hooks/useChatSidebar";
import { useChatContext } from "#/lib/contexts/ChatContext";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import styles from "./ChatSidebarSection.module.scss";
import clsx from "clsx";
import { FC } from "react";

type ChatSidebarSectionProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  /**
  * Slug by which the state of the section can be found
  */
  section: keyof SidebarState;
  /**
  * Will this section expand on click or is always open if false
  */
  expandable?: boolean;
  /**
  * Will this section shrink in order to make room for other sections
  */
  shrinkable?: boolean;
  /**
  * Uses webkit fill available to fill the height of the parent
  */
  fillHeight?: boolean;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
};

export const ChatSidebarSection: FC<ChatSidebarSectionProps> = (props) => {
  const { children, title, section, expandable = true, fillHeight, shrinkable, className, contentClassName, titleClassName } = props;
  const {
    appState: { sidebar },
    appActions: { toggleSidebarSection },
  } = useChatContext();

  const isSectionOpen = sidebar[section];
  const inputName = `${section}-input`;
  const titleStyles = clsx(
    "collapse-title flex text-xs p-4 bg-white/20 dark:bg-black/10 min-h-0 flex-shrink-0 hover:bg-white/50",
    titleClassName,
  )
  const contentStyles = clsx(
    "collapse-content flex h-full flex-col px-4 peer-checked:p-4 transition-all duration-300 overflow-y-auto overflow-x-clip",
    styles.content,
    contentClassName
  )
  const rootStyles = clsx(
    "collapse flex flex-col font-normal bg-white/20 dark:bg-black/10",
    "border-b border-black/5 dark:border-white/5",
    "shadow-[0_-3px_5px_rgba(0,0,0,0.12), 0_-3px_5px_rgba(0,0,0,0.19)]",
    shrinkable ? "flex-shrink" : "flex-shrink-0",
    fillHeight && isSectionOpen && styles.fillHeight,
    className,
  );

  const label = expandable ? (
    <label htmlFor={inputName} className={titleStyles}>
      {title}
      <ChevronRightIcon
        width={12}
        height={12}
        className={clsx("animate-rotate ml-auto flex-shrink-0", isSectionOpen && "rotate-90")}
      />
    </label>
  ) : (
    <label className={titleStyles}>{title}</label>
  );
  return (
    <section className={rootStyles}>
      {label}
      <input
        id={inputName}
        type="checkbox"
        checked={isSectionOpen || !expandable}
        onChange={() => toggleSidebarSection(section)}
        className="absolute h-4 peer"
      />
      <div className={contentStyles}>{children}</div>
    </section>
  );
};

export default ChatSidebarSection;
