import { FaBusAlt } from "react-icons/fa";
import clsx from "clsx";

export default function BrandLogo({ className }) {
  return (
    <div
      className={clsx(
        "text-3xl flex items-center justify-center gap-2",
        className
      )}
    >
      <FaBusAlt className="text-primary-main/70" />

      <div className="font-bold text-primary-main">
        <span className="text-primary-main/70">Ticket</span>
        <span className="">Burgas</span>
      </div>
    </div>
  );
}
