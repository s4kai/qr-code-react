"use client";

import { Button } from "@/components/ui/button";
import { useAlert } from "@/context/AlertProvider";
import signIn from "@/firebase/auth/signIn";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { showAlert } = useAlert();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { result, error } = await signIn(email, password);

      if (error) {
        const firebaseError = error as FirebaseError;

        if (firebaseError.message) {
          throw new Error(firebaseError.message);
        }
      }

      showAlert("Login realizado com sucesso", "success");
      return router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        showAlert("Erro ao logar", "error");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <section className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Entrar
        </h1>
        <form onSubmit={handleForm} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              className="w-full p-3 border rounded-lg border-gray-300"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">
              Senha
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              className="w-full p-3 border rounded-lg border-gray-300"
              placeholder="********"
            />
          </div>

          <div className="flex justify-between">
            <Button type="submit" size={"lg"} className="w-full p-6">
              Entrar
            </Button>
          </div>

          <div className="text-center mt-2">
            <Button
              type="button"
              onClick={() => router.push("/signUp")}
              variant={"link"}
              size={"lg"}
            >
              Não tem uma conta? Cadastre-se
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignIn;
