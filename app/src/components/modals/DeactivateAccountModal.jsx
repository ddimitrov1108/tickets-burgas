import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

export default function DeactivateAccountModal({ isModalOpen, setIsModalOpen }) {
  const navigate = useNavigate();

  const deactivateAccount = async () => {
    await axios
      .delete(`${import.meta.env.VITE_API_URL}/user/deactivate`, {
        headers: {
          authorization: `bearer ${Cookies.get("jwt")}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        toast.success("Вашият акаунт беше успешно деактивиран!");
        navigate("/logout", { replace: true });
      })
      .catch((err) =>
        toast.error(err.response ? err.response.data : err.message)
      );
  };

  const confirmHandler = () => deactivateAccount();
  const cancelHandler = () => setIsModalOpen(false);

  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      modalTitle="Потвърждение за деактивиране на акаунта"
    >
      <p className="mb-4 text-sm text-secondary-dark">
      Когато деактивирате акаунта си вашите активни билети стават неактивни
      </p>
      <div className="flex flex-wrap justify-between w-full gap-2 md:flex-nowrap md:flex-row-reverse">
        <Button
          variant="error"
          className=" md:w-fit"
          fullWidth
          onClick={confirmHandler}
        >
          Деактивиране
        </Button>
        <Button
          variant="text"
          className=" md:w-fit"
          fullWidth
          onClick={cancelHandler}
        >
          Отмени
        </Button>
      </div>
    </Modal>
  );
}
