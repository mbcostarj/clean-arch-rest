import { useEffect, useState } from "react";
import type { LoginResponse } from "../types/auth";

type User = LoginResponse["user"];

const API_URL = import.meta.env.VITE_API_URL;


export default function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    fetch(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => setUsers(data.users))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Usuários</h2>
      {loading ? (
        <p>Carregando usuários...</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user: User) => (
            <li key={user.id} className="bg-gray-100 p-4 rounded shadow">
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

}