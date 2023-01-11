import { Menu, Transition } from "@headlessui/react";
import { Fragment } from 'react';
import { FaChevronDown } from "react-icons/fa";
import clsx from "clsx";

export default function Dropdown({
  menuTitle = "Dropdown",
  className,
  menuBtnClassName,
  menuItemsClassName,
  chevronDown = false,
  children,
}) {
  return (
    <Menu as="div" className={clsx("relative", className)}>
      <div>
        <Menu.Button
          className={clsx(
            " w-full flex justify-between text-left text-black",
            menuBtnClassName
          )}
        >
          {menuTitle}
          {chevronDown && <FaChevronDown className="my-1.5 ml-1 text-sm" />}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={clsx(
            "z-40 absolute right-0 mt-2 w-52 origin-top-right px-4 py-2 rounded-md bg-white shadow-lg ring-1 ring-secondary-light focus:outline-none",
            menuItemsClassName
          )}
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
