import { FaUserAlt } from "react-icons/fa";
import clsx from "clsx";

export default function Avatar({ name, className, ...restProps }) {
  const computedAvatarName = `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;

  return (
    <div
      className={clsx(
        "flex justify-center items-center p-6 uppercase text-center rounded-full text-2xl transition-all font-semibold border text-primary-main border-primary-main bg-white",
        className
      )}
      {...restProps}
    >
      {computedAvatarName || <FaUserAlt />}
    </div>
  );
}
