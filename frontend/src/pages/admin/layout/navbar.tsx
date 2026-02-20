import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const activeClass = "text-purple-600";
  const inactiveClass = "text-gray-600 hover:text-purple-600";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("access");
    navigate("/");
    window.location.reload();
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around items-center shadow-lg">
      {/* Dashboard */}
      <button
        onClick={() => navigate("/")}
        className={`flex flex-col items-center ${
          isActive("/") ? activeClass : inactiveClass
        }`}
      >
        <span className="text-2xl">📊</span>
        <span className="text-xs">Dashboard</span>
      </button>

      {/* Empleados */}
      <button
        onClick={() => navigate("/admin/employees")}
        className={`flex flex-col items-center ${
          isActive("/admin/employees") ? activeClass : inactiveClass
        }`}
      >
        <span className="text-2xl">👥</span>
        <span className="text-xs">Empleados</span>
      </button>

      {/* Inventario */}
      <button
        onClick={() => navigate("/admin/products")}
        className={`flex flex-col items-center ${
          isActive("/admin/products") ? activeClass : inactiveClass
        }`}
      >
        <span className="text-2xl">📦</span>
        <span className="text-xs">Inventario</span>
      </button>
      <button
        onClick={() => {
          navigate("/admin/reports");
          setShowMenu(false);
        }}
        className="flex flex-col items-center text-gray-600 hover:text-purple-600"
      >
        <span className="text-xl">📋</span>
        <span className="text-sm">Reportes</span>
      </button>

      <button
        onClick={() => {
          handleLogout();
          setShowMenu(false);
        }}
        className="flex flex-col items-center text-gray-600 hover:text-purple-600"
      >
        <span className="text-xl">🚪</span>
        <span className="text-sm font-medium">Cerrar sesión</span>
      </button>
    </div>
  );
};

export default Navbar;
