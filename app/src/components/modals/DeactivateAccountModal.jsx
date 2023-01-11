import Button from "../ui/Button";
import Modal from "../ui/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DeactivateAccountModal({ isModalOpen, setIsModalOpen }) {
  const userJwt = useSelector((state) => state.user.jwt);
  const navigate = useNavigate();

  const deleteUserAccount = async () => {
    await axios
      .delete(`${import.meta.env.VITE_API_URL}/user/delete`, {
        headers: {
          authorization: `bearer ${userJwt}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        toast.success("Вашият акаунт беше успешно изтрит!");
        navigate("/logout", { replace: true });
      })
      .catch((err) =>
        toast.error(err.response ? err.response.data : err.message)
      );
  };

  const confirmHandler = () => deleteUserAccount();
  const cancelHandler = () => setIsModalOpen(false);

  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      modalTitle="Потвърждение за изтриване на акаунта"
    >
      <p className="mb-4 text-sm text-secondary-dark">
        Когато изтриете акаунта си вашият активен билет и всякаква информация за
        Вас бива изтривана.
      </p>
      <div className="flex flex-wrap justify-between w-full gap-2 md:flex-nowrap md:flex-row-reverse">
        <Button
          variant="error"
          className=" md:w-fit"
          fullWidth
          onClick={confirmHandler}
        >
          Изтриване
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
