import { useEffect } from "react";
import { clearUser } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function LogoutView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove("jwt");
    dispatch(clearUser());
    navigate(0);
  }, []);

  return <Navigate to="/" replace />;
}
