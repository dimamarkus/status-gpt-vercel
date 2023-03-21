export const Hamburger = ({ className = "", ...props }) => (
  <svg
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={"h-5 w-5" + " " + className}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
  </svg>
);

// Alt
{
  /* <svg viewBox="0 0 70 70" width={width} height={width} fill="currentColor">
  <rect width="70" height="8" y="10" />
  <rect width="70" height="8" y="30" />
  <rect width="70" height="8" y="50" />
</svg>; */
}

export default Hamburger;
