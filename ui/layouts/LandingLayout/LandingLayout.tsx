import TopBar from '#/ui/molecules/TopBar/TopBar';
import BaseLayout from '#/ui/_base/BaseLayout/BaseLayout';
import React from 'react';
import styles from './LandingLayout.module.scss';

type LandingLayoutProps = {
  children?: React.ReactNode;
};

export const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <BaseLayout>
      <div
        className={
          styles.LandingLayout + ' ' + 'drawer-content m-auto w-full max-w-6xl'
        }
      >
        <TopBar />
        <main role="main">
          <div className="chat-container flex h-full max-h-full flex-col">
            {children}
          </div>
        </main>
      </div>
    </BaseLayout>
  );
};
export default LandingLayout;
