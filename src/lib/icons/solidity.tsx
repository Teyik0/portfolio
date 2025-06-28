import type { SVGProps } from 'react';
export const SoliditySvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="#2B247C"
    height="160"
    viewBox="0 0 100 160"
    width="100"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Solidity logo</title>
    <path d="M50 44.3013L25 1L0 44.3013L25 87.6025L50 44.3013Z" opacity="0.8" />
    <path d="M50 44.3091L75 1.00781L25 1.00781L0 44.3091H50Z" opacity="0.45" />
    <path d="M75 1.00781L25 1.00781L50 44.3091H100L75 1.00781Z" opacity="0.6" />
    <path
      d="M50 115.699L75 159L100 115.699L75 72.3975L50 115.699Z"
      opacity="0.8"
    />
    <path
      d="M50 115.691L25 158.993H75L100 115.691L50 115.691Z"
      opacity="0.45"
    />
    <path d="M25 158.993H75L50 115.691L0 115.691L25 158.993Z" opacity="0.6" />
  </svg>
);
