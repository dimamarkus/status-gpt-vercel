import React from "react";
import styles from "./ChatMessageBubble.module.scss";

type ChatMessageBubbleProps = {
  children?: React.ReactNode;
};

export const ChatMessageBubble = (props: ChatMessageBubbleProps) => {
  const { children = "My new component" } = props;
  const innerChild = <div>{children}</div>;

  return <div className={styles.ChatMessageBubble + " " + "flex"}>{innerChild}</div>;
};
export default ChatMessageBubble;
