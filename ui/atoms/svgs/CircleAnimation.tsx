"use client";

import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import clsx from "clsx";

export const CircleAnimation = ({ className = "", ...props }) => {
  const {
    features: { darkMode },
  } = useFeatureToggleContext();

  const colors = darkMode
    ? {
        fill: "var(--merlot-900)",
        fill1: "var(--oxford-800)",
        fill2: "var(--merlot-900)",
        fill3: "var(--oxford-900)",
        fill4: "var(--merlot-800)",
        stroke1: "var(--merlot-800)",
        stroke2: "var(--oxford-700)",
        stroke3: "var(--merlot-700)",
        stroke4: "var(--oxford-800)",
      }
    : {
        fill: "var(--coral-100)",
        fill1: "var(--coral-300)",
        fill2: "var(--merlot-200)",
        fill3: "var(--coral-200)",
        fill4: "var(--merlot-100)",
        strokd3: "var(--coral-500)",
        stroke1: "var(--coral-400)",
        stroke2: "var(--coral-500)",
        stroke4: "var(--merlot-500)",
      };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMin slice"
      viewBox="24 105 156 95"
      className={clsx(className, "bg-black")}
      {...props}
    >
      <rect
        x="0"
        y="0"
        width="300"
        height="300"
        fill={colors.fill}
        opacity={darkMode ? ".25" : "1"}
      />
      <path
        className="circles-top-outer"
        fill={colors.fill1}
        stroke={colors.stroke1}
        strokeWidth="1"
        opacity={darkMode ? ".5" : "1"}
        d="M68 1c23,0 67,17 69,39 4,38 5,52 -5,69 -20,36 -68,46 -120,-9 -27,-28 -7,-101 56,-99z"
      />
      <path
        className="circles-top-inner"
        fill={colors.fill2}
        stroke={colors.stroke2}
        strokeWidth="1"
        opacity={darkMode ? ".5" : "1"}
        d="M69 22c33,-7 52,21 54,37 3,26 -1,28 -8,40 -15,25 -48,25 -85,-14 -19,-20 -4,-53 39,-63z"
      />
      <path
        className="circles-bottom-outer"
        fill={colors.fill3}
        stroke={colors.stroke3}
        strokeWidth="1"
        opacity={darkMode ? ".5" : "1"}
        d="M158 158c30,13 56,50 44,75 -9,18 -22,46 -42,55 -20,10 -48,2 -73,-19 -29,-25 -27,-55 -9,-79 17,-22 43,-48 80,-32z"
      />
      <path
        className="circles-bottom-inner"
        fill={colors.fill4}
        stroke={colors.stroke4}
        strokeWidth="1"
        opacity={darkMode ? ".5" : "1"}
        d="M136 180c32,-9 45,13 46,29 3,27 8,29 0,42 -14,25 -52,24 -79,0 -21,-18 -2,-61 33,-71z"
      />
    </svg>
  );
};

export default CircleAnimation;
