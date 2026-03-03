import { useEffect, useState } from "react";
import Navbar from "../layout/navbar";
import type { Ingredient } from "../../../types/products";
import {
  getIngredients,
  createIngredients,
  updateIngredients,
  deleteIngredients,
  getUnits,
} from "../../../services/ingredients";

// Función para formatear moneda colombiana
const formatCOP = (value: number | null): string => {
  if (value === null) return "-";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Función para formatear número con unidad
const formatWithUnit = (value: number, unit: string): string => {
  const formattedValue = new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value);

  const unitSymbols: Record<string, string> = {
    g: "g",
    kg: "kg",
    u: "unid",
    ml: "ml",
    l: "L",
  };

  return `${formattedValue} ${unitSymbols[unit] || unit}`;
};

const IngredientsPage = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterLowStock, setFilterLowStock] = useState(false);
  const [units, setUnits] = useState<{ value: string; label: string }[]>([]);

  // Estado del formulario
  const [form, setForm] = useState({
    name: "",
    stock: "",
    unit: "u",
    minimum_stock: "",
    supplier: "",
    purchase_cost: "",
    supplier_contact: "",
  });

  // Cargar ingredientes al montar el componente
  useEffect(() => {
    fetchIngredients();
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      const response = await getUnits();
      setUnits(response.data);
    } catch (err) {
      console.log("Error fetching units", err);
    }
  };

  const fetchIngredients = async () => {
    try {
      setLoading(true);
      const response = await getIngredients();
      setIngredients(response.data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los ingredientes");
      console.error("Error fetching ingredients:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ingredient: Ingredient) => {
    setEditingId(ingredient.id);
    setForm({
      name: ingredient.name,
      stock: ingredient.stock.toString(),
      unit: ingredient.unit,
      minimum_stock: ingredient.minimum_stock.toString(),
      supplier: ingredient.supplier || "",
      purchase_cost: ingredient.purchase_cost?.toString() || "",
      supplier_contact: ingredient.supplier_contact || "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos requeridos
    if (!form.name || !form.stock || !form.unit) {
      alert("Por favor completa los campos requeridos");
      return;
    }

    const ingredientData = {
      name: form.name,
      stock: Number(form.stock),
      unit: form.unit,
      minimum_stock: Number(form.minimum_stock) || 0,
      supplier: form.supplier || null,
      purchase_cost: form.purchase_cost ? Number(form.purchase_cost) : null,
      supplier_contact: form.supplier_contact || null,
    };

    try {
      if (editingId) {
        await updateIngredients(editingId, ingredientData);
      } else {
        await createIngredients(ingredientData);
      }

      // Recargar la lista
      await fetchIngredients();

      // Resetear formulario
      setEditingId(null);
      setForm({
        name: "",
        stock: "",
        unit: "u",
        minimum_stock: "",
        supplier: "",
        purchase_cost: "",
        supplier_contact: "",
      });
    } catch (err) {
      console.error("Error saving ingredient:", err);
      alert("Error al guardar el ingrediente");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este ingrediente?")) {
      try {
        await deleteIngredients(id);
        await fetchIngredients();
      } catch (err) {
        console.error("Error deleting ingredient:", err);
        alert("Error al eliminar el ingrediente");
      }
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      name: "",
      stock: "",
      unit: "u",
      minimum_stock: "",
      supplier: "",
      purchase_cost: "",
      supplier_contact: "",
    });
  };

  const filteredIngredients = filterLowStock
  ? ingredients.filter(ing => ing.is_low_stock)
  : ingredients;

  // Estadísticas - CORREGIDO: Solo contar bajo stock si minimum_stock > 0
  const totalValue = ingredients.reduce((sum, ing) => {
    if (ing.purchase_cost) {
      return sum + ing.stock * ing.purchase_cost;
    }
    return sum;
  }, 0);

  const lowStockCount = ingredients.filter(ing => ing.is_low_stock).length;

  // Si está cargando
  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando ingredientes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 pb-20">
      {/* Header */}
      <div className="bg-linear-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                <span className="text-4xl">🥗</span>
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight">
                  Ingredientes
                </h1>
                <p className="text-emerald-100 mt-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-200 rounded-full"></span>
                  Gestiona el inventario de tu cocina
                </p>
              </div>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="text-sm font-medium">
                {ingredients.length} ingredientes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-8xl mx-auto px-6 -mt-8">
        {/* Mensaje de error */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <span>{error}</span>
            <button
              onClick={fetchIngredients}
              className="ml-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Tarjeta del formulario */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-2xl text-white">
                  {editingId ? "✏️" : "➕"}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {editingId
                    ? "Editar ingrediente"
                    : "Agregar nuevo ingrediente"}
                </h2>
                <p className="text-sm text-gray-500">
                  {editingId
                    ? "Modifica los datos del ingrediente"
                    : "Completa los campos para agregar un ingrediente"}
                </p>
              </div>
            </div>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
              >
                <span>✕</span>
                Cancelar
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Nombre */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Nombre del ingrediente <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej: Carne de res"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              {/* Stock */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Stock actual <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              {/* Unidad */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Unidad de medida <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                  required
                >
                  {units.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stock mínimo - CORREGIDO: Agregué placeholder con valor sugerido */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Stock mínimo{" "}
                  <span className="text-gray-400 text-xs">
                    (opcional, 0 = sin alerta)
                  </span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Ej: 5 para kg, 20 para unidades"
                  value={form.minimum_stock}
                  onChange={(e) =>
                    setForm({ ...form, minimum_stock: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Proveedor */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Proveedor
                </label>
                <input
                  type="text"
                  placeholder="Ej: Carnes El Ganadero"
                  value={form.supplier}
                  onChange={(e) =>
                    setForm({ ...form, supplier: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Contacto del proveedor */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Contacto del proveedor
                </label>
                <input
                  type="text"
                  placeholder="Ej: Carlos Méndez"
                  value={form.supplier_contact}
                  onChange={(e) =>
                    setForm({ ...form, supplier_contact: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Costo de compra */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Costo de compra
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-lg text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    step="100"
                    min="0"
                    placeholder="0"
                    value={form.purchase_cost}
                    onChange={(e) =>
                      setForm({ ...form, purchase_cost: e.target.value })
                    }
                    className="w-full pl-14 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                type="submit"
                className="bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span className="text-xl">{editingId ? "✏️" : "➕"}</span>
                {editingId ? "Actualizar Ingrediente" : "Crear Ingrediente"}
              </button>
            </div>
          </form>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total ingredientes
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {ingredients.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🥗</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Stock bajo</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {lowStockCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">⚠️</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Valor en inventario
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {formatCOP(totalValue)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Proveedores</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {
                    new Set(
                      ingredients.map((ing) => ing.supplier).filter(Boolean),
                    ).size
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🚚</span>
              </div>
            </div>
          </div>
        </div>

        {/* Listado con filtros */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="px-6 py-5 bg-linear-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-2xl text-white">📋</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Listado de ingredientes
                  </h2>
                  <p className="text-sm text-gray-500">
                    {filteredIngredients.length} ingredientes{" "}
                    {filterLowStock ? "(stock bajo)" : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-lg">🔍</span>
                  Filtros
                </button>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterLowStock}
                    onChange={(e) => setFilterLowStock(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-600">
                    Mostrar solo stock bajo
                  </span>
                </label>
              </div>
            </div>

            {/* Panel de filtros (opcional) */}
            {showFilters && (
              <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
                <p className="text-sm text-gray-500">
                  Aquí irán más filtros (por proveedor, unidad, etc.)
                </p>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ingrediente
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stock Mínimo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Proveedor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Costo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredIngredients.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center">
                          <span className="text-5xl">🥕</span>
                        </div>
                        <p className="text-gray-600 font-semibold text-lg">
                          No hay ingredientes registrados
                        </p>
                        <p className="text-sm text-gray-400">
                          Comienza agregando tu primer ingrediente usando el
                          formulario
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredIngredients.map((ing) => {
                    const isLowStock = ing.is_low_stock;

                    return (
                      <tr
                        key={ing.id}
                        className={`hover:bg-gray-50 transition-colors group ${
                          isLowStock ? "bg-orange-50/30" : ""
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-linear-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                              <span className="text-xl">🥘</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-900">
                                {ing.name}
                              </span>
                              {ing.supplier_contact && (
                                <p className="text-xs text-gray-500 mt-0.5">
                                  Contacto: {ing.supplier_contact}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                                isLowStock
                                  ? "bg-red-100 text-red-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {formatWithUnit(ing.stock, ing.unit)}
                            </span>
                            {isLowStock && (
                              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                                ¡Comprar!
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {ing.minimum_stock > 0 ? (
                            <span className="text-gray-600">
                              {formatWithUnit(ing.minimum_stock, ing.unit)}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {ing.supplier ? (
                            <div>
                              <span className="font-medium text-gray-900">
                                {ing.supplier}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {ing.purchase_cost ? (
                            <span className="font-medium text-gray-900">
                              {formatCOP(ing.purchase_cost)}
                              <span className="text-xs text-gray-500 ml-1">
                                /{ing.unit}
                              </span>
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(ing)}
                              className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              <span className="text-lg">✏️</span>
                              <span className="text-sm font-medium">
                                Editar
                              </span>
                            </button>
                            <button
                              onClick={() => handleDelete(ing.id)}
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
                    );
                  })
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

export default IngredientsPage;
