import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

export default function FooterLink({ link, ...restProps }) {
  return (
    <NavLink
      to={link.path}
      className={({ isActive }) =>
        clsx(
          "relative w-full text-center transition-all duration-300 select-none outline-none",
          link.className,
          isActive ? "text-primary-main pt-3" : "text-secondary-dark py-5"
        )
      }
      {...restProps}
    >
      {({ isActive }) => (
        <>
          <div
            className={clsx("w-fit mx-auto text-2xl", isActive && "scale-110")}
          >
            {link.icon}
          </div>

          {isActive && (
            <div
              className={clsx(
                "absolute w-full text-center text-sm transition-opacity",
                isActive ? "opacity-100" : "opacity-0"
              )}
            >
              {link.name}
            </div>
          )}
        </>
      )}
    </NavLink>
  );
}
