import { SVGProps } from "react";

const PencilSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 11 11"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 8.709V11h2.291L9.05 4.242 6.758 1.951 0 8.709ZM10.821 2.47a.608.608 0 0 0 0-.861L9.391.179a.608.608 0 0 0-.861 0L7.412 1.297l2.291 2.291 1.118-1.118Z" />
  </svg>
);

export default PencilSvg;
