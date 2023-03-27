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
};

export const ChatRangeInput = <TFormValues extends Record<string, any>>(
  props: ChatRangeInputProps<TFormValues>,
): JSX.Element => {
  const steps = [1, 2, 3];
  const { register, name, min = 25, max, currentValue } = props;
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
      className="mx-auto mb-4 flex w-1/2 cursor-pointer flex-col md:mb-2 md:w-1/4"
    >
      <small className="font-regular pb-1 text-center text-primary">Response Length</small>
      <input
        id={name}
        type="range"
        min={min}
        max={max}
        className="range range-primary range-sm opacity-75 focus:opacity-50"
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
      <div className="mx-auto -mt-1 hidden self-center text-xs font-medium text-slate-400 md:mt-3 md:block">
        {getStepLabel()}
      </div>
    </label>
  );
};
export default ChatRangeInput;
