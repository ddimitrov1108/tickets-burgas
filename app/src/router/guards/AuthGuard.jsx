import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function AuthGuard({ children }) {
  return Cookies.get("jwt") ? children : <Navigate to="/login" replace />;
}
