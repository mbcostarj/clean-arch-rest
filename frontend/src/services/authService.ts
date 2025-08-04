import type { LoginRequest, LoginResponse } from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL; //process.env.REACT_APP_API_URL;

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    return result;

  }
  
};