import { CommonSizes, CommonSpacings } from "#/lib/types";

type TailwindSpacings = Exclude<CommonSpacings, "full">;
export const sizeMap: Record<TailwindSpacings, string> = {
  none: "0",
  xs: "2",
  sm: "4",
  md: "8",
  lg: "12",
  xl: "16",
};

export const iconSizeMap: Record<CommonSizes, string> = {
  xs: "3",
  sm: "4",
  md: "5",
  lg: "6",
  xl: "7",
};
