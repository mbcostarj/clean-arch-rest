import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import { PrivateRoute } from "./PrivateRoute";
import Users from "../pages/Users";

export function AppRoutes(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}