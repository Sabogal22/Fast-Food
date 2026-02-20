import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const activeClass = "text-purple-600";
  const inactiveClass = "text-gray-600 hover:text-purple-600";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around shadow-lg">
      
      <button
        onClick={() => navigate("/")}
        className={`flex flex-col items-center ${
          isActive("/") ? activeClass : inactiveClass
        }`}
      >
        <span className="text-2xl">📊</span>
        <span className="text-xs">Dashboard</span>
      </button>

      <button
        onClick={() => navigate("/admin/employees")}
        className={`flex flex-col items-center ${
          isActive("/admin/employees") ? activeClass : inactiveClass
        }`}
      >
        <span className="text-2xl">👥</span>
        <span className="text-xs">Empleados</span>
      </button>

      <button
        onClick={() => navigate("/admin/products")}
        className={`flex flex-col items-center ${
          isActive("/admin/products") ? activeClass : inactiveClass
        }`}
      >
        <span className="text-2xl">📦</span>
        <span className="text-xs">Inventario</span>
      </button>

      <button className={`flex flex-col items-center ${inactiveClass}`}>
        <span className="text-2xl">💰</span>
        <span className="text-xs">Finanzas</span>
      </button>

      <button className={`flex flex-col items-center ${inactiveClass}`}>
        <span className="text-2xl">📋</span>
        <span className="text-xs">Reportes</span>
      </button>
    </div>
  );
};

export default Navbar;