import { NavLink } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { Button } from "../ui";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import clsx from "clsx";

const publicRoutes = [
  {
    path: "",
    name: "Купи Билет",
  },
  {
    path: "help",
    name: "Помощен Център",
  },
];

const protectedRoutes = [
  {
    path: "account/tickets",
    name: "Моите Билети",
  },
  {
    path: "account/profile",
    name: "Профил",
  },
];

const HeaderLink = ({ link }) => (
  <NavLink
    key={link.path}
    to={link.path}
    replace
    className={({ isActive }) =>
      clsx("transition-all", isActive && "text-primary-main")
    }
  >
    {link.name}
  </NavLink>
);

export default function HeaderNavBar() {
  const user = useSelector((state) => state.user);

  return (
    <div className="fixed hidden lg:block top-0 w-full px-4 lg:py-2 bg-white">
      <div className="flex w-full items-center gap-8 mx-auto max-w-7xl">
        <NavLink to="/" replace>
          <BrandLogo className="text-2xl" />
        </NavLink>

        <div className="flex justify-between items-center w-full">
          <div className="flex gap-4 items-center">
            {publicRoutes.map((link) => (
              <HeaderLink key={link.path} link={link} />
            ))}
          </div>

          {Cookies.get("jwt") && Object.keys(user).length > 0 ? (
            <div className="flex gap-4 items-center">
              {protectedRoutes.map((link) => (
                <HeaderLink key={link.path} link={link} />
              ))}
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <NavLink to="/login">
                <Button variant="outlined">Вход</Button>
              </NavLink>
              <NavLink to="/register">
                <Button variant="primary">Създай Акаунт</Button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
