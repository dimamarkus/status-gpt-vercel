"use client";
import {
  BooleanSettings,
  SelectSettings,
  useSettingsContext,
} from "#/lib/contexts/SettingsContext";
import { capitalizeFirstLetter } from "#/lib/helpers/string-helpers";
import LanguageSelect from "#/ui/atoms/inputs/LanguageSelect/LanguageSelect";
import clsx from "clsx";

type SettingsPanelProps = {
  forceShow?: boolean;
  className?: string;
};

const ChatSettings = (props: SettingsPanelProps) => {
  const { forceShow, className } = props;
  const { settings, setSettings } = useSettingsContext();

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
          className="checkbox-primary checkbox"
          checked={currentState}
          onChange={(event) => handleSetFeature(name, !currentState)}
        />
        <span className="label-text ml-4 text-left font-medium text-base-100">{title}</span>
      </label>
    );
  };

  const getOptionDropdown = (name: keyof SelectSettings, options: string[]) => (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text uppercase text-base-100">{name}</span>
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
    <div className={clsx("flex flex-col ", className)}>
      {getOptionCheckbox("darkMode", "Dark Mode")}
      {getOptionCheckbox("useStream", "Stream")}
      {getOptionCheckbox("autoSubmitSpeech", "Auto-submit Speech")}
      {getOptionCheckbox("sidebarRight", "Sidebar on the right")}
      <LanguageSelect />
    </div>
  );
};

export default ChatSettings;
