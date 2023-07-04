"use client";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const projetos = ["Digitaliza", "Rhoda", "Chame Rápido"];

const Projetos = () => {
  const router = useRouter();
  const { logout, isLogged, logado } = useAuth();
  useEffect(() => {
    isLogged && isLogged();
  }, []);
  console.log(logado);
  return (
    <main className="flex flex-col gap-4 h-screen justify-center items-center">
      <div className="flex flex-col gap-4 w-full max-w-md">
        <button
          onClick={async () => {
            router.push("/");
            await logout?.();
          }}
          className="flex justify-start"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </button>
        <h5 className="flex justify-center text-lg">Projetos</h5>

        {projetos?.map((projeto) => (
          <Link
            key={projeto}
            href={projeto}
            className="bg-white border dark:bg-zinc-900 p-8 shadow-lg rounded-xl"
          >
            <label>{projeto}</label>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Projetos;
