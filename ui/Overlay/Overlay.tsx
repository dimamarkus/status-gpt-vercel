import React from "react";
import styles from "./Overlay.module.scss";

type OverlayProps = {
  children?: React.ReactNode;
};

export const Overlay = (props: OverlayProps) => {
  const { children = "My new component" } = props;
  const innerChild = <div>{children}</div>;

  // #overlay {
  //   position: fixed; /* Sit on top of the page content */
  //   display: none; /* Hidden by default */
  //   width: 100%; /* Full width (cover the whole page) */
  //   height: 100%; /* Full height (cover the whole page) */
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   background-color: rgba(0,0,0,0.5); /* Black background with opacity */
  //   z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  //   cursor: pointer; /* Add a pointer on hover */
  // }

  return <div className={styles.Overlay + " " + "flex"}>{innerChild}</div>;
};
export default Overlay;
