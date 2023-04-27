import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import BaseLink from "#/ui/_base/BaseLink/BaseLink";
import Logo from "#/ui/atoms/decorations/Logo/Logo";
import Hamburger from "#/ui/atoms/svgs/Hamburger";
import Spinner from "#/ui/atoms/svgs/Spinner";
import DarkModeToggle from "#/ui/molecules/actionButtons/DarkModeToggleButton/DarkModeToggleButton";
import AuthButtons from "#/ui/molecules/buttonGroups/AuthButtons/AuthButtons";
import { Suspense } from "react";

const navItems = (
  <ul className="menu menu-horizontal items-center space-x-8 px-8">
    <li>
      <BaseLink
        text="About"
        title="Learn about Status Money's work with AI"
        href={"/landing/flexie"}
      />
    </li>
    <li>
      <BaseButton
        text="Create"
        title="Learn about Status Money's work with AI"
        href={"/bots/create"}
      />
    </li>
  </ul>
);

const TopBar = () => {
  const mobileMenu = (
    <div className="dropdown">
      <label tabIndex={0} className="btn-ghost btn lg:hidden">
        <Hamburger />
      </label>
      {/* <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
      >
        {navItems}
      </ul> */}
    </div>
  );
  return (
    <header className="z-1 navbar relative md:px-0 md:py-4">
      <div className="navbar-start w-full">
        {mobileMenu}
        <Logo />
        {/* {navItems} */}
      </div>
      {/* <Suspense fallback={<Spinner />}> */}
        {/* @ts-expect-error Server Component */}
        {/* <AuthButtons className="navbar-end" /> */}
      {/* </Suspense> */}
      <DarkModeToggle className="ml-2" />
    </header>
  );
};

export default TopBar;
