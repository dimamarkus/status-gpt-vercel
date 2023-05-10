import { ResponseLength, useSettingsContext } from "#/lib/contexts/SettingsContext";
import { isMobile } from "#/lib/hooks/useIsMobile";
import clsx from "clsx";
import React from "react";

export type ChatRangeInputProps = {
  children?: React.ReactNode;
  className?: string;
};

export const ChatRangeInput = (props: ChatRangeInputProps): JSX.Element => {
  const { className } = props;
  const { settings, setSettings } = useSettingsContext();
  const currentValue = settings.responseLength;

  const getStepLabel = () => {
    if (currentValue == 1) {
      return "Short and sweet";
    } else if (currentValue == 3) {
      return "Detailed";
    }
    return "Balanced";
  };

  const cycleThroughValues = () => {
    if (currentValue === 1) {
      setSettings({ ...settings, responseLength: 2 });
    } else if (currentValue == 2) {
      setSettings({ ...settings, responseLength: 3 });
    } else {
      setSettings({ ...settings, responseLength: 1 });
    }
  };

  const inputClasses = clsx(
    "h-2 w-full cursor-pointer appearance-none rounded bg-gradient-to-r from-blue-200/50 via-blue-300/50 to-blue-400/50  outline-none",
    "dark:from-slate-700 dark:via-slate-800 dark:to-slate-900"
  )

  return (
    <label
      htmlFor="responseLength"
      className={clsx(
        "mx-auto mb-4 flex w-1/2 cursor-pointer flex-col md:mb-2 md:w-1/4",
        className,
      )}
    >
      <small
        className="font-regular mb-2 hidden text-center text-slate-400 md:block"
        onClick={cycleThroughValues}
      >
        Response Length
      </small>
      <input
        name="responseLength"
        id="responseLength"
        title="Select how long you'd like the bot's reponse to be"
        type="range"
        min={1}
        max={3}
        className={inputClasses}
        step={1}
        value={currentValue}
        onChange={({ target }) => {
          setSettings({
            ...settings,
            responseLength: parseInt(target.value, 10) as ResponseLength,
          });
        }}
      />
      <div className="pointer-events-none -mb-4 flex w-full justify-between px-1 text-xs">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="relative -top-4 mx-[2px] mt-[8px] flex h-2 w-2 rounded-full bg-primary/25"
          />
        ))}
      </div>
      <div className="mx-auto mt-3 self-center text-xs font-medium text-primary" onClick={ isMobile() ? cycleThroughValues : undefined}>
        {getStepLabel()}
      </div>
    </label>
  );
};
export default ChatRangeInput;
