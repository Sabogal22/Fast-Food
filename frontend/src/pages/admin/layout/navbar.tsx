import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around shadow-lg">
      <button
        onClick={() => navigate("/")}
        className="flex flex-col items-center text-purple-600"
      >
        <span className="text-2xl">📊</span>
        <span className="text-xs">Dashboard</span>
      </button>
      <button className="flex flex-col items-center text-gray-600 hover:text-purple-600">
        <span className="text-2xl">👥</span>
        <span className="text-xs">Empleados</span>
      </button>
      <button
        onClick={() => navigate("/admin/products")}
        className="flex flex-col items-center text-gray-600 hover:text-purple-600"
      >
        <span className="text-2xl">📦</span>
        <span className="text-xs">Inventario</span>
      </button>
      <button className="flex flex-col items-center text-gray-600 hover:text-purple-600">
        <span className="text-2xl">💰</span>
        <span className="text-xs">Finanzas</span>
      </button>
      <button className="flex flex-col items-center text-gray-600 hover:text-purple-600">
        <span className="text-2xl">📋</span>
        <span className="text-xs">Reportes</span>
      </button>
    </div>
  );
};

export default Navbar;
