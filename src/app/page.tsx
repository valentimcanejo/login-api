"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "@/firebase/initFirebase";
import { Toaster, toast } from "react-hot-toast";

export default function Home() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const login = async (e: any) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      toast.success("Login feito com sucesso!");
    } catch (error: any) {
      console.log(error);
      toast.error(error.toString());
    }
  };

  return (
    <main className="flex h-screen justify-center items-center">
      <Toaster position="bottom-center" />
      <form
        onSubmit={login}
        className="flex w-full max-w-md flex-col bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-xl gap-8"
      >
        <label className="text-lg font-medium">
          Faça o login com seu email
        </label>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="p-4 dark:bg-zinc-800 rounded-lg border"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Senha</label>
          <input
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            type="password"
            className="p-4 dark:bg-zinc-800 rounded-lg border"
            placeholder="Senha"
          />
        </div>
        <button className="bg-blue-400 hover:bg-blue-500 p-4 rounded-lg">
          Login
        </button>
      </form>
    </main>
  );
}
