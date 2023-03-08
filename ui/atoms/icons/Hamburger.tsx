export const Hamburger = ({ className = '', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={'h-5 w-5' + ' ' + className}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h8m-8 6h16"
    />
  </svg>
);

export default Hamburger;
