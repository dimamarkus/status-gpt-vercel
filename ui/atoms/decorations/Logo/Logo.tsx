import StatusLogo from "#/ui/atoms/svgs/StatusLogo";
import Link from "next/link";
import React from "react";

type LogoProps = {
  children?: React.ReactNode;
};

export const Logo = (props: LogoProps) => {
  return (
    <Link
      className={"flex h-auto flex-col items-start p-0 py-1 text-left text-xl normal-case"}
      title="Visit statusmoney.com"
      href="https://statusmoney.com"
    >
      <StatusLogo className="text-slate-700 dark:text-slate-100" />
      <h1 className="logo m-0 font-serif text-2xl font-bold leading-6">
        <span className="cyan-gradient-animation">AI</span>dvisor
        <small className="display-block font-sans text-xs font-normal text-slate-400 "> BETA</small>
      </h1>
    </Link>
  );
};
export default Logo;
