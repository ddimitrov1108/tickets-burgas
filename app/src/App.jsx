import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/slices/userSlice";
import { Outlet, useNavigate } from "react-router-dom";
import FooterNavBar from "./components/app/FooterNavBar";
import HeaderNavBar from "./components/app/HeaderNavBar";
import AppLoading from "./components/app/AppLoading";
import Cookies from "js-cookie";
import axios from "axios";

export default function App() {
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    setLoading(true);

    await axios
      .get(`${import.meta.env.VITE_API_URL}/user/fetch`, {
        headers: {
          authorization: `bearer ${Cookies.get("jwt")}`,
        },
      })
      .then(({ data }) => {
        dispatch(setUser(data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        navigate("/logout", { replace: true });
      });
  };

  useEffect(() => {
    if (Cookies.get("jwt") && !Object.keys(user).length) fetchUser();
    else setLoading(false);
  }, [Cookies]);

  return loading ? (
    <AppLoading />
  ) : (
    <>
      <HeaderNavBar />

      <div className="p-4 lg:py-8 max-w-5xl mx-auto mb-16 lg:mb-0 lg:mt-16">
        <Outlet />
      </div>

      <FooterNavBar />
    </>
  );
}
