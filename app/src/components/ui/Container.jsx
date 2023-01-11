import clsx from "clsx";

export default function Container({
  children,
  disableGutters = false,
  elevated = false,
  className,
  ...restProps
}) {
  return (
    <div
      className={clsx(
        "bg-white rounded-md mx-auto",
        !disableGutters && "p-2",
        elevated && "border border-secondary-light/60 shadow-sm",
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}
