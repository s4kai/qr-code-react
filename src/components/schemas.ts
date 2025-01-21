import { z } from "zod";

export const step1Schema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

export const step2Schema = z.object({
  name: z
    .string()
    .min(1, "Nome completo é obrigatório")
    .nonempty("Nome completo é obrigatório"),
  phone: z.string().nonempty("Número de telefone é obrigatório"),
  address: z
    .string()
    .min(1, "Endereço é obrigatório")
    .nonempty("Endereço é obrigatório"),
  cpf: z
    .string()
    .regex(
      /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/,
      "O CPF deve estar no formato XXX.XXX.XXX-XX"
    )
    .nonempty("CPF é obrigatório"),
});
