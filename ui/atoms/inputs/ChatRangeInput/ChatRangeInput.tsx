import clsx from "clsx";
import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import styles from "./ChatRangeInput.module.scss";

export type ChatRangeInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  currentValue: number;
  min?: number;
  max: number;
  /**
   * If you're using react-hook-form, you can pass in the register function
   */
  register?: UseFormRegister<TFormValues>;
  children?: React.ReactNode;
  className?: string;
};

export const ChatRangeInput = <TFormValues extends Record<string, any>>(
  props: ChatRangeInputProps<TFormValues>,
): JSX.Element => {
  const steps = [1, 2, 3];
  const { register, name, min = 25, max, currentValue, className } = props;
  const fieldProps = register
    ? register(name)
    : {
        name: name,
        value: currentValue,
      };
  const stepSize = (max - min) / (steps.length - 1);

  const getStepLabel = () => {
    if (currentValue == min) {
      return "Short and sweet";
    } else if (currentValue == max) {
      return "Detailed";
    }
    return "Balanced";
  };

  return (
    <label
      htmlFor={name}
      className={clsx(
        "mx-auto mb-4 flex w-1/2 cursor-pointer flex-col md:mb-2 md:w-1/4",
        className,
      )}
    >
      <small className="font-regular mb-2 hidden text-center text-slate-400 md:block">
        Response Length
      </small>
      <input
        id={name}
        type="range"
        min={min}
        max={max}
        className="range range-secondary range-sm opacity-25"
        step={stepSize}
        {...fieldProps}
      />
      <div className="pointer-events-none -mb-4 flex w-full justify-between px-1 text-xs">
        {steps.map((i) => (
          <div
            key={i}
            className="relative -top-4 mx-[2px] mt-[1.5px] flex h-2 w-2 rounded-full bg-primary/25"
          />
        ))}
      </div>
      <div className="mx-auto mt-3 self-center text-xs font-medium text-primary">
        {getStepLabel()}
      </div>
    </label>
  );
};
export default ChatRangeInput;
