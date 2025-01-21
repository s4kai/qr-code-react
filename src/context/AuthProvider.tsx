"use client";

import firebase_app from "@/firebase/firebaseAppConfig";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { Loader } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

interface AuthContextProviderProps {
  children: ReactNode;
}

const auth = getAuth(firebase_app);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [userAuth, setUserAuth] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (authUserCredentials: User | null) => {
        setUserAuth(authUserCredentials);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  async function logout() {
    let result = null,
      error = null;
    try {
      result = await signOut(auth);
    } catch (e) {
      error = e;
    }

    return { result, error };
  }

  return (
    <AuthContext.Provider value={{ userAuth, logout }}>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <Loader size={64} className="animate-spin" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
