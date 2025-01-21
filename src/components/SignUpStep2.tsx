"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { step2Schema } from "./schemas"; // Importar o esquema Zod para Step 2
import { Button } from "./ui/button";
import { Input } from "./ui/input"; // Usando o Input do ShadCN UI

interface Step2Data {
  name: string;
  phone: string;
  address: string;
  cpf: string;
}

type SignUpStep2Props = {
  onBack: () => void;
  onSubmit: (data: Step2Data) => void;
};

const SignUpStep2 = ({ onBack, onSubmit }: SignUpStep2Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema), // Aplicando a validação Zod para Step 2
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* CPF */}
      <div>
        <label
          htmlFor="cpf"
          className="block text-sm font-medium text-gray-700"
        >
          CPF
        </label>
        <Input
          id="cpf"
          type="text"
          placeholder="000.000.000-00"
          {...register("cpf")} // Registrando o campo 'cpf'
          className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.cpf && (
          <p className="text-red-500 text-sm mt-1">{errors.cpf.message}</p>
        )}
      </div>

      {/* Nome Completo */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nome
        </label>
        <Input
          id="name"
          placeholder="Seu nome completo"
          type="text"
          {...register("name")}
          className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Telefone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Número de Telefone
        </label>
        <Input
          id="phone"
          type="text"
          placeholder="(99) 99999-9999"
          {...register("phone")} // Registrando o campo 'phone'
          className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Endereço */}
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Endereço
        </label>
        <Input
          id="address"
          type="text"
          placeholder="Rua Principal, 123, Cidade, País"
          {...register("address")} // Registrando o campo 'address'
          className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {/* Botão para Submissão do Formulário */}
        <Button size={"lg"} className="w-full p-6" type="submit">
          Finalizar Cadastro
        </Button>

        {/* Botão para Voltar para a Etapa 1 */}
        <Button
          type="button"
          size={"lg"}
          className="w-full"
          variant={"ghost"}
          onClick={onBack}
        >
          Voltar
        </Button>
      </div>
    </form>
  );
};

export default SignUpStep2;
