import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useAuth } from "../hooks/useAuth";
import type { LoginRequest } from "../types/auth";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login: setAuthUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data: LoginRequest = { email, password }
      const result = await authService.login(data);
      setAuthUser(result.user);
      navigate("/users");
    } catch (err: unknown) {
      let message = "Unknown error"
      if (err instanceof Error){
        message = err.message;
      }
      setError(message.includes("401") ? "Invalid password" : message);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-2">Senha</label>
          <input
            type="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}