import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const ref = useRef<HTMLDialogElement>(null);

  // reason we're doing this is because when using the 'open' attribute on a <dialog>, it will become non-modal, that's why backdrop doesn't work.
  // sol: https://stackoverflow.com/questions/76616735/tailwind-backdrop-not-applying-to-dialog-element

  useEffect(() => {
    if (isOpen && ref.current) {
      ref.current.showModal();
    } else if (!isOpen && ref.current) {
      ref.current.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      className="relative backdrop:bg-gray-500/50 backdrop:backdrop-blur-md rounded-sm"
      onClick={(e) => {
        if (e.target === ref.current) {
          onClose();
        }
      }}
    >
      <button
        onClick={onClose}
        className="absolute right-1 top-1 text-gray-400 hover:text-gray-500"
      >
        {/* <!-- Heroicon name: outline/x --> */}
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="mt-7 p-3">{children}</div>
    </dialog>
  );
};

export default Modal;
