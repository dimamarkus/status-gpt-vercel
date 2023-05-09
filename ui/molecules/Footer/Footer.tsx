import BaseButton from '#/ui/_base/BaseButton/BaseButton';
import clsx from 'clsx';
import React from 'react';

type FooterProps = {
  className?: string
};

export const Footer = ({className}: FooterProps) => {

  return (
    <footer className={ clsx("flex w-full text-neutral-500 text-xs opacity-75 hover:opacity-100 transition relative z-0", className) }>
      Powered by&nbsp;
      <BaseButton href="https://ablt.ai" text="aBLT.ai" flavor="bare" />
    </footer>
  )
};

export default Footer;