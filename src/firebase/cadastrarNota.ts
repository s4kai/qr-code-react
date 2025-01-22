import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebaseAppConfig"; // Importe a instância do Firebase

const generateRandomNumber = () => {
  return Math.round(Math.random() * 1000);
};

// Função para cadastrar a nota fiscal
export const cadastrarNotaFiscal = async (notaFiscalData: {
  notaFiscal: string;
}) => {
  try {
    const chave = notaFiscalData.notaFiscal.trim().slice(0, 44);
    const user = auth.currentUser;
    //Verifica se a nota e valida
    const validRefNota = collection(db, "notas_validas");
    const validQueryNota = query(validRefNota, where("chave", "==", chave));

    const validSnapshot = await getDocs(validQueryNota);

    if (validSnapshot.empty) {
      throw new Error("Nota fiscal inválida.");
    }

    //Verifica se existe uma nota fiscal com o mesmo ID
    const docRefNota = collection(db, "notas_fiscais");
    const docQueryNota = query(docRefNota, where("chave_nota", "==", chave));

    const notaSnapshot = await getDocs(docQueryNota);

    if (!notaSnapshot.empty) {
      throw new Error("Nota fiscal já cadastrada.");
    }

    await addDoc(collection(db, "notas_fiscais"), {
      chave_nota: chave,
      data: new Date().toISOString(),
      valor: (Math.random() * 1000).toFixed(2),
      user: user?.uid,
    });

    const numbersToGenerate = await validSnapshot.docs[0].data().numero;

    const generatedNumbers = [];
    for (let i = 0; i < numbersToGenerate; i++) {
      generatedNumbers.push(generateRandomNumber());
    }

    await addDoc(collection(db, "generated_numbers"), {
      chave_nota: chave,
      numbers: generatedNumbers,
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
