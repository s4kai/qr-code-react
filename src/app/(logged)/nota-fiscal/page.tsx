import { NotaFiscalForm } from "@/components/NotaForm"; // Importando o componente de formulário
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    qrcode: string | null;
    error: string | null;
  }>;
};

export default async function ({ searchParams }: Props) {
  const params = await searchParams;

  // Lidar com erro, se não houver câmera
  if (params?.error) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <h3>O dispositivo não possui câmera.</h3>

        <Link href={"/nota-fiscal"}>
          <Button variant="outline" className="mt-6">
            Voltar
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-4">
        Cadastre sua nota fiscal
      </h1>

      <p className="text-lg text-center text-gray-700 mb-6 max-w-lg">
        Para cadastrar sua nota fiscal, basta clicar no botão abaixo e tirar uma
        foto do QR Code da sua nota fiscal.
      </p>

      <NotaFiscalForm defaultValue={params?.qrcode || ""} />
    </>
  );
}
