import { useState } from "react";
import Navbar from "../layout/navbar";

const MenuPage = () => {
  // Datos de prueba del menú actualizado
  const [menuData] = useState({
    categorias: [
      {
        id: 1,
        nombre: "Hamburguesas",
        icono: "🍔",
        color: "from-orange-500 to-red-500",
        productos: [
          {
            id: 1,
            nombre: "Hamburguesa Clásica",
            descripcion:
              "Pan, carne 150g, lechuga, tomate, cebolla, salsa de la casa",
            precio: 15000,
            imagen: "🍔",
            disponible: true,
            destacado: true,
          },
          {
            id: 2,
            nombre: "Hamburguesa Doble Carne",
            descripcion:
              "Doble carne 300g, queso cheddar, tocineta, cebolla caramelizada",
            precio: 22000,
            imagen: "🍔",
            disponible: true,
            destacado: true,
          },
          {
            id: 3,
            nombre: "Hamburguesa Pollo Crispy",
            descripcion:
              "Pollo apanado, lechuga, tomate, salsa ranch, queso mozzarella",
            precio: 18000,
            imagen: "🍗",
            disponible: false,
            destacado: false,
          },
          {
            id: 4,
            nombre: "Hamburguesa Hawaiana",
            descripcion:
              "Carne 150g, piña caramelizada, tocineta, queso americano",
            precio: 19000,
            imagen: "🍍",
            disponible: true,
            destacado: false,
          },
        ],
      },
      {
        id: 2,
        nombre: "Perros Calientes",
        icono: "🌭",
        color: "from-red-500 to-rose-600",
        productos: [
          {
            id: 5,
            nombre: "Perro Sencillo",
            descripcion: "Pan, salchicha americana, papa cabello, salsas",
            precio: 10000,
            imagen: "🌭",
            disponible: true,
            destacado: false,
          },
          {
            id: 6,
            nombre: "Perro Especial",
            descripcion:
              "Pan, salchicha americana, tocineta, queso cheddar, papa cabello, salsas",
            precio: 14000,
            imagen: "🥓",
            disponible: true,
            destacado: true,
          },
        ],
      },
      {
        id: 3,
        nombre: "Salchipapas",
        icono: "🍟",
        color: "from-yellow-600 to-amber-700",
        productos: [
          {
            id: 7,
            nombre: "Salchipapa Sencilla",
            descripcion:
              "Papas a la francesa con salchicha americana en rodajas, salsas",
            precio: 10000,
            imagen: "🍟",
            disponible: true,
            destacado: false,
          },
          {
            id: 8,
            nombre: "Salchipapa Especial",
            descripcion:
              "Papas, salchicha, queso derretido, tocineta, maicitito, salsas",
            precio: 15000,
            imagen: "🧀",
            disponible: true,
            destacado: true,
          },
          {
            id: 9,
            nombre: "Salchipapa Mixta",
            descripcion:
              "Papas, salchicha, carne desmechada, pollo, queso, salsas",
            precio: 18000,
            imagen: "🥩",
            disponible: true,
            destacado: true,
          },
          {
            id: 10,
            nombre: "Salchipapa Hawaiana",
            descripcion: "Papas, salchicha, piña caramelizada, tocineta, queso",
            precio: 16000,
            imagen: "🍍",
            disponible: true,
            destacado: false,
          },
          {
            id: 11,
            nombre: "Salchipapa con Huevo",
            descripcion: "Papas, salchicha, huevo de codorniz, queso, salsas",
            precio: 14000,
            imagen: "🥚",
            disponible: true,
            destacado: false,
          },
        ],
      },
      {
        id: 4,
        nombre: "Arepas",
        icono: "🫓",
        color: "from-yellow-500 to-amber-600",
        productos: [
          {
            id: 12,
            nombre: "Arepa Sencilla",
            descripcion: "Arepa de maíz pelao, mantequilla y queso rallado",
            precio: 5000,
            imagen: "🫓",
            disponible: true,
            destacado: false,
          },
          {
            id: 13,
            nombre: "Arepa con Queso",
            descripcion: "Arepa rellena de queso mozzarella derretido",
            precio: 8000,
            imagen: "🧀",
            disponible: true,
            destacado: true,
          },
        ],
      },
      {
        id: 5,
        nombre: "Arepas Rellenas",
        icono: "🥪",
        color: "from-amber-500 to-orange-600",
        productos: [
          {
            id: 14,
            nombre: "Arepa Rellena de Carne",
            descripcion:
              "Arepa de maíz rellena de carne desmechada, queso y salsa de la casa",
            precio: 12000,
            imagen: "🥩",
            disponible: true,
            destacado: true,
          },
          {
            id: 15,
            nombre: "Arepa Rellena de Pollo",
            descripcion:
              "Arepa de maíz rellena de pollo desmechado, queso y aguacate",
            precio: 12000,
            imagen: "🍗",
            disponible: true,
            destacado: false,
          },
          {
            id: 16,
            nombre: "Arepa Rellena Mixta",
            descripcion:
              "Arepa de maíz rellena de carne, pollo, queso y todos los ingredientes",
            precio: 16000,
            imagen: "🥙",
            disponible: true,
            destacado: true,
          },
          {
            id: 17,
            nombre: "Arepa Rellena de Queso",
            descripcion:
              "Arepa de maíz rellena de queso mozzarella y bocadillo",
            precio: 9000,
            imagen: "🧀",
            disponible: true,
            destacado: false,
          },
        ],
      },
      {
        id: 6,
        nombre: "Helados Cream Helado",
        icono: "🍦",
        color: "from-pink-400 to-purple-400",
        productos: [
          {
            id: 18,
            nombre: "Cono Sencillo",
            descripcion:
              "Delicioso cono de crema, sabores: fresa, chocolate, vainilla",
            precio: 4000,
            imagen: "🍦",
            disponible: true,
            destacado: false,
          },
          {
            id: 19,
            nombre: "Cono Relleno",
            descripcion:
              "Cono relleno de crema con salsa de chocolate y chispas",
            precio: 6000,
            imagen: "🍦",
            disponible: true,
            destacado: true,
          },
          {
            id: 20,
            nombre: "Vaso de Helado",
            descripcion:
              "Vaso de crema con dos sabores, salsa y topping a elección",
            precio: 7000,
            imagen: "🥤",
            disponible: true,
            destacado: false,
          },
          {
            id: 21,
            nombre: "Malteada",
            descripcion:
              "Malteada de crema, sabores: fresa, chocolate, vainilla, oreo",
            precio: 8000,
            imagen: "🥛",
            disponible: true,
            destacado: true,
          },
          {
            id: 22,
            nombre: "Sundae",
            descripcion:
              "Crema, salsa de chocolate, caramelo o fresa, crema de leche, cereza",
            precio: 9000,
            imagen: "🍨",
            disponible: true,
            destacado: true,
          },
          {
            id: 23,
            nombre: "Banana Split",
            descripcion:
              "Banana, tres bolas de crema, salsas, crema de leche, cereza",
            precio: 12000,
            imagen: "🍌",
            disponible: true,
            destacado: true,
          },
          {
            id: 24,
            nombre: "Helado de M&M's",
            descripcion:
              "Crema de vainilla con M&M's, salsa de chocolate y crema",
            precio: 10000,
            imagen: "🍫",
            disponible: false,
            destacado: false,
          },
        ],
      },
      {
        id: 7,
        nombre: "Bebidas",
        icono: "🥤",
        color: "from-blue-500 to-cyan-600",
        productos: [
          {
            id: 25,
            nombre: "Gaseosa Personal",
            descripcion: "Coca-Cola, Pepsi, Colombiana, 400ml",
            precio: 3000,
            imagen: "🥤",
            disponible: true,
            destacado: false,
          },
          {
            id: 26,
            nombre: "Gaseosa 1.5L",
            descripcion: "Coca-Cola, Pepsi, Colombiana, 1.5 litros",
            precio: 7000,
            imagen: "🧃",
            disponible: true,
            destacado: false,
          },
          {
            id: 27,
            nombre: "Jugo Natural",
            descripcion:
              "En agua o en leche, sabores: mango, mora, lulo, maracuyá",
            precio: 5000,
            imagen: "🧋",
            disponible: true,
            destacado: true,
          },
          {
            id: 28,
            nombre: "Limonada Natural",
            descripcion: "Limonada bien fría con hierbabuena",
            precio: 4000,
            imagen: "🍋",
            disponible: true,
            destacado: false,
          },
        ],
      },
      {
        id: 8,
        nombre: "Complementos",
        icono: "🍟",
        color: "from-yellow-600 to-amber-700",
        productos: [
          {
            id: 29,
            nombre: "Porción de Papas",
            descripcion: "Papas a la francesa con salsa de la casa",
            precio: 6000,
            imagen: "🍟",
            disponible: true,
            destacado: false,
          },
          {
            id: 30,
            nombre: "Porción de Nuggets",
            descripcion: "6 nuggets de pollo con salsa BBQ",
            precio: 8000,
            imagen: "🍗",
            disponible: true,
            destacado: false,
          },
          {
            id: 31,
            nombre: "Anillos de Cebolla",
            descripcion: "Porción de anillos de cebolla apanados",
            precio: 7000,
            imagen: "🧅",
            disponible: true,
            destacado: true,
          },
        ],
      },
    ],
  });

  // Estado para filtros
  const [filter, setFilter] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");

  // Función para formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Filtrar productos por búsqueda
  const getFilteredProducts = () => {
    if (!searchTerm) return menuData.categorias;

    return menuData.categorias
      .map((categoria) => ({
        ...categoria,
        productos: categoria.productos.filter(
          (p) =>
            p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      }))
      .filter((categoria) => categoria.productos.length > 0);
  };

  const filteredData = getFilteredProducts();

  // Totales por categorías principales
  const totales = {
    hamburguesas: menuData.categorias[0].productos.length,
    perros: menuData.categorias[1].productos.length,
    salchipapas: menuData.categorias[2].productos.length,
    arepas:
      menuData.categorias[3].productos.length +
      menuData.categorias[4].productos.length,
    helados: menuData.categorias[5].productos.length,
    bebidas: menuData.categorias[6].productos.length,
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 pb-24">
      {/* Header - Full width */}
      <div className="bg-linear-to-r from-orange-600 via-orange-500 to-red-600 text-white shadow-lg w-full">
        <div className="px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                <span className="text-4xl">📋</span>
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight">Menú</h1>
                <p className="text-orange-100 mt-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-200 rounded-full"></span>
                  Gestiona los productos de tu restaurante de comidas rápidas
                </p>
              </div>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="text-sm font-medium">
                {menuData.categorias.reduce(
                  (acc, cat) => acc + cat.productos.length,
                  0,
                )}{" "}
                productos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal - Full width con padding lateral */}
      <div className="w-full px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Barra de herramientas */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Buscador */}
            <div className="relative w-full lg:w-96">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Buscar producto por nombre o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
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

            {/* Filtros rápidos */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("todos")}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  filter === "todos"
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-500/30"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilter("destacados")}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  filter === "destacados"
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-500/30"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                ⭐ Destacados
              </button>
              <button
                onClick={() => setFilter("disponibles")}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  filter === "disponibles"
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-500/30"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                ✅ Disponibles
              </button>
            </div>

            {/* Botón agregar producto */}
            <button className="bg-linear-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <span className="text-xl">➕</span>
              Nuevo Producto
            </button>
          </div>
        </div>

        {/* Resumen rápido de categorías - Grid responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-8">
          <div className="bg-linear-to-br from-orange-500 to-red-500 text-white rounded-xl p-4 text-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <span className="text-3xl block mb-1">🍔</span>
            <span className="text-xs font-medium">Hamburguesas</span>
            <span className="text-lg font-bold block">
              {totales.hamburguesas}
            </span>
          </div>
          <div className="bg-linear-to-br from-red-500 to-rose-600 text-white rounded-xl p-4 text-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <span className="text-3xl block mb-1">🌭</span>
            <span className="text-xs font-medium">Perros</span>
            <span className="text-lg font-bold block">{totales.perros}</span>
          </div>
          <div className="bg-linear-to-br from-yellow-600 to-amber-700 text-white rounded-xl p-4 text-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <span className="text-3xl block mb-1">🍟</span>
            <span className="text-xs font-medium">Salchipapas</span>
            <span className="text-lg font-bold block">
              {totales.salchipapas}
            </span>
          </div>
          <div className="bg-linear-to-br from-yellow-500 to-amber-600 text-white rounded-xl p-4 text-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <span className="text-3xl block mb-1">🫓</span>
            <span className="text-xs font-medium">Arepas</span>
            <span className="text-lg font-bold block">{totales.arepas}</span>
          </div>
          <div className="bg-linear-to-br from-pink-400 to-purple-400 text-white rounded-xl p-4 text-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <span className="text-3xl block mb-1">🍦</span>
            <span className="text-xs font-medium">Helados</span>
            <span className="text-lg font-bold block">{totales.helados}</span>
          </div>
          <div className="bg-linear-to-br from-blue-500 to-cyan-600 text-white rounded-xl p-4 text-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <span className="text-3xl block mb-1">🥤</span>
            <span className="text-xs font-medium">Bebidas</span>
            <span className="text-lg font-bold block">{totales.bebidas}</span>
          </div>
        </div>

        {/* Categorías y productos - Full width */}
        <div className="space-y-8">
          {filteredData.map((categoria) => (
            <div
              key={categoria.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 w-full"
            >
              {/* Header de categoría */}
              <div
                className={`bg-linear-to-r ${categoria.color} px-6 py-4 text-white`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{categoria.icono}</span>
                    <h2 className="text-2xl font-bold">{categoria.nombre}</h2>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      {categoria.productos.length} productos
                    </span>
                  </div>
                  <button className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-all">
                    <span className="text-xl">⚙️</span>
                  </button>
                </div>
              </div>

              {/* Grid de productos - responsive con más columnas en pantallas grandes */}
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {categoria.productos
                    .filter((p) => {
                      if (filter === "destacados") return p.destacado;
                      if (filter === "disponibles") return p.disponible;
                      return true;
                    })
                    .map((producto) => (
                      <div
                        key={producto.id}
                        className={`group relative bg-gray-50 rounded-xl p-4 border-2 transition-all hover:shadow-lg ${
                          producto.disponible
                            ? "border-transparent hover:border-orange-200"
                            : "border-red-200 bg-red-50/30 opacity-75"
                        }`}
                      >
                        {!producto.disponible && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            Agotado
                          </div>
                        )}
                        {producto.destacado && producto.disponible && (
                          <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                            <span>⭐</span> Destacado
                          </div>
                        )}

                        <div className="flex items-start gap-3">
                          <div
                            className={`w-16 h-16 rounded-2xl bg-linear-to-br ${categoria.color} flex items-center justify-center text-3xl text-white shadow-md flex-shrink-0`}
                          >
                            {producto.imagen}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-800 text-lg truncate">
                              {producto.nombre}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                              {producto.descripcion}
                            </p>
                            <div className="flex items-center justify-between mt-3">
                              <span className="font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg">
                                {formatCurrency(producto.precio)}
                              </span>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1.5 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors">
                                  ✏️
                                </button>
                                <button className="p-1.5 hover:bg-red-100 rounded-lg text-red-600 transition-colors">
                                  🗑️
                                </button>
                                <button className="p-1.5 hover:bg-green-100 rounded-lg text-green-600 transition-colors">
                                  📋
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Botón ver más si hay muchos productos */}
                {categoria.productos.length > 8 && (
                  <div className="mt-4 text-center">
                    <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                      Ver todos los {categoria.nombre} →
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Mensaje si no hay resultados de búsqueda */}
          {filteredData.length === 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <span className="text-6xl mb-4 block">🔍</span>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-500">
                No hay productos que coincidan con "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-orange-600 hover:text-orange-700 font-medium"
              >
                Limpiar búsqueda
              </button>
            </div>
          )}
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default MenuPage;
