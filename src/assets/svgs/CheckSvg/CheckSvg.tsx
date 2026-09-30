import type { SVGProps } from "react";

const CheckSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 30 30"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 0h25a5 5 0 015 5v21a5 5 0 01-5 5H0V0z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.867 12l-4.835 4.84-2.422-2.424L10 16.032l4.032 4.032 6.45-6.449L18.867 12z"
      fill="#fff"
    />
  </svg>
);

export default CheckSvg;
