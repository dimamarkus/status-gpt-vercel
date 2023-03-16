import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./Logo.module.scss";

type LogoProps = {
  children?: React.ReactNode;
};

export const Logo = (props: LogoProps) => {
  return (
    <Link
      className={"flex h-auto flex-col items-start p-0 py-1 text-left text-xl normal-case"}
      href="/"
    >
      <Image
        className="relative -left-1 h-3 max-h-full w-auto max-w-full"
        src="/logo-cyan.svg"
        alt="Status Money Logo"
        width={"0"}
        height={0}
        priority
      />
      <h1 className="logo m-0 font-serif text-2xl font-bold">
        <span className="boujee-text">AI</span>dvisor
        <small className="font-sans text-xs text-neutral-400"> BETA</small>
      </h1>
    </Link>
  );
};
export default Logo;
