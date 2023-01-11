import ChangeNamesForm from "../forms/ChangeNamesForm";
import Modal from "../ui/Modal";

export default function ChangeNameModal({ isModalOpen, setIsModalOpen }) {
  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      modalTitle="Смяна на имената"
    >
      <div className="">
        <p className="text-sm text-secondary-dark">
          При смяна на имената вашите активни билети и история на покупките не
          подлежат на промяна или изтриване.
        </p>
      </div>
      <ChangeNamesForm />
    </Modal>
  );
}
