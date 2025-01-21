"use client";

import SignUpStep1 from "@/components/SignUpStep1";
import SignUpStep2 from "@/components/SignUpStep2";
import { useAlert } from "@/context/AlertProvider";
import registerClient from "@/firebase/registerClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUp = () => {
  const router = useRouter();
  const { showAlert } = useAlert();

  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleNextStep = async (data: { email: string; password: string }) => {
    setStep1Data(data);
    setStep(2);
  };

  const handleBackStep = () => {
    setStep(1);
  };

  const handleSignUp = async (dataStep2: any) => {
    try {
      const { email, password } = step1Data;
      const { name, phone, address, cpf } = dataStep2;

      const { user, error } = await registerClient(email, password, {
        name,
        phone,
        address,
        cpf,
      });

      if (error) {
        showAlert(error, "error");
      } else {
        showAlert("Usuário cadastrado com sucesso!", "success");
        router.push("/signIn");
      }
    } catch (error) {
      showAlert("Erro ao cadastrar usuário", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <section className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Cadastre-se
        </h1>
        {step === 1 ? (
          <SignUpStep1 onNext={handleNextStep} data={step1Data} />
        ) : (
          <SignUpStep2 onBack={handleBackStep} onSubmit={handleSignUp} />
        )}
      </section>
    </div>
  );
};

export default SignUp;
