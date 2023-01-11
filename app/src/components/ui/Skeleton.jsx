import clsx from "clsx";

export default function Skeleton({ className, ...restProps }) {
  return (
    <div
      className={clsx("rounded-md bg-secondary-light/50", className)}
      {...restProps}
    ></div>
  );
}
