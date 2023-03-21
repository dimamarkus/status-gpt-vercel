import Link from "next/link";
import Hamburger from "#/ui/atoms/icons/Hamburger";
import Logo from "#/ui/atoms/decorations/Logo/Logo";
import AuthButtons from "#/ui/molecules/buttonGroups/AuthButtons/AuthButtons";
import styles from "./TopBar.module.scss";

const navItems = (
  <>
    <li>
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
    </li>
    <li>
      <a href="https://statusmoney.com/login">Login</a>
    </li>
    <li>
      <Link
        type="primary"
        href="https://statusmoney.com/onboarding/register"
        className="text-primary"
      >
        Join Status
      </Link>
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
    <header className="navbar bg-white md:bg-transparent">
      <div className="navbar-start w-full">
        {mobileMenu}
        <Logo />
        <ul className="menu menu-horizontal hidden px-1 lg:visible">{navItems}</ul>
      </div>
      <AuthButtons className="navbar-end" />
    </header>
  );
};

export default TopBar;
