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
        confirmButtonColor: "#3b82f6",
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
        confirmButtonColor: "#3b82f6",
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
        confirmButtonColor: "#3b82f6",
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
        confirmButtonColor: "#3b82f6",
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
        confirmButtonColor: "#3b82f6",
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
        confirmButtonColor: "#3b82f6",
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
        confirmButtonColor: "#3b82f6",
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
        confirmButtonColor: "#3b82f6",
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
        confirmButtonColor: "#3b82f6",
        confirmButtonText: "Cerrar",
      });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
  };

  const showSuccessMessage = (message: string) => {
    Swal.fire({
      title: "Éxito",
      text: message,
      icon: "success",
      confirmButtonColor: "#3b82f6",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 transform rotate-3">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Categorías
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Gestiona las categorías de tus productos
              </p>
            </div>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-600">
              {categories.length} categorías
            </span>
          </div>
        </div>

        {/* Formulario de creación */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8 transform hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">✨</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              Nueva categoría
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none placeholder:text-gray-400"
                placeholder="Ej. Bebidas, Postres, etc."
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
              />
              <span className="absolute right-3 bottom-3 text-xs text-gray-400">
                {name.length}/50
              </span>
            </div>

            <div className="relative md:col-span-1">
              <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">
                Descripción
              </label>
              <input
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none placeholder:text-gray-400"
                placeholder="Descripción opcional"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={100}
              />
              <span className="absolute right-3 bottom-3 text-xs text-gray-400">
                {description.length}/100
              </span>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleCreate}
                disabled={loading || !name.trim()}
                className={`w-full px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  loading || !name.trim()
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl transform hover:scale-[1.02]"
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

        {/* Tabla de categorías */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header de la tabla */}
          <div className="px-6 py-4 bg-linear-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">📌</span>
                <h2 className="font-semibold text-gray-800">
                  Listado de categorías
                </h2>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Buscar categoría..."
                  className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <span className="text-5xl">📭</span>
                        <p className="text-gray-500 font-medium">
                          No hay categorías
                        </p>
                        <p className="text-sm text-gray-400">
                          Crea tu primera categoría usando el formulario
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr
                      key={cat.id}
                      className="hover:bg-blue-50/30 transition-colors group"
                    >
                      {editingId === cat.id ? (
                        // Modo edición
                        <>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <span className="bg-gray-100 px-2 py-1 rounded-lg">
                              #{cat.id}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <input
                              className="w-full px-3 py-2 bg-white border-2 border-blue-500 rounded-lg focus:ring-4 focus:ring-blue-100 outline-none text-sm"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              autoFocus
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              className="w-full px-3 py-2 bg-white border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-sm"
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
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1"
                              >
                                <span>✅</span>
                                Guardar
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                              >
                                Cancelar
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        // Modo visualización
                        <>
                          <td className="px-6 py-4 text-sm font-medium text-gray-500">
                            <span className="bg-gray-100 px-2 py-1 rounded-lg">
                              #{cat.id}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-800">
                                {cat.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {cat.description || (
                              <span className="text-gray-400 italic">
                                Sin descripción
                              </span>
                            )}
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
                <span className="font-semibold">{categories.length}</span>{" "}
                categorías
              </p>
              <button
                onClick={() => {
                  Swal.fire({
                    title: "Exportar categorías",
                    text: "¿Deseas exportar la lista de categorías?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3b82f6",
                    cancelButtonColor: "#6b7280",
                    confirmButtonText: "Sí, exportar",
                    cancelButtonText: "Cancelar",
                  });
                }}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <span>📤</span>
                Exportar
              </button>
            </div>
          )}
        </div>

        {/* Tips rápidos */}
        <div className="mt-6 bg-blue-50 rounded-2xl p-4 border border-blue-200 flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="text-sm font-medium text-blue-800">
              Consejos rápidos:
            </p>
            <p className="text-xs text-blue-600 mt-1">
              • Las categorías te ayudan a organizar tus productos • Puedes
              editar o eliminar categorías en cualquier momento • El nombre es
              obligatorio, la descripción es opcional
            </p>
          </div>
        </div>
        {/* Barra inferior de navegación admin */}
        <Navbar />
      </div>
    </div>
  );
}
