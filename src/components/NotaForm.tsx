"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAlert } from "@/context/AlertProvider";
import { cadastrarNotaFiscal } from "@/firebase/cadastrarNota";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Zod schema for validation
const schema = z.object({
  notaFiscal: z.string().min(1, "Número da nota fiscal é obrigatório"),
});

export const NotaFiscalForm = ({ defaultValue }: { defaultValue: string }) => {
  const { showAlert } = useAlert();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      notaFiscal: defaultValue,
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const { notaFiscal } = data;
      const notaId = await cadastrarNotaFiscal({ notaFiscal });

      showAlert("Nota fiscal cadastrada com sucesso! ID: " + notaId, "success");
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        showAlert(error.message, "error");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow-md w-full sm:w-96"
    >
      <div className="mb-4">
        <label
          htmlFor="notaFiscal"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Número da nota fiscal
        </label>
        <Input
          id="notaFiscal"
          type="text"
          placeholder="Digite o número da nota fiscal"
          {...register("notaFiscal")}
          className="w-full"
        />
        {errors.notaFiscal && (
          <p className="text-red-500 text-sm">{errors.notaFiscal.message}</p>
        )}
      </div>

      <div className="mb-4 text-center text-gray-700">
        ou clique no botão abaixo para tirar uma foto do QR Code
      </div>

      <Link href={"/qr-code"}>
        <Button
          size={"lg"}
          className="w-full  bg-blue-500 hover:bg-blue-600 mb-2"
        >
          Tirar foto do QR Code
        </Button>
      </Link>

      <Button
        type="submit"
        size={"lg"}
        className="w-full bg-green-500 hover:bg-green-600"
      >
        Cadastrar nota fiscal
      </Button>
    </form>
  );
};
