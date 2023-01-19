import { useState } from "react";
import { computeDate } from "../js/computeDate";
import {
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaTimesCircle,
} from "react-icons/fa";
import { Dropdown } from "./ui";
import { Menu } from "@headlessui/react";

export default function TicketsTable({ tickets }) {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const limitHandler = (pageLimit) => {
    setPage(0);
    setLimit(pageLimit);
  };

  const pagePrevHandler = () => (page === 0 ? null : setPage(page - 1));
  const pageNextHandler = () =>
    page * limit + limit > tickets.length ? null : setPage(page + 1);

  const pageStart = page * limit + 1;
  const pageEnd =
    page * limit + limit > tickets.length
      ? tickets.length
      : page * limit + limit;

  const filterTickets = tickets.slice(page * limit, page * limit + limit);

  return (
    <div className="mt-8">
      <div className="overflow-auto min-h-[321px]">
        <table className="relative table-fixed overflow-scroll min-w-full">
          <thead className="sticky top-0 bg-white">
            <tr className="text-sm text-secondary-dark py-10">
              <th className="p-2 font-normal text-left">Баркод</th>
              <th className="p-2 font-normal text-center">Статус</th>
              <th className="p-2 font-normal text-center">Времетраене</th>
              <th className="p-2 font-normal text-center">Закупен</th>
            </tr>
          </thead>
          <tbody className="min-w-3xl">
            {filterTickets.map((ticket) => (
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

      <div className="text-sm py-4 w-full flex gap-8 items-center justify-between">
        <div className="flex gap-2 items-center ">
          {"Елементи: "}
          <Dropdown
            menuTitle={<span className="font-semibold">{limit}</span>}
            menuItemsClassName="left-0 -translate-y-[calc(100%+25px)]"
            chevronDown={true}
          >
            {[5, 10, 25].map((pageLimit) => (
              <Menu.Item key={pageLimit}>
                <div
                  className="min-w-fit flex gap-2 py-1 px-4 items-center cursor-pointer font-semibold transition-all hover:bg-secondary-light/40"
                  onClick={() => limitHandler(pageLimit)}
                >
                  {pageLimit}
                </div>
              </Menu.Item>
            ))}
          </Dropdown>
        </div>
        <div className="flex gap-4 items-center">
          <div>
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
