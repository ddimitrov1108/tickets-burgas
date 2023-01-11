import clsx from "clsx";

const buttonClassNames = {
  primary:
    "text-white bg-primary-main hover:bg-primary-secondary border-primary-main",
  secondary: "border-primary-main/20 bg-primary-main/20 text-primary-main",
  outlined: "bg-white text-primary-main border-primary-main",
  error: "text-white border-error-main bg-error-main",
  text: "text-primary-main border-transparent bg-white",
};

export default function Button({
  variant = "primary",
  fullWidth = false,
  className,
  children = "Button",
  ...restProps
}) {
  return (
    <button
      className={clsx(
        "px-4 py-2.5 rounded-md transition-all outline-none font-semibold border text-sm disabled:opacity-80",
        buttonClassNames[variant],
        fullWidth ? "w-full" : "w-fit",
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
}
