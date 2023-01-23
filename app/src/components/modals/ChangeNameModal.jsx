import ChangeNamesForm from "../forms/ChangeNamesForm";
import Modal from "../ui/Modal";

export default function ChangeNameModal({ modalOpen, setModalOpen }) {
  return (
    <Modal
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      modalTitle="Смяна на имената"
    >
      <p className="text-sm text-secondary-dark">
        При смяна на имената вашите активни билети и история на покупките не
        подлежат на промяна или изтриване.
      </p>
      <ChangeNamesForm />
    </Modal>
  );
}
