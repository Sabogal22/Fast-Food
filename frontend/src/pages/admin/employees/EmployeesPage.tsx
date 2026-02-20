import Navbar from "../layout/navbar";
import { useState } from "react";

const EmployeesPage = () => {
  // Estado para controlar si el formulario está abierto o cerrado
  const [showForm, setShowForm] = useState(false);
  
  // Datos quemados para la vista
  const [employees] = useState([
    {
      id: 1,
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@fastfood.com",
      phone: "+57 321 654 9870",
      position: "Cajero Principal",
      role: "Cajero",
      hire_date: "2023-05-15",
      salary: 1800000,
      schedule: "Lunes a Viernes 8am-5pm",
      status: "activo",
    },
    {
      id: 2,
      name: "María Fernanda López",
      email: "maria.lopez@fastfood.com",
      phone: "+57 310 234 5678",
      position: "Cocinera",
      role: "Cocinero",
      hire_date: "2023-08-20",
      salary: 2000000,
      schedule: "Martes a Sábado 2pm-10pm",
      status: "activo",
    },
    {
      id: 3,
      name: "Jhonatan Pérez",
      email: "jhonatan.perez@fastfood.com",
      phone: "+57 315 789 1234",
      position: "Domiciliario",
      role: "Domiciliario",
      hire_date: "2024-01-10",
      salary: 1600000,
      schedule: "Lunes a Sábado 10am-6pm",
      status: "descanso",
    },
    {
      id: 4,
      name: "Laura Martínez",
      email: "laura.martinez@fastfood.com",
      phone: "+57 301 456 7890",
      position: "Administradora",
      role: "Administrador",
      hire_date: "2022-11-03",
      salary: 2800000,
      schedule: "Lunes a Viernes 9am-6pm",
      status: "activo",
    },
    {
      id: 5,
      name: "Andrés Camilo Restrepo",
      email: "andres.restrepo@fastfood.com",
      phone: "+57 322 567 8901",
      position: "Mesero",
      role: "Mesero",
      hire_date: "2024-03-22",
      salary: 1400000,
      schedule: "Viernes a Domingo 4pm-11pm",
      status: "activo",
    },
    {
      id: 6,
      name: "Diana Patricia Gómez",
      email: "diana.gomez@fastfood.com",
      phone: "+57 318 678 9012",
      position: "Cajera",
      role: "Cajero",
      hire_date: "2023-09-14",
      salary: 1700000,
      schedule: "Miércoles a Domingo 11am-7pm",
      status: "vacaciones",
    },
  ]);

  // Estado para el formulario
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    role: "",
    hire_date: "",
    salary: "",
    schedule: "",
    status: "activo",
  });

  // Estado para saber si estamos editando
  const [editingId, setEditingId] = useState<number | null>(null);

  // Función para obtener el ícono según el rol
  const getRoleIcon = (roleName: string) => {
    switch (roleName.toLowerCase()) {
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

  // Función para obtener el color según el estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "activo":
        return "bg-green-100 text-green-700";
      case "descanso":
        return "bg-yellow-100 text-yellow-700";
      case "vacaciones":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Función para formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Funciones simuladas para la vista
  const handleEdit = (employee: any) => {
    setEditingId(employee.id);
    setForm({
      name: employee.name,
      email: employee.email,
      phone: employee.phone || "",
      position: employee.position,
      role: employee.role,
      hire_date: employee.hire_date,
      salary: employee.salary.toString(),
      schedule: employee.schedule || "",
      status: employee.status,
    });
    setShowForm(true); // Abrir el formulario cuando se edita
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(editingId ? "Empleado actualizado (demo)" : "Empleado creado (demo)");
    
    // Cerrar formulario y limpiar después de guardar
    setShowForm(false);
    setEditingId(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      position: "",
      role: "",
      hire_date: "",
      salary: "",
      schedule: "",
      status: "activo",
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
      name: "",
      email: "",
      phone: "",
      position: "",
      role: "",
      hire_date: "",
      salary: "",
      schedule: "",
      status: "activo",
    });
  };

  // Roles quemados para el select
  const roles = ["Administrador", "Cajero", "Cocinero", "Domiciliario", "Mesero"];

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
                <h1 className="text-4xl font-black tracking-tight">Empleados</h1>
                <p className="text-orange-100 mt-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-200 rounded-full"></span>
                  Gestiona el equipo de tu restaurante de comidas rápidas
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="text-sm font-medium">{employees.length} empleados</span>
              </div>
              {/* Botón para abrir el formulario */}
              <button
                onClick={() => {
                  setShowForm(true);
                  setEditingId(null);
                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    position: "",
                    role: "",
                    hire_date: "",
                    salary: "",
                    schedule: "",
                    status: "activo",
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
        {/* Formulario - Solo se muestra si showForm es true */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-2xl text-white">{editingId ? "✏️" : "👤"}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {editingId ? "Editar empleado" : "Registrar nuevo empleado"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {editingId ? "Modifica los datos del empleado" : "Completa todos los campos para agregar un empleado"}
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
                {/* Nombre completo */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">
                    Nombre completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Juan Pérez"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
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
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
                  />
                </div>

                {/* Teléfono */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    placeholder="+57 300 123 4567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
                  />
                </div>

                {/* Cargo */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">
                    Cargo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Cajero, Cocinero, Domiciliario"
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
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
                  >
                    <option value="">Selecciona un rol</option>
                    {roles.map((rol, index) => (
                      <option key={index} value={rol}>
                        {rol}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fecha de contratación */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">
                    Fecha de contratación <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.hire_date}
                    onChange={(e) => setForm({ ...form, hire_date: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
                  />
                </div>

                {/* Salario */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">
                    Salario <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-lg text-sm">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="0"
                      value={form.salary}
                      onChange={(e) => setForm({ ...form, salary: e.target.value })}
                      className="w-full pl-14 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Estado */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">
                    Estado <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                  >
                    <option value="activo">Activo</option>
                    <option value="descanso">Descanso</option>
                    <option value="vacaciones">Vacaciones</option>
                  </select>
                </div>

                {/* Horario */}
                <div className="lg:col-span-2 space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">
                    Horario de trabajo
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Lunes a Viernes 8am-5pm, Sábados 9am-1pm"
                    value={form.schedule}
                    onChange={(e) => setForm({ ...form, schedule: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
                  />
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
                <p className="text-sm text-gray-500 font-medium">Total empleados</p>
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
                <p className="text-sm text-gray-500 font-medium">Activos hoy</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {employees.filter(e => e.status === "activo").length}
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
                <p className="text-sm text-gray-500 font-medium">En descanso</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {employees.filter(e => e.status === "descanso").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">☕</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Nómina mensual</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {formatCurrency(employees.reduce((acc, emp) => acc + emp.salary, 0))}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Listado de empleados */}
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
                    Empleado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Cargo / Rol
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Salario
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-xl">{getRoleIcon(emp.role)}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900">
                            {emp.name}
                          </span>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Desde {new Date(emp.hire_date).toLocaleDateString("es-ES", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-gray-500">📧</span>
                          <span className="text-gray-700">{emp.email}</span>
                        </div>
                        {emp.phone && (
                          <div className="flex items-center gap-1 text-sm">
                            <span className="text-gray-500">📞</span>
                            <span className="text-gray-700">{emp.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <span className="font-medium text-gray-900">
                          {emp.position}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                            {emp.role}
                          </span>
                        </div>
                        {emp.schedule && (
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <span>⏰</span>
                            {emp.schedule}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg">
                        {formatCurrency(emp.salary)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(emp.status)}`}>
                        {emp.status === "activo" && "🟢 Activo"}
                        {emp.status === "descanso" && "🟡 En descanso"}
                        {emp.status === "vacaciones" && "🔵 Vacaciones"}
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
                          <span className="text-sm font-medium">Eliminar</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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