"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { step1Schema } from "./schemas"; // Import Zod schema
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Step1Data {
  email: string;
  password: string;
}

interface SignUpStep1Props {
  onNext: (data: Step1Data) => void;
  data?: Step1Data;
}

const SignUpStep1 = ({ onNext, data }: SignUpStep1Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema), // Integrating Zod validation schema
  });

  const onSubmit = (data: Step1Data) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="example@mail.com"
          defaultValue={data?.email}
          {...register("email")} // Register the input field with React Hook Form
          className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Senha
        </label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          defaultValue={data?.password}
          {...register("password")} // Register the input field with React Hook Form
          className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Button size={"lg"} className="w-full" type="submit">
          Proxima Etapa
        </Button>

        <Link href={"/signIn"}>
          <Button type="submit" variant={"link"} size={"lg"} className="w-full">
            Ja tem uma conta? Entrar
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default SignUpStep1;
