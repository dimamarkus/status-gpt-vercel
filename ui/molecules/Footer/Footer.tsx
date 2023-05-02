import BaseButton from '#/ui/_base/BaseButton/BaseButton';
import React from 'react';

type FooterProps = {
  children?: React.ReactNode;
};

export const Footer = ({children}: FooterProps) => {

  return (
    <footer className="flex w-full text-center justify-center mb-4 text-neutral-500 text-xs opacity-75 hover:opacity-100 transition">
      Powered by&nbsp;
      <BaseButton href="https://ablt.ai" text="aBLT.ai" flavor="bare" />
    </footer>
  )
};

export default Footer;