import { useEffect, useRef } from "react";

interface GenericModalProps {
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
  children: React.ReactNode;
  modalClassName?: string;
  allowClickOutside?: boolean;
}

const GenericModal = ({
  isOpen,
  onClose,
  className = "",
  children,
  modalClassName = "max-w-md w-full p-4",
  allowClickOutside = true,
}: GenericModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        onClose &&
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        allowClickOutside
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      data-testid="modal"
      className={`fixed ${className} inset-0 bg-black bg-opacity-50 flex justify-center items-center`}
      style={{ zIndex: 5000 }}
    >
      <div
        ref={ref}
        className={`bg-custom-white rounded-xl shadow-xl ${modalClassName}`}
      >
        {children}
      </div>
    </div>
  );
};

export default GenericModal;
