"use client";
import {
  BooleanSettings,
  SelectSettings,
  useSettingsContext,
} from "#/lib/contexts/SettingsContext";
import { capitalizeFirstLetter } from "#/lib/helpers/string-helpers";
import SidebarButton from "#/ui/atoms/buttons/SidebarButton/SidebarButton";
import LanguageSelect from "#/ui/atoms/inputs/LanguageSelect/LanguageSelect";
import clsx from "clsx";
import Import from "../ChatConversations/Import";
import Clear from "../ChatConversations/Clear";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import { useChatContext } from "#/lib/contexts/ChatContext";
import { ConversationsDataState } from "#/app/chat/lib/reducer";

type SettingsPanelProps = {
  forceShow?: boolean;
  className?: string;
};

const ChatSettings = (props: SettingsPanelProps) => {
  const { forceShow, className } = props;
  const { settings, setSettings } = useSettingsContext();
  const {
    appActions: { selectConversation },
    dataState: { folders, rootConversations },
    dataActions: {
      resetFolders,
      exportConversations,
      setConversations,
    },
  } = useChatContext();

  const handleImportConversations = (data: ConversationsDataState) => {
    const rootConversation = data.rootConversations[data.rootConversations.length - 1];
    const nestedConversation = data.folders[0]?.conversations[0];
    setConversations(data);
    selectConversation(rootConversation || nestedConversation);
  };

  const handleSetFeature = (key: string, value: string | boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
  };

  const getOptionCheckbox = (name: keyof BooleanSettings, title?: string) => {
    const currentState = settings[name];
    return (
      <label htmlFor={name} className="mb-4 cursor-pointer text-sm">
        <input
          id={name}
          name={name}
          type="checkbox"
          className="checkbox-primary checkbox scale-75 dark:bg-base-300 border-secondary"
          checked={currentState}
          onChange={(event) => handleSetFeature(name, !currentState)}
        />
        <span className="label-text ml-4 text-left text-[12.5px] leading-3 font-light text-neutral-content">
          {title}
        </span>
      </label>
    );
  };

  const getOptionDropdown = (name: keyof SelectSettings, options: string[]) => (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text uppercase text-base-100 dark:text-white">{name}</span>
      </label>
      <select
        name={name}
        className="select-xs h-fit w-fit"
        value={settings[name]}
        onChange={(event) => handleSetFeature(name, event.target.value)}
      >
        {options.map((option: string, i: number) => (
          <option key={i} value={option}>
            {capitalizeFirstLetter(option)}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <footer className={clsx("flex flex-col pl-1 ", className)}>
      {/* {getOptionCheckbox("darkMode", "Dark Mode")} */}
      {/* {getOptionCheckbox("sidebarRight", "Sidebar Right")} */}
      {getOptionCheckbox("enableSuggestions", "Suggest questions")}
      {/* {getOptionCheckbox("useStream", "Stream Responses")} */}
      {getOptionCheckbox("autoSubmitSpeech", "Submit speech on release")}
      <div className="mt-auto mb-4 flex flex-col space-y-1 border-y border-neutral-500/20 text-sm ">
        {(rootConversations.length || folders.length) > 0 ? <Clear onClear={resetFolders} /> : null}
        <Import onImport={handleImportConversations} />
        <SidebarButton
          text="Export conversations"
          icon={<ArrowDownTrayIcon width={18} height={18} />}
          onClick={exportConversations}
        />
      </div>
      <LanguageSelect />
    </footer>
  );
};

export default ChatSettings;
