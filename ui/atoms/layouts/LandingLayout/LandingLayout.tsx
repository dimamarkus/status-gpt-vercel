import TopBar from '#/ui/molecules/TopBar/TopBar';
import React from 'react';
import styles from './LandingLayout.module.scss';

type LandingLayoutProps = {
  children?: React.ReactNode;
};

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <body className={styles.LandingLayout + 'body-loading space-y-8'}>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <main className="flex w-full flex-1 shrink-0 flex-col items-center justify-center px-8 text-center sm:px-20">
          <TopBar />
          {children}
        </main>
      </div>
    </body>
  );
};
export default LandingLayout;
