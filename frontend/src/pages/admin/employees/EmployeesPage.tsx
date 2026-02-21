import Navbar from "../layout/navbar";
import { useState, useEffect } from "react";
import { getEmployees } from "../../../services/employe";

const EmployeesPage = () => {
  // Estado para controlar si el formulario está abierto o cerrado
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (error) {
      console.error("Error trayendo empleados", error);
    }
  };

  // Estado para el formulario
  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "",
    salary: "",
    is_active: true,
  });

  // Estado para saber si estamos editando
  const [editingId, setEditingId] = useState<number | null>(null);

  // Función para obtener el ícono según el rol
  const getRoleIcon = (roleName: string) => {
    switch (roleName?.toLowerCase()) {
      case "administrador":
        return "👑";
      case "cajero":
        return "💰";
      case "cocinero":
        return "👨‍🍳";
      case "domiciliario":
        return "🛵";
      case "mesero":
        return "🍽️";
      default:
        return "👤";
    }
  };

  // NUEVA FUNCIÓN: Obtener color según el rol
  const getRoleColor = (roleName: string) => {
    switch (roleName?.toLowerCase()) {
      case "administrador":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "cajero":
        return "bg-green-100 text-green-700 border-green-200";
      case "cocinero":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "domiciliario":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "mesero":
        return "bg-pink-100 text-pink-700 border-pink-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Función para obtener el color según el estado (is_active)
  const getStatusColor = (isActive: boolean) => {
    return isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";
  };

  // Función para formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Función para formatear la fecha de último login
  const formatLastLogin = (lastLogin: string | null) => {
    if (!lastLogin) return "Nunca";
    return new Date(lastLogin).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Función para obtener el nombre completo
  const getFullName = (employee: any) => {
    return (
      `${employee.first_name || ""} ${employee.last_name || ""}`.trim() ||
      employee.username
    );
  };

  // Funciones simuladas para la vista
  const handleEdit = (employee: any) => {
    setEditingId(employee.id);
    setForm({
      username: employee.username,
      email: employee.email,
      first_name: employee.first_name || "",
      last_name: employee.last_name || "",
      role: employee.role?.toString() || "",
      salary: employee.salary?.toString() || "",
      is_active: employee.is_active,
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(editingId ? "Empleado actualizado (demo)" : "Empleado creado (demo)");

    setShowForm(false);
    setEditingId(null);
    setForm({
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      role: "",
      salary: "",
      is_active: true,
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este empleado? (demo)")) {
      alert(`Empleado ${id} eliminado (demo)`);
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      role: "",
      salary: "",
      is_active: true,
    });
  };

  // Roles quemados para el select
  const roles = [
    "Administrador",
    "Cajero",
    "Cocinero",
    "Domiciliario",
    "Mesero",
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 pb-20">
      {/* Header */}
      <div className="bg-linear-to-r from-orange-600 via-orange-500 to-red-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                <span className="text-4xl">👥</span>
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight">
                  Empleados
                </h1>
                <p className="text-orange-100 mt-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-200 rounded-full"></span>
                  Gestiona el equipo de tu restaurante de comidas rápidas
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="text-sm font-medium">
                  {employees.length} empleados
                </span>
              </div>
              <button
                onClick={() => {
                  setShowForm(true);
                  setEditingId(null);
                  setForm({
                    username: "",
                    email: "",
                    first_name: "",
                    last_name: "",
                    role: "",
                    salary: "",
                    is_active: true,
                  });
                }}
                className="bg-white text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg"
              >
                <span className="text-xl">➕</span>
                Agregar Empleado
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-8xl mx-auto px-6 -mt-8">
        {/* Formulario */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-2xl text-white">
                    {editingId ? "✏️" : "👤"}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {editingId ? "Editar empleado" : "Registrar nuevo empleado"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {editingId
                      ? "Modifica los datos del empleado"
                      : "Completa todos los campos para agregar un empleado"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={cancelForm}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-2xl">✕</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Nombre de usuario */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">
                    Nombre de usuario <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: juan.perez"
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                {/* Nombres */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">
                    Nombres
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Juan Carlos"
                    value={form.first_name}
                    onChange={(e) =>
                      setForm({ ...form, first_name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
                  />
                </div>

                {/* Apellidos */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Pérez Gómez"
                    value={form.last_name}
                    onChange={(e) =>
                      setForm({ ...form, last_name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
                  />
                </div>

                {/* Rol */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">
                    Rol <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Selecciona un rol</option>
                    {roles.map((rol, index) => (
                      <option key={index} value={rol}>
                        {rol}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Salario */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">
                    Salario
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-lg text-sm">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="0"
                      value={form.salary}
                      onChange={(e) =>
                        setForm({ ...form, salary: e.target.value })
                      }
                      className="w-full pl-14 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Estado Activo/Inactivo */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">
                    Estado
                  </label>
                  <div className="flex items-center gap-4 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="is_active"
                        checked={form.is_active === true}
                        onChange={() => setForm({ ...form, is_active: true })}
                        className="w-4 h-4 text-orange-600"
                      />
                      <span className="text-sm text-gray-700">Activo</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="is_active"
                        checked={form.is_active === false}
                        onChange={() => setForm({ ...form, is_active: false })}
                        className="w-4 h-4 text-red-600"
                      />
                      <span className="text-sm text-gray-700">Inactivo</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={cancelForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span className="text-xl">{editingId ? "✏️" : "👤"}</span>
                  {editingId ? "Actualizar Empleado" : "Registrar Empleado"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total empleados
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {employees.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Activos</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {employees.filter((e) => e.is_active).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Inactivos</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {employees.filter((e) => !e.is_active).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">⭕</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Nómina mensual
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {formatCurrency(
                    employees.reduce((acc, emp) => {
                      const salary = Number(emp.salary) || 0;
                      return acc + salary;
                    }, 0),
                  )}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Listado de empleados - CON ROLES DE COLORES */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="px-6 py-5 bg-linear-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-2xl text-white">📋</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Listado de empleados
                </h2>
                <p className="text-sm text-gray-500">
                  {employees.length} empleados en total
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nombre completo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Salario
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Último acceso
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center">
                          <span className="text-5xl">👥</span>
                        </div>
                        <p className="text-gray-600 font-semibold text-lg">
                          No hay empleados registrados
                        </p>
                        <p className="text-sm text-gray-400">
                          Comienza agregando tu primer empleado
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  employees.map((emp) => (
                    <tr
                      key={emp.id}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-linear-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-xl">
                              {getRoleIcon(emp.role)}
                            </span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">
                              @{emp.username}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900">
                          {getFullName(emp)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-gray-500">📧</span>
                          <span className="text-gray-700">{emp.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {/* ROL CON COLORES DIFERENTES - ACTUALIZADO */}
                        <span
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${getRoleColor(emp.role)}`}
                        >
                          {emp.role || "Sin rol"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {emp.salary ? (
                          <span className="font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg">
                            {formatCurrency(emp.salary)}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">
                            No asignado
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(emp.is_active)}`}
                        >
                          {emp.is_active ? "🟢 Activo" : "🔴 Inactivo"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {formatLastLogin(emp.last_login)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(emp)}
                            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <span className="text-lg">✏️</span>
                            <span className="text-sm font-medium">Editar</span>
                          </button>
                          <button
                            onClick={() => handleDelete(emp.id)}
                            className="flex items-center gap-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <span className="text-lg">🗑️</span>
                            <span className="text-sm font-medium">
                              Eliminar
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default EmployeesPage;
