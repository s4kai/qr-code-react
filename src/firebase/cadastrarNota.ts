import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebaseAppConfig"; // Importe a instância do Firebase

// Função para cadastrar a nota fiscal
export const cadastrarNotaFiscal = async (notaFiscalData: {
  notaFiscal: string;
}) => {
  try {
    const user = auth.currentUser;

    //Verifica se existe uma nota fiscal com o mesmo ID
    const docRefNota = collection(db, "notas_fiscais");
    const docQueryNota = query(
      docRefNota,
      where("chave_nota", "==", notaFiscalData.notaFiscal)
    );

    const notaSnapshot = await getDocs(docQueryNota);

    if (!notaSnapshot.empty) {
      throw new Error("Nota fiscal já cadastrada.");
    }

    await addDoc(collection(db, "notas_fiscais"), {
      chave_nota: notaFiscalData.notaFiscal,
      data: new Date().toDateString(),
      valor: Math.random() * 1000,
      user: user?.uid,
    });

    return notaFiscalData.notaFiscal;
  } catch (e) {
    if (e instanceof Error && e.message === "Nota fiscal já cadastrada.") {
      throw new Error("Nota fiscal já cadastrada.");
    }

    throw new Error("Erro ao cadastrar a nota fiscal.");
  }
};
