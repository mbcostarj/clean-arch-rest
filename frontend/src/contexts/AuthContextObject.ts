import { createContext } from "react";
import type { LoginResponse } from "../types/auth";

type AuthContextType = {
  user: LoginResponse["user"] | null;
  login: (user: LoginResponse["user"]) => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);