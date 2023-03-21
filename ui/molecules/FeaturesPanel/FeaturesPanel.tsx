"use client";
import { OpenAiModel } from "#/app/chat/lib/openai";
import { Features, useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { inDevEnv, inProdEnv, inPreviewEnv } from "#/lib/helpers/env-helpers";
import { capitalizeFirstLetter } from "#/lib/helpers/string-helpers";
import { useOutsideClick } from "#/lib/hooks/useOutsideClick";
import Button from "#/ui/atoms/buttons/Button/Button";
import KeyValueList from "#/ui/atoms/lists/KeyValueList/KeyValueList";
import Duo from "#/ui/_base/Duo/Duo";

const deploymentStats = [
  { key: "Node Env", value: process.env.NODE_ENV },
  { key: "Vercel Env", value: process.env.NEXT_PUBLIC_VERCEL_ENV },
  { key: "Commit Ref", value: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF },
  { key: "Commit Msg", value: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE },
  { key: "isDev", value: inDevEnv && "✅" },
  { key: "isPreview", value: inPreviewEnv && "✅" },
  { key: "isProd", value: inProdEnv && "✅" },
];

const FeaturesPanel = () => {
  const { toggleShowFeatures, areFeaturesShown, features, setFeatures } = useFeatureToggleContext();
  const handleSetFeature = (key: string, value: string | boolean) => {
    const newFeatures = { ...features, [key]: value };
    setFeatures(newFeatures);
  };

  const ref = useOutsideClick(() => toggleShowFeatures());

  const toggleButton = (
    <Button
      className="btn-ghost btn-square btn-sm btn relative opacity-30"
      onClick={() => toggleShowFeatures()}
      title={(!areFeaturesShown ? "Enter" : "Exit") + " Full-screen"}
      text={!areFeaturesShown ? "⚙️" : "❌"}
    />
  );

  if (!areFeaturesShown) {
    return <div className="absolute top-0 left-0 z-10">{toggleButton}</div>;
  }

  const getOptionCheckbox = (name: "debugMode" | "useStream", title?: string) => {
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

  const getOptionDropdown = (
    name: keyof Omit<Features, "debugMode" | "useStream">,
    options: string[],
  ) => (
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

  const getOptionRadio = (name: "model", options: OpenAiModel[]) => {
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
  const menu = areFeaturesShown && (
    <div className="absolute top-0 left-0 z-0 flex flex-col gap-4 rounded-br-md bg-neutral-300/[85%] p-8 pt-4 pl-10 dark:bg-black/75">
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
      {getOptionCheckbox("useStream", "Stream?")}
      {getOptionCheckbox("debugMode", "Debug?")}
      <KeyValueList items={deploymentStats} />
    </div>
  );

  return (
    <div className="absolute top-0 left-0 z-10 w-96" ref={ref}>
      {menu}
      {toggleButton}
    </div>
  );
};

export default FeaturesPanel;
