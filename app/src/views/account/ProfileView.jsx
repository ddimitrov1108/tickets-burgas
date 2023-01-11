import { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ChangeNameModal from "../../components/modals/ChangeNameModal";
import ChangePasswordForm from "../../components/forms/ChangePasswordForm";
import DeactivateAccountModal from "../../components/modals/DeactivateAccountModal";
import { Avatar, Button, Card } from "../../components/ui";

export default function ProfileView() {
  const [nameModalIsOpen, setNameModalIsOpen] = useState(false);
  const [delAccModalIsOpen, setDelAccModalIsOpen] = useState(false);
  const user = useSelector((state) => state.user);

  const changeNamesHandler = () => setNameModalIsOpen(true);
  const deactivateAccountHandler = () => setDelAccModalIsOpen(true);

  return (
    <Fragment>
      <ChangeNameModal
        isModalOpen={nameModalIsOpen}
        setIsModalOpen={setNameModalIsOpen}
      />

      <DeactivateAccountModal
        isModalOpen={delAccModalIsOpen}
        setIsModalOpen={setDelAccModalIsOpen}
      />

      <Card className="flex flex-col items-center w-full gap-4 mb-4 md:p-8 md:flex-row">
        <Avatar name={user.fullName} className="p-8" />

        <div className="flex flex-col items-center justify-between w-full gap-6 md:items-start md:flex-row">
          <div className="flex flex-col w-full text-center md:text-left">
            <div className="font-semibold">
              {user.fullName}{" "}
              <span
                className="text-sm cursor-pointer text-primary-main"
                onClick={changeNamesHandler}
              >
                Промени
              </span>
            </div>
            <div className="text-sm text-secondary-dark">{user.email}</div>
          </div>
          <NavLink to="/logout" className="w-full md:w-fit">
            <Button variant="secondary" fullWidth>
              Изход
            </Button>
          </NavLink>
        </div>
      </Card>

      <Card className="mb-4 md:p-8">
        <div className="mb-6">
          <span className="font-semibold">Смяна на паролата</span>
          <p className="text-sm text-secondary-dark">
            Бъдете сигурни да въведете достатъчно сигурна парола иначе рискувате
            акаунта Ви да бъде изложен на риск.
          </p>
        </div>
        <ChangePasswordForm />
      </Card>

      <Card className="mb-4 md:p-8">
        <div className="mb-6">
          <span className="font-semibold">Деактивиране на акаунта</span>
          <p className="text-sm text-secondary-dark">
            Когато деактивирате акаунта си вашите активни билети стават
            неактивни
          </p>
        </div>

        <div className="flex flex-wrap justify-between gap-2">
          <div className="flex flex-wrap w-full gap-2 md:w-fit">
            <NavLink to="/logout" className="hidden w-full md:w-fit lg:block">
              <Button variant="outlined" fullWidth>
                Изход
              </Button>
            </NavLink>
            <Button
              variant="error"
              className=" md:w-fit"
              fullWidth
              onClick={deactivateAccountHandler}
            >
              Деактивиране на акаунта
            </Button>
          </div>
          <NavLink to="/help-center" replace className="w-full md:w-fit">
            <Button variant="secondary" fullWidth>
              Помощен Център
            </Button>
          </NavLink>
        </div>
      </Card>
    </Fragment>
  );
}
