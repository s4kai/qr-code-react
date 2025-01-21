"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoggedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userAuth, logout } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!userAuth) {
      router.replace("/signIn");
    }
  }, [userAuth, router]);

  if (!userAuth) {
    return null;
  }

  return (
    <div className="flex flex-col w-[100vw] justify-center items-center h-full">
      <nav className="flex justify-center items-center bg-gray-800 text-white shadow-md w-full h-90">
        <div className="flex justify-between items-center p-4 w-full max-w-[1900px]">
          <div className="text-2xl font-bold">Logo</div>

          <div className="flex gap-4">
            <Link href="/">
              <span className="">Notas</span>
            </Link>

            <Link href="/">
              <span className="">Numeros</span>
            </Link>
          </div>

          <Button variant="destructive" onClick={logout}>
            Sair
          </Button>
        </div>
      </nav>
      <main className="h-full flex flex-col justify-center items-center w-full">
        {children}
      </main>
    </div>
  );
}
