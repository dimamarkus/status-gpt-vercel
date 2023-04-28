import StatusLogo from "#/ui/atoms/svgs/StatusLogo";
import ABLTLogo from "#/ui/atoms/svgs/ABLTLogo";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { isBrainaics } from "#/lib/helpers/env-helpers"

type LogoProps = {
  children?: React.ReactNode;
};

export const Logo = (props: LogoProps) => {
  const companyName = isBrainaics ? (
    <>
      aBLT<span className="cyan-gradient-animation font-light">.ai</span>
    </>
  ) : (
    <>
      <span className="cyan-gradient-animation">AI</span>dvisor
    </>
  )
  return (
    <Link
      className={"flex h-auto flex-row items-center gap-2 p-0 py-1 text-left text-xl normal-case"}
      title="Go to homepage"
      href="/"
    >
      {/* { !isBrainaics && <StatusLogo className="text-slate-700 dark:text-slate-100" /> } */}
      <ABLTLogo className="text-slate-700 dark:text-slate-100 w-8" />
      <h1 className="logo m-0 text-2xl font-bold leading-6">
        {companyName}
        {/* <small className="display-block font-sans text-xs font-normal text-slate-400 "> BETA</small> */}
      </h1>
    </Link>
  );
};
export default Logo;
