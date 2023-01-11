import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import clsx from "clsx";

export default function Modal({
  isModalOpen,
  setIsModalOpen,
  closeBtn = true,
  modalTitle = "",
  children,
}) {
  const modalCloseBtnClickHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        open={isModalOpen}
        onClose={() => {}}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  "max-w-md w-full p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md"
                )}
              >
                <Dialog.Title className="flex justify-between">
                  <span className="font-semibold">{modalTitle}</span>
                  {closeBtn && (
                    <FaTimes
                      tabIndex={0}
                      className="text-lg outline-none cursor-pointer text-secondary-main"
                      onClick={modalCloseBtnClickHandler}
                    />
                  )}
                </Dialog.Title>
                <div className="mt-1">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
