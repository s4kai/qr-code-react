// firebase/auth/register.ts
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebaseAppConfig";

interface ClientData {
  name: string;
  phone: string;
  address: string;
  cpf: string;
}

// Função para cadastrar um cliente
const registerClient = async (
  email: string,
  password: string,
  clientData: ClientData
) => {
  try {
    const clientRef = collection(db, "clientes");
    const cpfQuery = query(clientRef, where("cpf", "==", clientData.cpf));
    const cpfSnapshot = await getDocs(cpfQuery);

    if (!cpfSnapshot.empty) {
      return { error: "Este CPF já está cadastrado." };
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "clientes", user.uid), {
      name: clientData.name,
      phone: clientData.phone,
      address: clientData.address,
      cpf: clientData.cpf,
    });

    return { user, clientData };
  } catch (error: any) {
    if (error.message.includes("already-in-use")) {
      return { error: "Este e-mail já está cadastrado." };
    }

    return { error: error.message };
  }
};

export default registerClient;
