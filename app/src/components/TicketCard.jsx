import { FaTicketAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Button, Card } from "./ui";
import { v4 as uuid } from "uuid";

export default function TicketCard({ ticket, className }) {
  return (
      <Card
        className={clsx("lg:max-w-[280px] max-h-fit w-full", className)}
        elevated
      >
        <div className="p-6 mx-auto rounded-full w-fit bg-primary-light/10 text-3xl">
          <FaTicketAlt className="mx-auto text-primary-main" />
        </div>

        <div className="flex flex-col gap-6 mt-6 font-semibold text-center">
          <span>Пътнически Билет</span>
          <span className="text-2xl text-primary-main">
            {ticket.travelTime} мин.
          </span>
          <span className="text-sm">
            Важи за всички градски линии обслужвани от{" "}
            <a
              href="https://burgasbus.info/burgasbus/?cat=1"
              target="_blank"
              className="text-primary-main"
            >
              “Бургасбус” ЕООД
            </a>
            . Не важи в ППС на други превозвачи.
          </span>
          <span className="text-2xl font-bold">
            {ticket.cost.toFixed(2)} лв.
          </span>
          <NavLink to={`account/checkout/${uuid()}`} state={{ ticket }} replace>
            <Button
              variant="outlined"
              className="hover:bg-primary-main hover:text-white"
              fullWidth
            >
              Купи Билет
            </Button>
          </NavLink>
        </div>
      </Card>
  );
}
