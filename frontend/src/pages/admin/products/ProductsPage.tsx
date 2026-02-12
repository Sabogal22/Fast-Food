import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../../services/products";
import type { Product } from "../../../types/products";
import type { Category } from "../../../types/category";
import { getCategories } from "../../../services/categories";
import Navbar from "../layout/navbar";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      stock: product.stock.toString(),
      minimum_stock: product.minimum_stock?.toString() || "0",
      category: product.category.toString(),
    });
  };

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    minimum_stock: "",
    category: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const fetchCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const datos = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      stock: Number(form.stock),
      minimum_stock: Number(form.minimum_stock),
      category: Number(form.category),
    };

    try {
      if (editingId) {
        await updateProduct(editingId, datos);
        setEditingId(null);
      } else {
        await createProduct(datos);
      }

      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        minimum_stock: "",
        category: "",
      });

      await fetchProducts();
    } catch (error) {
      console.error("Error guardando producto", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      await deleteProduct(id);
      await fetchProducts();
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      minimum_stock: "",
      category: "",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 pb-20">
      {/* Header con diseño mejorado */}
      <div className="bg-linear-to-r from-purple-700 via-purple-600 to-indigo-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                <span className="text-4xl">📦</span>
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight">Productos</h1>
                <p className="text-purple-100 mt-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-200 rounded-full"></span>
                  Gestiona el inventario de tu restaurante
                </p>
              </div>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="text-sm font-medium">{products.length} productos activos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-8xl mx-auto px-6 -mt-8">
        {/* Tarjeta del formulario - Más compacta y elegante */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-2xl text-white">{editingId ? "✏️" : "➕"}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {editingId ? "Editar producto" : "Agregar nuevo producto"}
                </h2>
                <p className="text-sm text-gray-500">
                  {editingId ? "Modifica los datos del producto" : "Completa todos los campos para agregar un producto"}
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
              {/* Nombre del producto */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Nombre del producto <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej: Hamburguesa Clásica"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              {/* Precio */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Precio <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-lg text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    className="w-full pl-14 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Stock */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Stock disponible <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              {/* Stock mínimo */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Stock mínimo
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={form.minimum_stock}
                  onChange={(e) =>
                    setForm({ ...form, minimum_stock: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Categoría */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Categoría <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Descripción - Ocupa 2 columnas en lg */}
              <div className="lg:col-span-2 space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Descripción
                </label>
                <textarea
                  placeholder="Describe el producto, ingredientes, etc."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-gray-50 focus:bg-white resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                type="submit"
                className="bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span className="text-xl">{editingId ? "✏️" : "➕"}</span>
                {editingId ? "Actualizar Producto" : "Crear Producto"}
              </button>
            </div>
          </form>
        </div>

        {/* Estadísticas rápidas - Diseño más moderno */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total productos</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {products.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Stock total</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {products.reduce((acc, prod) => acc + prod.stock, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">📊</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Categorías</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {categories.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🏷️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Listado de productos - Diseño mejorado */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="px-6 py-5 bg-linear-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-2xl text-white">📋</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Listado de productos
                  </h2>
                  <p className="text-sm text-gray-500">
                    {products.length} productos en total
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center">
                          <span className="text-5xl">🍔</span>
                        </div>
                        <p className="text-gray-600 font-semibold text-lg">
                          No hay productos registrados
                        </p>
                        <p className="text-sm text-gray-400">
                          Comienza agregando tu primer producto usando el formulario
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map((prod) => (
                    <tr
                      key={prod.id}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-linear-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-xl">🍽️</span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">
                              {prod.name}
                            </span>
                            {prod.description && (
                              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                                {prod.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-lg">
                          ${new Intl.NumberFormat("es-CO").format(prod.price)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                              prod.stock < 10
                                ? "bg-red-100 text-red-700"
                                : prod.stock < 30
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {prod.stock} {prod.stock === 1 ? "unidad" : "unidades"}
                          </span>
                          {prod.minimum_stock && prod.stock <= prod.minimum_stock && (
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                              Stock bajo
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1.5 bg-linear-to-r from-purple-100 to-purple-50 text-purple-700 rounded-lg text-sm font-medium">
                          {categories.find((cat) => cat.id === prod.category)
                            ?.name || "Sin categoría"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(prod)}
                            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <span className="text-lg">✏️</span>
                            <span className="text-sm font-medium">Editar</span>
                          </button>
                          <button
                            onClick={() => handleDelete(prod.id)}
                            className="flex items-center gap-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <span className="text-lg">🗑️</span>
                            <span className="text-sm font-medium">Eliminar</span>
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

export default ProductsPage;