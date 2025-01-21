// context/AlertContext.tsx

"use client";

import Alert from "@/components/ui/alert"; // Import your Alert component
import React, { createContext, ReactNode, useContext, useState } from "react";

interface AlertContextType {
  showAlert: (
    message: string,
    type: "success" | "error" | "warning" | "info"
  ) => void;
}

interface AlertProviderProps {
  children: ReactNode;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<{ message: string; type: string } | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const showAlert = (
    message: string,
    type: "success" | "error" | "warning" | "info"
  ) => {
    setAlert({ message, type });
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 3000); // Close alert after 3 seconds
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type as "success" | "error" | "warning" | "info"}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </AlertContext.Provider>
  );
};
