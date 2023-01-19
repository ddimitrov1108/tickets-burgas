import { Disclosure } from "@headlessui/react";
import { FaChevronLeft } from "react-icons/fa";
import clsx from "clsx";

export default function Collapse({ title = "Collapse", className, children }) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={clsx(
              "w-full flex items-center justify-between gap-10 px-4 py-2 transition-all border-primary-main/20 focus text-primary-main rounded-md ",
              open
                ? "bg-primary-main/20"
                : "bg-primary-main/5 hover:bg-primary-main/20"
            )}
          >
            <span className="font-semibold">{title}</span>
            <FaChevronLeft
              className={clsx("transform transition-all", open && "-rotate-90")}
            />
          </Disclosure.Button>

          <Disclosure.Panel className={clsx("px-4 py-2 rounded-md shadow-xl")}>
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
