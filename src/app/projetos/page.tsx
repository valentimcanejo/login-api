"use client";

import db from "@/firebase/initFirebase";
import useAuth from "@/hooks/useAuth";
import { collection, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Projetos = () => {
  const router = useRouter();
  const { logout, isLogged, logado } = useAuth();
  const [listaProjetos, setListaProjetos] = useState<any>([]);
  const [token, setToken] = useState("");
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams as any);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const sendToken = async (link: string) => {
    try {
      const customToken = await fetch("http://localhost:3001/api/createToken", {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await customToken.json();
      const token = data.customToken.toString();

      const queryString = createQueryString("token", token);
      const url = link + "?" + queryString;
      console.log(token);

      // Abre a rota em outra aba
      window.open(url, "_blank");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const collectionRef = collection(db, "users");

    onSnapshot(collectionRef, (snapshot) => {
      setListaProjetos(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);

  useEffect(() => {
    isLogged && isLogged();
  }, []);

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

        {listaProjetos[0]?.projetos?.map((projeto: any) => (
          <button
            key={projeto.link}
            //href={projeto.link}
            onClick={async () => await sendToken(projeto.link)}
            className="bg-white border dark:bg-zinc-900 p-8 shadow-lg rounded-xl"
          >
            <label>{projeto.nome}</label>
          </button>
        ))}
      </div>
    </main>
  );
};

export default Projetos;
