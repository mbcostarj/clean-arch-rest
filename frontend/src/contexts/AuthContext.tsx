import { useState } from "react";
import type { LoginResponse } from "../types/auth"
import { AuthContext } from "./AuthContextObject";


export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<LoginResponse["user"] | null>(null);

  const login = (userData: LoginResponse["user"]) => setUser(userData);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};