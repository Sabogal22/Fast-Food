import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/auth/Login";
/* importaciones del Mesero */
import MeseroDashboard from "./pages/mesero/Dashboard";
/* importaciones del Cocinero */
import CocinaDashboard from "./pages/cocina/Dashboard";
/* importaciones del Cajero */
import CajeroDashboard from "./pages/cajero/Dashboard";
/* importaciones del Domiciliario */
import DomiciliarioDashboard from "./pages/domiciliario/Dashboard";
/* importaciones del Administrador */
import AdminDashboard from "./pages/admin/Dashboard";
import CategoriesPage from "./pages/admin/categories/CategoriesPage";
import ProductsPage from "./pages/admin/products/ProductsPage";
import EmployeesPage from "./pages/admin/employees/EmployeesPage";

function App() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <Routes>
      {/* Ruta para el Mesero */}
      {user.role === "mesero" && (
        <Route path="/" element={<MeseroDashboard />} />
      )}
      {/* Ruta para el Cocinero */}
      {user.role === "cocina" && (
        <Route path="/" element={<CocinaDashboard />} />
      )}
      {/* Ruta para el Cajero */}
      {user.role === "cajero" && (
        <Route path="/" element={<CajeroDashboard />} />
      )}
      {/* Ruta para el Administrador */}
      {user.role === "admin" && (
        <>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/admin/categories" element={<CategoriesPage />} />
          <Route path="/admin/products" element={<ProductsPage />} />
          <Route path="/admin/employees" element={<EmployeesPage />} />
        </>
      )}
      {/* Ruta para el Domiciliario */}
      {user.role === "domiciliario" && (
        <Route path="/" element={<DomiciliarioDashboard />} />
      )}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
