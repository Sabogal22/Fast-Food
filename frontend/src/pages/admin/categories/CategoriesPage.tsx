import { useEffect, useState } from "react";
import api from "../../../services/api";
import type { Category } from "../../../types/category";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/navbar";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await api.get("categories/");
      setCategories(response.data);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar las categorías",
        icon: "error",
        confirmButtonColor: "#f97316",
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) {
      Swal.fire({
        title: "Campo requerido",
        text: "El nombre de la categoría es obligatorio",
        icon: "warning",
        confirmButtonColor: "#f97316",
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }

    setLoading(true);
    try {
      await api.post("categories/", { name, description });

      Swal.fire({
        title: "¡Creada!",
        text: "La categoría se creó correctamente",
        icon: "success",
        confirmButtonColor: "#f97316",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      setName("");
      setDescription("");
      fetchCategories();
    } catch {
      Swal.fire({
        title: "Error",
        text: "No se pudo crear la categoría",
        icon: "error",
        confirmButtonColor: "#f97316",
        confirmButtonText: "Entendido",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    const result = await Swal.fire({
      title: "¿Eliminar categoría?",
      html: `Estás a punto de eliminar <strong>${name}</strong><br>Esta acción no se puede deshacer`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`categories/${id}/`);

      Swal.fire({
        title: "¡Eliminada!",
        text: "La categoría se eliminó correctamente",
        icon: "success",
        confirmButtonColor: "#f97316",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      fetchCategories();
    } catch {
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar la categoría",
        icon: "error",
        confirmButtonColor: "#f97316",
        confirmButtonText: "Cerrar",
      });
    }
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditDescription(cat.description || "");
  };

  const handleUpdate = async (id: number) => {
    if (!editName.trim()) {
      Swal.fire({
        title: "Campo requerido",
        text: "El nombre de la categoría es obligatorio",
        icon: "warning",
        confirmButtonColor: "#f97316",
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }

    try {
      await api.put(`categories/${id}/`, {
        name: editName,
        description: editDescription,
      });

      Swal.fire({
        title: "¡Actualizada!",
        text: "La categoría se actualizó correctamente",
        icon: "success",
        confirmButtonColor: "#f97316",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      setEditingId(null);
      fetchCategories();
    } catch {
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar la categoría",
        icon: "error",
        confirmButtonColor: "#f97316",
        confirmButtonText: "Cerrar",
      });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
  };

  // Función para obtener color aleatorio pero consistente para cada categoría
  const getCategoryColor = (id: number) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-green-500 to-green-600",
      "from-purple-500 to-purple-600",
      "from-pink-500 to-pink-600",
      "from-yellow-500 to-yellow-600",
      "from-red-500 to-red-600",
      "from-indigo-500 to-indigo-600",
      "from-orange-500 to-orange-600",
    ];
    return colors[id % colors.length];
  };

  // Filtrar categorías por búsqueda
  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 pb-20">
      {/* Header con diseño mejorado */}
      <div className="bg-linear-to-r from-orange-600 via-orange-500 to-red-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                <span className="text-4xl">📋</span>
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight">
                  Categorías
                </h1>
                <p className="text-orange-100 mt-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-200 rounded-full"></span>
                  Organiza tus productos por categorías
                </p>
              </div>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="text-sm font-medium">
                {categories.length} categorías
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 -mt-8">
        {/* Formulario de creación - Estilo moderno */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-2xl text-white">✨</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Nueva categoría
              </h2>
              <p className="text-sm text-gray-500">
                Completa los campos para crear una nueva categoría
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">
                Nombre <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
                  placeholder="Ej. Bebidas, Postres, etc."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={50}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                  {name.length}/50
                </span>
              </div>
            </div>

            <div className="space-y-1.5 md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700">
                Descripción
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
                  placeholder="Descripción opcional"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={100}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                  {description.length}/100
                </span>
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleCreate}
                disabled={loading || !name.trim()}
                className={`w-full px-6 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  loading || !name.trim()
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Creando...
                  </>
                ) : (
                  <>
                    <span className="text-lg">➕</span>
                    Crear categoría
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total categorías
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {categories.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">📋</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Con descripción
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {categories.filter((c) => c.description).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">📝</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Sin descripción
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {categories.filter((c) => !c.description).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🔍</span>
              </div>
            </div>
          </div>
        </div>

        {/* Listado de categorías */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="px-6 py-5 bg-linear-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-2xl text-white">📌</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Listado de categorías
                  </h2>
                  <p className="text-sm text-gray-500">
                    {filteredCategories.length} categorías encontradas
                  </p>
                </div>
              </div>

              {/* Buscador */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Buscar categoría..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none w-64"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center">
                          <span className="text-5xl">📭</span>
                        </div>
                        <p className="text-gray-600 font-semibold text-lg">
                          {searchTerm
                            ? "No hay resultados"
                            : "No hay categorías"}
                        </p>
                        <p className="text-sm text-gray-400">
                          {searchTerm
                            ? "Intenta con otro término de búsqueda"
                            : "Crea tu primera categoría usando el formulario"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((cat) => (
                    <tr
                      key={cat.id}
                      className="hover:bg-orange-50/30 transition-colors group"
                    >
                      {editingId === cat.id ? (
                        // Modo edición
                        <>
                          <td className="px-6 py-4">
                            <span className="bg-gray-100 px-2 py-1 rounded-lg text-sm font-medium text-gray-600">
                              #{cat.id}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <input
                              className="w-full px-3 py-2 bg-white border-2 border-orange-500 rounded-xl focus:ring-4 focus:ring-orange-100 outline-none text-sm"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              autoFocus
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              className="w-full px-3 py-2 bg-white border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none text-sm"
                              value={editDescription}
                              onChange={(e) =>
                                setEditDescription(e.target.value)
                              }
                              placeholder="Sin descripción"
                            />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleUpdate(cat.id)}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl transition-all flex items-center gap-1 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                              >
                                <span>✅</span>
                                Guardar
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-xl transition-all"
                              >
                                Cancelar
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        // Modo visualización
                        <>
                          <td className="px-6 py-4">
                            <span className="bg-gray-100 px-2 py-1 rounded-lg text-sm font-medium text-gray-600">
                              #{cat.id}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-lg bg-linear-to-br ${getCategoryColor(cat.id)} flex items-center justify-center text-white font-bold text-sm shadow-sm`}
                              >
                                {cat.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-semibold text-gray-900">
                                {cat.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-600">
                              {cat.description || (
                                <span className="text-gray-400 italic">
                                  Sin descripción
                                </span>
                              )}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => startEdit(cat)}
                                className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors"
                                title="Editar"
                              >
                                <span className="text-lg">✏️</span>
                              </button>
                              <button
                                onClick={() => handleDelete(cat.id, cat.name)}
                                className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                                title="Eliminar"
                              >
                                <span className="text-lg">🗑️</span>
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {categories.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Mostrando{" "}
                <span className="font-semibold">
                  {filteredCategories.length}
                </span>{" "}
                de <span className="font-semibold">{categories.length}</span>{" "}
                categorías
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  Última actualización: {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navbar inferior */}
      <Navbar />
    </div>
  );
}
