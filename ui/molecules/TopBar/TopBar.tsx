import Link from "#/ui/atoms/Link/Link";
import Logo from "#/ui/atoms/decorations/Logo/Logo";
import Hamburger from "#/ui/atoms/svgs/Hamburger";
import Spinner from "#/ui/atoms/svgs/Spinner";
import DarkModeToggle from "#/ui/molecules/actionButtons/DarkModeToggleButton/DarkModeToggleButton";
import AuthButtons from "#/ui/molecules/buttonGroups/AuthButtons/AuthButtons";
import { Suspense } from "react";

const navItems = (
  <>
    {/* <li>
      <a href="https://statusmoney.com/about">About</a>
    </li>
    <li>
      <a href="https://statusmoney.com/feed">Feed</a>
    </li>
    <li>
      <a href="https://statusmoney.com/coaching">Coaching</a>
    </li>
    <li>
      <a href="https://statusmoney.com/card">Card</a>
    </li> */}
    {/* <li>
        <Link
          type="primary"
          href="https://statusmoney.com/onboarding/register"
          className="text-primary"
          text="Join Status"
        />
      </li> */}
    <li>
      <Link
        // className="btn-sm mx-4 w-28 px-2 md:btn-md md:w-32"
        // type="primary"
        text="About"
        title="Learn about Status Money's work with AI"
        href={"/landing/flexie"}
      />
    </li>
  </>
);

const TopBar = () => {
  const mobileMenu = (
    <div className="dropdown">
      <label tabIndex={0} className="btn-ghost btn lg:hidden">
        <Hamburger />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
      >
        {navItems}
      </ul>
    </div>
  );
  return (
    <header className="z-1 navbar relative md:py-4 md:px-0">
      <div className="navbar-start w-full">
        {mobileMenu}
        <Logo />
        <ul className="menu menu-horizontal ml-4 px-1">{navItems}</ul>
      </div>
      <Suspense fallback={<Spinner />}>
        <AuthButtons className="navbar-end" />
      </Suspense>
      <DarkModeToggle className="ml-2" />
    </header>
  );
};

export default TopBar;
