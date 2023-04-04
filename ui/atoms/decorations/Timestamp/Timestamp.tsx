"use client";

import { getCurrentTime } from "#/lib/helpers/datetime-helpers";
import clsx from "clsx";
import { useEffect, useState } from "react";

type TimestampProps = {
  /**
   * The time to display. If not provided, the current time will be displayed.
   */
  time?: string;
  className?: string;
};

export const Timestamp = ({ time, className }: TimestampProps) => {
  const [clientTime, setClientTime] = useState<string | undefined>(undefined);

  useEffect(() => {
    setClientTime(getCurrentTime());
  }, []);

  return (
    <time className={clsx("flex items-end text-xs opacity-50", className)}>
      {time || clientTime}
    </time>
  );
};
export default Timestamp;
