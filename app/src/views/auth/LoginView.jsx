import { NavLink } from "react-router-dom";
import BrandLogo from "../../components/app/BrandLogo";
import LoginForm from "../../components/forms/LoginForm";

export default function LoginView() {
  return (
    <div className="h-[100vh] flex items-center">
      <div className="mx-auto max-w-[420px] w-full py-28 px-4">
        <NavLink to="/">
          <BrandLogo />
        </NavLink>
        <h1 className="mt-4 mb-8 text-2xl text-center">Вход за клиенти</h1>
        <LoginForm />
      </div>
    </div>
  );
}
