import Link from "next/link";

type HomeProps = {
  searchParams: {
    qrcode: string | null;
    error: string | null;
  };
};

export default function Home(props: HomeProps) {
  if (props.searchParams?.error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h3>O dispositivo não possui câmera.</h3>

        <Link href={"/"}>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6">
            Voltar
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">
        Cadastre sua nota fiscal
      </h1>

      <p className="text-lg text-center text-gray-700 mb-6 max-w-lg">
        Para cadastrar sua nota fiscal, basta clicar no botão abaixo e tirar uma
        foto do QR Code da sua nota fiscal.
      </p>

      <form
        action="post"
        className="bg-white p-6 rounded-lg shadow-md w-full sm:w-96"
      >
        <div className="mb-4">
          <label
            htmlFor="notaFiscal"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Número da nota fiscal
          </label>
          <input
            type="text"
            id="notaFiscal"
            name="notaFiscal"
            defaultValue={props.searchParams?.qrcode || ""}
            placeholder="Digite o número da nota fiscal"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4 text-center text-gray-700">
          ou clique no botão abaixo para tirar uma foto do QR Code
        </div>

        <div className="flex justify-center mb-6">
          <Link href={"/qr-code"}>
            <button
              type="button"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Tirar foto do QR Code
            </button>
          </Link>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Cadastrar nota fiscal
          </button>
        </div>
      </form>
    </div>
  );
}
