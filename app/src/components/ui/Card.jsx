import clsx from "clsx";

export default function Card({
  className,
  title = "",
  subtitle = "",
  elevated = false,
  children,
  ...restProps
}) {
  return (
    <div
      className={clsx(
        "p-4 border border-secondary-light/60 rounded-md",
        className,
        elevated && "shadow-md"
      )}
      {...restProps}
    >
      {title && (
        <div className="font-semibold">
          <div>{title}</div>
          {subtitle && <div className="text-sm text-black/80">{subtitle}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
