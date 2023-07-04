"use client";

import {
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import Cookies from "js-cookie";
import { auth } from "@/firebase/initFirebase";
import { useRouter } from "next/navigation";
import AuthContext from "./AuthContext";

interface User {
  uid: string;
  email: any;
  token: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

async function createToken(userFirebase: UserCredential): Promise<User> {
  const { user } = userFirebase;
  const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    token: token,
  };
}

function gerenciarCookie(logado: string) {
  if (logado) {
    Cookies.set("digitaliza-auth", logado, {
      expires: 7, // 7 dias
    });
  } else {
    Cookies.remove("digitaliza-auth");
  }
}

const AuthProvider = (props: AuthProviderProps) => {
  const [usuario, setUsuario] = useState<User>();
  const [logado, setLogado] = useState<boolean>(false);
  const router = useRouter();

  async function configurarSessao(userFirebase: UserCredential) {
    if (userFirebase.user?.email) {
      const tokenUsuario = await createToken(userFirebase);
      setUsuario(tokenUsuario);
      gerenciarCookie(tokenUsuario.token);
      return usuario?.email;
    } else {
      gerenciarCookie("");
      return false;
    }
  }

  const login = async (email: string, senha: string) => {
    const userLogged = await signInWithEmailAndPassword(auth, email, senha);

    if (userLogged.user?.email) {
      await configurarSessao(userLogged);
    }
  };

  const isLogged = async () => {
    try {
      auth.onIdTokenChanged((user) => {
        if (user?.email) {
          setLogado(true);
        } else {
          setLogado(false);
          router.push("/");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        login,
        isLogged,
        logado,
        usuario,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
