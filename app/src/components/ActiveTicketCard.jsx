import { Card } from "./ui";
import { computeDate } from "../js/computeDate";
import QRCode from "react-qr-code";
import clsx from "clsx";

export default function ActiveTicketCard({ ticket }) {
  const dateOfIssue = computeDate(new Date(ticket.dateOfIssue));
  const dateOfExpire = computeDate(new Date(ticket.dateOfExpire));

  return (
    <Card className="md:p-8 pb-8 select-none">
      <div className="flex flex-col justify-between gap-8 sm:flex-row">
        <div>
          <div className="text-2xl text-primary-main font-semibold">
            #{ticket.barCode}
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <div className="">
              <div className="text-secondary-dark text-sm">Времетраене</div>
              <span className="text-black font-semibold">
                {ticket.travelTime} мин.
              </span>
            </div>

            <div className="">
              <div className="text-secondary-dark text-sm">Валиден до</div>
              <span className="text-black font-semibold">{dateOfExpire}</span>
            </div>

            <div className="block">
              <div className="text-secondary-dark text-sm">Закупен</div>
              <span className="text-black font-semibold">{dateOfIssue}</span>
              <br />
              <span className="text-black font-semibold">{ticket.issuer}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <QRCode
            size={172}
            value={JSON.stringify(ticket)}
            fgColor="#343f54"
            viewBox={`0 0 172 172`}
          />
          <div
            className={clsx(
              "mx-auto border w-fit rounded-md px-2",
              ticket.isActive
                ? "border-success-main bg-white text-success-main"
                : "border-error-main bg-white text-error-main"
            )}
          >
            {ticket.isActive ? "Активен" : "Невалиден"}
          </div>
        </div>
      </div>
    </Card>
  );
}
