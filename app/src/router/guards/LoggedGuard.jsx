import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export default function LoggedGuard({ children }) {
  return Cookies.get("jwt") ? <Navigate to="/" replace /> : children;
}
