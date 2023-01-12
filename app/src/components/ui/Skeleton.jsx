import clsx from "clsx";

export default function Skeleton({ className, rounded = "md", ...restProps }) {
  return (
    <div
      className={clsx(`animate-pulse rounded-${rounded} bg-secondary-light/60`, className)}
      {...restProps}
    ></div>
  );
}
