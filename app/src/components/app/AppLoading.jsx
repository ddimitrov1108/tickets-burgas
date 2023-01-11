import { FaBusAlt, FaSpinner } from "react-icons/fa";

export default function AppLoading() {
  return (
    <div className="h-screen z-0 flex items-center">
      <div className="flex flex-col gap-4 mx-auto">
        <FaBusAlt className="mx-auto animate-bounce text-8xl text-primary-main/70" />
        <FaSpinner className="mx-auto text-2xl animate-spin text-primary-main" />
      </div>
    </div>
  );
}
