import { CommonSpacings } from "#/lib/types";

type TailwindSpacings = Exclude<CommonSpacings, "full">;
export const sizeMap: Record<TailwindSpacings, string> = {
  none: "0",
  xs: "2",
  sm: "4",
  md: "8",
  lg: "12",
  xl: "16",
};
