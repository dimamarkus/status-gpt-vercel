import { DEFAULT_SIDEBAR } from '#/lib/constants/settings';
import { useFeatureToggleContext } from '#/lib/contexts/FeatureToggleContext';
import { useFullScreenContext } from '#/lib/contexts/FullScreenContext';
import { useSidebarContext } from '#/lib/contexts/SidebarContext';
import FeaturesPanel from '#/ui/molecules/FeaturesPanel/FeaturesPanel';
import React from 'react';

type BaseLayoutProps = {
  children?: React.ReactNode;
  className?: string;
};

export const BaseLayout = ({ children, className = '' }: BaseLayoutProps) => {
  const { sidebar } = useSidebarContext();
  const { features } = useFeatureToggleContext();
  const { isFullScreen, toggleFullScreen } = useFullScreenContext();
  const globalFont = 'font-' + features.font;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      isFullScreen && toggleFullScreen();
    }
  };

  return (
    <body
      className={'drawer drawer-end' + ' ' + globalFont + ' ' + className}
      data-theme={features.theme}
      onKeyDown={handleKeyDown}
    >
      <FeaturesPanel />
      <input id={DEFAULT_SIDEBAR} type="checkbox" className="drawer-toggle" />
      {children}
      <aside className="drawer-side">
        <label htmlFor={DEFAULT_SIDEBAR} className="drawer-overlay">
          Close
        </label>
        {sidebar}
      </aside>
    </body>
  );
};
export default BaseLayout;
