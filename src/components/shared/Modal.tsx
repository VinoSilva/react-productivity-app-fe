// Import libraries
import { FaXmark } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import IconButton from "./IconButton";
import useOnKeyDown from "@hooks/useOnKeyDown";

interface ModalProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  footer?: React.ReactNode;
}

const Modal = ({
  children,
  onClose,
  footer,
  title,
  isOpen,
  className,
  ...props
}: ModalProps) => {
  // Close on ESC key
  useOnKeyDown({ callbackFn: onClose, keys: ["Escape"] });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        className={twMerge([
          "bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 transform transition-all animate-fadeIn",
          className || "",
        ])}
        {...props}
      >
        {/* Header */}
        {title && (
          <div className="mb-4 flex justify-between items-center font-roboto">
            <h2 className="text-lg font-lora font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            <IconButton className="p-1" aria-label="Close" onClick={onClose}>
              <FaXmark />
            </IconButton>
          </div>
        )}

        {/* Body */}
        <div className="text-gray-700 dark:text-gray-200">{children}</div>

        {/* Footer */}
        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
