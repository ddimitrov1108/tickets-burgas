import { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import clsx from "clsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function TextField({
  label = "",
  sublabel = "",
  fullWidth = false,
  className,
  field,
  type,
  disabled,
  form: { errors, touched },
  ...restProps
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const setEndOfInput = (element) => {
    if (element.value.length > 0) {
      setTimeout(() => {
        element.selectionStart = element.selectionEnd = element.value.length;
      }, 0);
    }
  };

  const PasswordIconClickHandler = () => {
    setPasswordVisible(!passwordVisible);
    document.getElementById(field.name).focus();
  };

  useEffect(() => {
    const element = document.getElementById(field.name);

    if (type === "password") {
      element.addEventListener(
        "focus",
        () => {
          setEndOfInput(element);
        },
        false
      );
    }

    return () => {
      try {
        element.removeEventListener("focus", setEndOfInput, false);
      } catch (error) {}
    };
  }, []);

  return (
    <div className={clsx("py-1.5", fullWidth ? "w-full" : "w-fit")}>
      <div className="min-w-fit pb-1.5">
        {label && (
          <div className="min-w-fit text-sm font-semibold">{label}</div>
        )}

        {sublabel && (
          <div className="min-w-fit text-sm text-secondary-dark">
            {sublabel}
          </div>
        )}
      </div>

      <div className="relative">
        {type === "password" && (
          <button
            tabIndex={-1}
            type="button"
            disabled={disabled}
            className="bg-white absolute top-2 right-2 px-1 py-1 text-xl text-secondary-dark cursor-pointer rounded-full select-none"
            onClick={PasswordIconClickHandler}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}

        <input
          disabled={disabled}
          type={passwordVisible ? "text" : type}
          className={clsx(
            "px-4 py-2 border rounded-md w-full",
            className,
            errors[field.name] && touched[field.name]
              ? " border-error-main focus:outline-error-main"
              : "border-secondary-light focus:outline-primary-main"
          )}
          {...field}
          {...restProps}
        />

        {errors[field.name] && touched[field.name] && (
          <ErrorMessage msg={errors[field.name]} />
        )}
      </div>
    </div>
  );
}
