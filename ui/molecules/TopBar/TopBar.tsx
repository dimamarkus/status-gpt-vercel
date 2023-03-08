import Hamburger from '#/ui/atoms/icons/Hamburger';
import Logo from '#/ui/atoms/Logo/Logo';
import AuthButtons from '#/ui/molecules/buttonGroups/AuthButtons/AuthButtons';
import '#/ui/molecules/TopBar/TopBar.css';

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
        className="p-2 mt-3 shadow dropdown-content menu rounded-box menu-compact w-52 bg-base-100"
      >
        {navItems}
      </ul>
    </div>
  );
  return (
    <header className="navbar">
      <div className="navbar-start">
        {mobileMenu}
        <Logo />
        <ul className="px-1 menu menu-horizontal">{navItems}</ul>
      </div>
      <div className="hidden navbar-center lg:flex"></div>
      <div className="navbar-end">
        <AuthButtons />
      </div>
    </header>
  );
};

export default TopBar;
