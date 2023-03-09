import React from "react";
import styles from "./ChatAssumptions.module.scss";

type ChatAssumptionsProps = {
  children?: React.ReactNode;
};

export const ChatAssumptions = (props: ChatAssumptionsProps) => {
  const { children = "My new component" } = props;
  const innerChild = <div>{children}</div>;

  return <div className={styles.ChatAssumptions + " " + "flex"}>{innerChild}</div>;
};
export default ChatAssumptions;
