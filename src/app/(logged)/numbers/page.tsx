"use client";

import { auth, db } from "@/firebase/firebaseAppConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

function Page() {
  const [numbers, setNumbers] = useState<any[]>([]); // Estado para armazenar os números gerados
  const [loading, setLoading] = useState(true); // Controle de carregamento
  const [error, setError] = useState<string | null>(null); // Controle de erros

  useEffect(() => {
    // Função para buscar os números gerados do Firestore
    const fetchNumbers = async () => {
      try {
        const authUser = auth.currentUser;

        const docRef = collection(db, "generated_numbers");
        const docQuery = query(docRef, where("user", "==", authUser?.uid));

        const generateNumberData = (await getDocs(docQuery)).docs.map(
          (doc) => ({
            chave: doc.data().chave_nota,
            numbers: doc.data().numbers,
          })
        );

        setNumbers(generateNumberData);
      } catch (err) {
        setError("Erro ao carregar os números gerados.");
      } finally {
        setLoading(false);
      }
    };

    fetchNumbers();
  }, []); // Executa a função apenas uma vez quando o componente é montado

  return (
    <div className="flex flex-col w-full h-full max-w-[1200px] mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mt-10">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-0">
          Meus Números Gerados
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader size={48} className="animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="mt-8">
          {numbers.map((generateNumber) => (
            <div
              key={generateNumber.chave}
              className="mb-8 border p-4 rounded-lg shadow-lg bg-white"
            >
              <h2 className="text-pretty font-semibold text-gray-800 mb-4 truncate text-ellipsis">
                Chave: {generateNumber.chave}
              </h2>
              <div className="flex flex-wrap gap-2 items-center justify-center">
                {generateNumber.numbers.map((number: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-center items-center p-2 border rounded-md bg-gray-50 shadow-sm min-w-[60px] "
                  >
                    <span className="text-gray-700">{number}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;
