"use client";
import { OpenAiModel } from "#/app/chat/lib/types";
import {
  BooleanFeatures,
  SelectFeatures,
  useFeatureToggleContext,
} from "#/lib/contexts/FeatureToggleContext";
import { inDevEnv, inPreviewEnv, inProdEnv } from "#/lib/helpers/env-helpers";
import { capitalizeFirstLetter } from "#/lib/helpers/string-helpers";
import { useOutsideClick } from "#/lib/hooks/useOutsideClick";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import KeyValueList from "#/ui/atoms/lists/KeyValueList/KeyValueList";
import { Cog8ToothIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

type FeaturesPanelProps = {
  forceShow?: boolean;
  className?: string;
};

// const deploymentStats = [
//   { key: "Node Env", value: process.env.NODE_ENV },
//   { key: "Vercel Env", value: process.env.NEXT_PUBLIC_VERCEL_ENV },
//   { key: "Commit Ref", value: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF },
//   { key: "Commit Msg", value: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE },
//   { key: "isDev", value: inDevEnv && "✅" },
//   { key: "isPreview", value: inPreviewEnv && "✅" },
//   { key: "isProd", value: inProdEnv && "✅" },
// ];

const FeaturesPanel = (props: FeaturesPanelProps) => {
  const { forceShow, className } = props;
  const { toggleShowFeatures, areFeaturesShown, features, setFeatures } = useFeatureToggleContext();
  const handleSetFeature = (key: string, value: string | boolean) => {
    const newFeatures = { ...features, [key]: value };
    setFeatures(newFeatures);
  };

  const ref = useOutsideClick<HTMLDivElement>(() => toggleShowFeatures());

  const toggleButton = (
    <BaseButton
      // className="btn-ghost btn-square btn-sm btn relative opacity-30"
      className="relative opacity-50"
      theme="secondary"
      flavor="icon"
      onClick={() => toggleShowFeatures()}
      title={(!areFeaturesShown ? "Open" : "Close") + " Settings"}
      icon={!areFeaturesShown ? <Cog8ToothIcon /> : <XMarkIcon />}
    />
  );

  const getOptionCheckbox = (name: keyof BooleanFeatures, title?: string) => {
    const currentState = features[name];
    return (
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text uppercase text-base-100">{title}</span>
        <input
          id={name}
          name={name}
          type="checkbox"
          className="checkbox-primary checkbox"
          checked={currentState}
          onChange={(event) => handleSetFeature(name, !currentState)}
        />
      </label>
    );
  };

  const getOptionDropdown = (name: keyof SelectFeatures, options: string[]) => (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text uppercase text-base-100">{name}</span>
      </label>
      <select
        name={name}
        className="select-xs h-fit w-fit"
        value={features[name]}
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

  const getOptionRadio = (name: keyof SelectFeatures, options: OpenAiModel[]) => {
    const currentState = features[name];
    return options.map((option, i) => {
      return (
        <div className="form-control flex flex-col" key={i}>
          <label htmlFor={name + option} className="label">
            <span className="label-text uppercase text-base-100">{option}</span>
          </label>
          <input
            id={name + option}
            name={name}
            type="radio"
            className="radio-primary"
            value={option}
            checked={currentState === option}
            onChange={(event) => handleSetFeature(name, !!event.target.value && option)}
          />
        </div>
      );
    });
  };

  const darkMode = features.theme === "dark";
  return (
    <div className={clsx("flex flex-col ", className)}>
      <label htmlFor="darkMode" className="label cursor-pointer">
        <span className="label-text uppercase text-base-100">☀️</span>
        <input
          id="darkMode"
          name="darkMode"
          type="checkbox"
          className="toggle-primary toggle"
          checked={darkMode}
          onChange={(event) => handleSetFeature("theme", darkMode ? "light" : "dark")}
        />
        <span className="label-text uppercase text-base-100">🌙</span>
      </label>
      {/* {getOptionDropdown("theme", THEMES)} */}
      {/* {getOptionDropdown("layout", LAYOUTS)} */}
      {/* {getOptionDropdown("font", FONTS)} */}
      {/* {getOptionRadio("model", MODELS)} */}
      {getOptionCheckbox("useStream", "Stream")}
      {getOptionCheckbox("debugMode", "Debug")}
      {getOptionCheckbox("autoSubmitSpeech", "Auto-submit Speech")}
      {getOptionCheckbox("enableAssumptions", "Assumptions")}
      {getOptionCheckbox("enableSuggestions", "Suggestions")}
      {getOptionCheckbox("enableSubmissions", "Submissions")}
      {getOptionCheckbox("showTokens", "Show Tokens")}
      {/* <KeyValueList items={deploymentStats} /> */}
    </div>
  );
};

export default FeaturesPanel;
