"use client";

import { motion } from "framer-motion";
import React from "react";
import useMeasure from "react-use-measure";
import styles from "./ResizablePanel.module.scss";

type ResizablePanelProps = {
  children?: React.ReactNode;
};

export const ResizablePanel = (props: ResizablePanelProps) => {
  const { children } = props;
  let [ref, { height }] = useMeasure();

  return (
    <motion.div
      className={styles.root + " " + "relative w-full overflow-hidden"}
      animate={height ? { height } : {}}
      style={height ? { height } : {}}
      transition={{ type: "tween", duration: 0.5 }}
    >
      <div ref={ref} className={height ? "absolute inset-x-0" : "relative"}>
        {children}
      </div>
    </motion.div>
  );
};
export default ResizablePanel;
