import { NavLink } from "react-router-dom";
import BrandLogo from "../../components/app/BrandLogo";
import RegisterForm from "../../components/forms/RegisterForm";

export default function RegisterView() {
  return (
    <div className="h-[100vh] flex items-center">
      <div className="mx-auto max-w-[420px] w-full py-28 px-4">
        <NavLink to="/">
          <BrandLogo />
        </NavLink>
      <h1 className="mt-4 mb-8 text-2xl text-center">Създай акаунт</h1>
      <RegisterForm />
    </div>
    </div>
  );
}
