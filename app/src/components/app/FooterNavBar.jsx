import {
  FaCartArrowDown,
  FaQuestionCircle,
  FaSignInAlt,
  FaTicketAlt,
  FaUserCircle,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import clsx from "clsx";

const publicRoutes = [
  {
    path: "",
    name: "Купи Билет",
    icon: <FaCartArrowDown />,
  },
];

const protectedRoutes = [
  {
    path: "account/tickets",
    name: "Моите Билети",
    icon: <FaTicketAlt className="mx-auto text-2xl" />,
  },
  {
    path: "account/profile",
    name: "Профил",
    icon: <FaUserCircle className="mx-auto text-2xl" />,
  },
];

const FooterLink = ({ link, ...restProps }) => (
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

        <div
          className={clsx(
            "absolute w-full text-center text-xs xs:text-sm transition-opacity",
            isActive ? "opacity-100" : "opacity-0"
          )}
        >
          {link.name}
        </div>
      </>
    )}
  </NavLink>
);

export default function FooterNavBar() {
  const user = useSelector((state) => state.user);

  return (
    <div
      className="fixed bottom-0 left-0 flex justify-around w-full bg-white outline-none select-none lg:hidden z-40"
      style={{ boxShadow: "0px -5px 10px rgb(0 0 0 / 0.15)" }}
    >
      {publicRoutes.map((link) => (
        <FooterLink key={link.path} link={link} />
      ))}

      {Cookies.get("jwt") && Object.keys(user).length > 0 ? (
        protectedRoutes.map((link) => (
          <FooterLink key={link.path} link={link} />
        ))
      ) : (
        <FooterLink
          link={{
            path: "/login",
            name: "Вход",
            icon: <FaSignInAlt />,
          }}
        />
      )}

      <FooterLink
        link={{
          path: "help",
          name: "Помощ",
          icon: <FaQuestionCircle />,
        }}
      />
    </div>
  );
}
