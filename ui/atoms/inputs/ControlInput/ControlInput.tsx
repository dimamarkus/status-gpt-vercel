import styles from "./ControlInput.module.scss";
import { ChangeEvent, useState, WheelEvent } from "react";
import { useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

type ControlInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  hint?: string;
  type?: "number" | "currency";
  initialValue?: number;
  min: number;
  max: number;
};

const ControlInput = (props: ControlInputProps) => {
  const { name, label, placeholder, hint, initialValue, min, max } = props;
  const { register, setValue, watch } = useFormContext();
  const { onChange, ref, ...inputProps } = register(name);
  const fieldValue = watch(name);
  const [rangeValue, setRangeValue] = useState(fieldValue);
  const updateAllValues = (value: number) => {
    setRangeValue(value);
    setValue(name, value);
  };
  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const result = parseInt(event.target.value, 10);
    updateAllValues(result);
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const result = parseInt(event.target.value, 10);
    updateAllValues(result);
  };

  const hintChild = !!hint ? <p className="text-xs italic text-red-500">{hint}</p> : null;

  const moveSlider = (e: WheelEvent<HTMLDivElement>) => {
    // e.preventPropagation();
    const wheelDelta = e.nativeEvent ? e.nativeEvent.deltaY : 0;
    let zoomLevel = fieldValue;
    const interval = (max - min) / 100;
    const finalInterval = interval < zoomLevel ? (max - min) / 100 : 10;
    // detect positive or negative scrolling
    if (wheelDelta > 0) {
      //scroll down
      zoomLevel = zoomLevel - finalInterval;
    } else if (wheelDelta < 0) {
      //scroll up
      zoomLevel = zoomLevel + finalInterval;
    }
    const isValueWithinBounds = zoomLevel > min && zoomLevel < max;
    // trigger the change event
    return isValueWithinBounds && updateAllValues(zoomLevel);
  };

  return (
    <div className={"flex w-full flex-col" + " " + styles.root} onWheel={moveSlider}>
      <NumericFormat
        prefix="$"
        inputMode="decimal"
        thousandSeparator
        decimalScale={2}
        placeholder={placeholder}
        maxLength={12}
        className="peer input-bordered input input-sm w-full max-w-xs pb-8 focus:bg-base-100"
        {...inputProps}
        value={rangeValue}
      />
      <input
        className="range range-primary range-xs"
        type="range"
        min={min}
        max={max}
        value={rangeValue}
        onChange={handleRangeChange}
      />
      <label className="label order-first">
        <span className="label-text text-blue-900">{label}</span>
      </label>
      {hintChild}
    </div>
  );
};

export default ControlInput;
