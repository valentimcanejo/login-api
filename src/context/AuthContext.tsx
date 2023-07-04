"use client";

import { createContext } from "react";

interface User {
  uid: string;
  email: any;
  token: string;
}

interface AuthContextProps {
  login?: (email: string, senha: string) => Promise<void>;
  logout?: () => Promise<void>;
  isLogged?: () => Promise<void>;
  logado?: boolean;
  cadastrarUsuario?: (
    nome: string,
    email: string,
    senha: string
  ) => Promise<void>;
  usuario?: User;
}

const AuthContext = createContext<AuthContextProps>({});

export default AuthContext;
