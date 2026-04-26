import { useEffect } from "react";
import { FiAlertCircle, FiCheckCircle, FiX } from "react-icons/fi";

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
        className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg border backdrop-blur ${
          type === "success"
            ? "bg-slate-900/95 text-slate-100 border-emerald-500/60"
            : "bg-slate-900/95 text-slate-100 border-rose-500/60"
        }`}
      >
        {type === "success" ? (
          <FiCheckCircle className="w-6 h-6 flex-shrink-0 text-emerald-400" />
        ) : (
          <FiAlertCircle className="w-6 h-6 flex-shrink-0 text-rose-400" />
        )}
        <p className="font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 hover:text-amber-300 transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Alert;
