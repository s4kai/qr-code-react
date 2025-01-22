"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth, db } from "@/firebase/firebaseAppConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function Page() {
  const [invoices, setInvoices] = useState<any[]>([]); // Estado para armazenar as notas fiscais
  const [loading, setLoading] = useState(true); // Controle de carregamento
  const [error, setError] = useState<string | null>(null); // Controle de erros

  useEffect(() => {
    // Função para buscar as notas fiscais do Firestore
    const fetchInvoices = async () => {
      try {
        const authUser = auth.currentUser;

        const docRef = collection(db, "notas_fiscais");
        const docQuery = query(docRef, where("user", "==", authUser?.uid));

        const invoiceData = (await getDocs(docQuery)).docs.map((doc) => ({
          id: doc.data().chave_nota,
          data: doc.data().data,
          valor: doc.data().valor,
        }));

        setInvoices(invoiceData);
      } catch (err) {
        setError("Erro ao carregar as notas fiscais.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []); // Executa a função apenas uma vez quando o componente é montado

  return (
    <div className="flex flex-col w-full h-full max-w-[1200px] mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mt-10">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-0">
          Dashboard - Notas Fiscais
        </h1>

        <Link href={"/nota-fiscal"}>
          <Button variant="secondary" className="w-full sm:w-auto">
            Adicionar Nota Fiscal
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader size={48} className="animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto mt-8">
          <Table aria-label="Tabela de Notas Fiscais">
            <TableHeader>
              <TableRow>
                <TableCell>Chave</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.data.toString()}</TableCell>
                  <TableCell>{invoice.valor}</TableCell>
                  <TableCell>
                    <Button variant="outline" className="mr-2">
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default Page;
