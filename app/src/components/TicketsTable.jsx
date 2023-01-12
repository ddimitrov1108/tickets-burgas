import { useState } from "react";
import { computeDate } from "../js/computeDate";
import {
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaTimesCircle,
} from "react-icons/fa";
import clsx from "clsx";
import { Dropdown } from "./ui";
import { Menu } from "@headlessui/react";

export default function TicketsTable({ tickets }) {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const pagePrevHandler = () => {
    if (page === 0) return;

    setPage(page - 1);
  };

  const pageNextHandler = () => {
    if (page * limit + limit > tickets.length) return;

    setPage(page + 1);
  };

  const pageStart = tickets.length > 0 ? page * limit + 1 : 0;
  const pageEnd =
    tickets.length > 0
      ? page * limit + limit > tickets.length
        ? tickets.length
        : page * limit + limit
      : 0;

  return (
    <div>
      <div
        className={clsx("mt-4 overflow-x-auto", limit === 5 && "min-h-[321px]")}
      >
        <table className="table-fixed overflow-scroll min-w-full">
          <thead>
            <tr className="text-sm text-secondary-dark py-10">
              <th className="p-2 font-normal text-left">Баркод</th>
              <th className="p-2 font-normal text-center">Статус</th>
              <th className="p-2 font-normal text-center">Времетраене</th>
              <th className="p-2 font-normal text-center">Закупен</th>
            </tr>
          </thead>
          <tbody className="min-w-3xl">
            {tickets &&
              tickets.length > 0 &&
              tickets
                .slice(page * limit, page * limit + limit)
                .map((ticket) => (
                  <tr
                    className="border-b border-secondary-light/50 items-center mx-4"
                    key={ticket.barCode}
                  >
                    <td className="py-4 text-primary-main font-semibold">
                      <div className="lg:w-56">#{ticket.barCode}</div>
                    </td>
                    <td className="text-center text-xl">
                      <div>
                        {ticket.isActive ? (
                          <FaCheckCircle className="text-success-main mx-auto" />
                        ) : (
                          <FaTimesCircle className="text-error-main mx-auto" />
                        )}
                      </div>
                    </td>
                    <td className="text-center text-sm">
                      <div>{ticket.travelTime} мин.</div>
                    </td>
                    <td className="text-center text-sm max-w-fit">
                      <div>{computeDate(new Date(ticket.dateOfIssue))}</div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm py-4 w-full flex gap-8 items-center justify-end">
        <div className="flex gap-2 items-center">
          {"Елементи на страница: "}
          <Dropdown
            menuTitle={<span className="font-semibold">{limit}</span>}
            menuItemsClassName="left-0"
          >
            {[5, 10, 25].map((pageLimit) => (
              <Menu.Item key={pageLimit}>
                <div
                  className="min-w-fit flex gap-2 py-1 px-4 items-center cursor-pointer font-semibold transition-all hover:bg-secondary-light/40"
                  onClick={() => setLimit(pageLimit)}
                >
                  {pageLimit}
                </div>
              </Menu.Item>
            ))}
          </Dropdown>
        </div>
        <div className="flex gap-4 items-center">
          <div>
            {"Показани: "}
            <span className="font-semibold">{pageStart}</span>
            {" - "}
            <span className="font-semibold">{pageEnd}</span>
            {" от "}
            <span className="font-semibold">{tickets.length}</span>
          </div>

          <div className="flex gap-2 text-lg text-primary-main">
            <button
              className="disabled:text-secondary-light"
              disabled={pageStart <= 1}
              onClick={pagePrevHandler}
            >
              <FaChevronLeft />
            </button>

            <button
              className="disabled:text-secondary-light"
              disabled={pageEnd >= tickets.length}
              onClick={pageNextHandler}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
