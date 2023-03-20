// .storybook/manager.js

import { addons } from "@storybook/manager-api";
import React from "react";

const rootPrefixMap: Record<string, string> = {
  _base: "◇",
  atoms: "◆",
  molecules: "❖",
  organisms: "💠",
  modules: "🧩",
};

const renderLabel = (label: string) => {
  const prefix = rootPrefixMap[label];
  return prefix ? (
    <span>
      {prefix} {label}
    </span>
  ) : (
    <span>{label}</span>
  );
};

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: "bottom",
  enableShortcuts: true,
  showToolbar: true,
  theme: undefined,
  selectedPanel: undefined,
  initialActive: "sidebar",
  sidebar: {
    showRoots: true,
    collapsedRoots: ["_base", "atoms", "molecules", "modules"],
    renderLabel: (item: { name: string }) => renderLabel(item.name),
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
