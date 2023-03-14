import Link from "next/link";
import Hamburger from "#/ui/atoms/icons/Hamburger";
import Logo from "#/ui/atoms/decorations/Logo/Logo";
import AuthButtons from "#/ui/molecules/buttonGroups/AuthButtons/AuthButtons";
import "#/ui/molecules/TopBar/TopBar.css";

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
      <Link href="/admin">Admin</Link>
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
    <header className="navbar">
      <div className="navbar-start w-full">
        {mobileMenu}
        <Logo />
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        <AuthButtons />
      </div>
    </header>
  );
};

export default TopBar;
