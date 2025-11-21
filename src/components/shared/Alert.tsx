import { useEffect } from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";

interface AlertProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
  duration?: number;
}

const Alert = ({
  message,
  type = "success",
  onClose,
  duration = 3000,
}: AlertProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg ${
          type === "success"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        <FiCheckCircle className="w-6 h-6 flex-shrink-0" />
        <p className="font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 hover:opacity-80 transition-opacity"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Alert;
