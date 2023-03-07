import React from 'react';
import styles from './LandingLayout.module.scss';

type LandingLayoutProps = {
  children?: React.ReactNode;
};

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <body className={styles.LandingLayout + 'body-loading space-y-8'}>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center flex-1 w-full px-8 text-center shrink-0 sm:px-20">
          {children}
        </main>
      </div>
    </body>
  );
};
export default LandingLayout;
