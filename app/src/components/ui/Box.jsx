import clsx from "clsx";

export default function Box({ children, className, ...restProps }) {
  return (
    <div className={clsx("bg-white rounded-md p-2", className)} {...restProps}>
      {children}
    </div>
  );
}
