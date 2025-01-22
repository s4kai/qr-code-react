"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react"; // Optional: for close button icon

interface AlertProps {
  message: string;
  type: "success" | "error" | "warning" | "info"; // Alert types for styling
  isOpen: boolean;
  onClose: () => void; // Function to close the alert
}

const Alert: React.FC<AlertProps> = ({ message, type, isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render if the alert is not open

  const alertStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <div
      className={cn(
        "fixed top-5 left-1/2 transform -translate-x-1/2 p-4 rounded-md shadow-lg flex items-center space-x-4 z-50",
        alertStyles[type]
      )}
    >
      <div className="flex-1">{message}</div>
      <button
        onClick={onClose}
        className="text-white hover:bg-opacity-80 p-1 rounded-full"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Alert;
