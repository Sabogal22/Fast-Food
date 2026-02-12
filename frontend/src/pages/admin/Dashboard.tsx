import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/products";
import type { Product } from "../../types/products";
import Navbar from "../admin/layout/navbar";

export default function AdminDashboard() {
  // Datos quemados para el ADMINISTRADOR GENERAL
  const resumenGeneral = {
    ventasHoy: '$8,240',
    ventasSemana: '$52,890',
    ventasMes: '$187,450',
    ordenesHoy: 47,
    ordenesSemana: 312,
    clientesHoy: 89,
    clientesNuevos: 12,
    ticketPromedio: '$175',
  };

  const empleadosActivos = [
    { nombre: 'Carlos Rodríguez', rol: 'Chef', turno: 'Matutino', estado: 'activo', eficiencia: 98, imagen: '👨‍🍳' },
    { nombre: 'María González', rol: 'Mesera', turno: 'Matutino', estado: 'activo', eficiencia: 95, imagen: '👩‍🍳' },
    { nombre: 'Juan Pérez', rol: 'Cajero', turno: 'Matutino', estado: 'activo', eficiencia: 100, imagen: '💰' },
    { nombre: 'Ana Martínez', rol: 'Domiciliario', turno: 'Vespertino', estado: 'en ruta', eficiencia: 92, imagen: '🛵' },
    { nombre: 'Luis Torres', rol: 'Cocinero', turno: 'Matutino', estado: 'descanso', eficiencia: 88, imagen: '🍳' },
    { nombre: 'Sofía Ramírez', rol: 'Mesera', turno: 'Vespertino', estado: 'activo', eficiencia: 96, imagen: '👩' },
  ];

  const ventasPorHora = [
    { hora: '10:00', ventas: '$450', ordenes: 3 },
    { hora: '11:00', ventas: '$890', ordenes: 7 },
    { hora: '12:00', ventas: '$1,450', ordenes: 12 },
    { hora: '13:00', ventas: '$2,100', ordenes: 18 },
    { hora: '14:00', ventas: '$1,670', ordenes: 14 },
    { hora: '15:00', ventas: '$890', ordenes: 8 },
    { hora: '16:00', ventas: '$520', ordenes: 4 },
    { hora: '17:00', ventas: '$670', ordenes: 5 },
  ];

  const inventarioCritico = [
    { producto: 'Aguacate', stock: 8, minimo: 20, unidad: 'piezas', proveedor: 'Frutos del Campo' },
    { producto: 'Queso Parmesano', stock: 2.5, minimo: 5, unidad: 'kg', proveedor: 'Lácteos La Pradera' },
    { producto: 'Cebolla Morada', stock: 3, minimo: 15, unidad: 'kg', proveedor: 'Verduras El Valle' },
    { producto: 'Limón', stock: 1, minimo: 10, unidad: 'bolsas', proveedor: 'Cítricos SA' },
    { producto: 'Carne Molida', stock: 5, minimo: 15, unidad: 'kg', proveedor: 'Carnes Premium' },
  ];

  const pedidosProveedores = [
    { id: 'P-1234', proveedor: 'Carnes Premium', productos: ['Carne Molida (10kg)', 'Pechuga (8kg)'], total: '$450,000', estado: 'en camino', fecha: 'Hoy 16:30' },
    { id: 'P-1235', proveedor: 'Verduras El Valle', productos: ['Cebolla (15kg)', 'Tomate (12kg)', 'Lechuga (10kg)'], total: '$280,000', estado: 'pendiente', fecha: 'Mañana 08:00' },
    { id: 'P-1236', proveedor: 'Lácteos La Pradera', productos: ['Queso (5kg)', 'Crema (3L)'], total: '$185,000', estado: 'pendiente', fecha: 'Mañana 10:30' },
  ];

  const quejasRecientes = [
    { id: 1, cliente: 'Laura Méndez', tipo: 'Tiempo de espera', mesa: 7, comentario: 'La comida tardó 35 minutos', calificacion: 3, fecha: '13:45' },
    { id: 2, cliente: 'Roberto Gómez', tipo: 'Orden incorrecta', mesa: 12, comentario: 'Faltó un acompañamiento', calificacion: 4, fecha: '13:20' },
    { id: 3, cliente: 'Carla Ruiz', tipo: 'Servicio', mesa: 4, comentario: 'Atención lenta', calificacion: 3, fecha: '12:50' },
  ];

  const rendimientoEmpleados = [
    { nombre: 'Carlos Rodríguez', ventas: '$3,240', ordenes: 28, satisfaccion: 4.9, propinas: '$450' },
    { nombre: 'María González', ventas: '$2,890', ordenes: 24, satisfaccion: 4.8, propinas: '$380' },
    { nombre: 'Juan Pérez', ventas: '$2,120', ordenes: 19, satisfaccion: 4.7, propinas: '$310' },
  ];

  const horaActual = new Date().getHours();
  const turnoActual = horaActual < 17 ? 'Matutino' : 'Vespertino';
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (error) {
        console.log("Error cargando productos", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen pb-20">
      {/* Header del Administrador */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white shadow-xl transform rotate-6">
            <span className="text-3xl">👑</span>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-800">Panel de Administración</h1>
              <span className="bg-linear-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-md">
                Sabor Express
              </span>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <span>Turno {turnoActual}</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span>{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-2xl shadow-md flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">Sistema online</span>
          </div>
          <div className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-lg">
            <span className="text-lg">📊</span>
            Dashboard General
          </div>
        </div>
      </div>

      {/* KPIS PRINCIPALES - LO QUE IMPORTA AL ADMIN */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow-md border-l-8 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Ventas Hoy</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{resumenGeneral.ventasHoy}</p>
              <p className="text-xs text-green-600 mt-1">↑ 12% vs ayer</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-md border-l-8 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Órdenes Hoy</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{resumenGeneral.ordenesHoy}</p>
              <p className="text-xs text-blue-600 mt-1">↑ 8% vs ayer</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🍽️</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-md border-l-8 border-l-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Clientes Hoy</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{resumenGeneral.clientesHoy}</p>
              <p className="text-xs text-yellow-600 mt-1">+{resumenGeneral.clientesNuevos} nuevos</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-md border-l-8 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Ticket Promedio</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{resumenGeneral.ticketPromedio}</p>
              <p className="text-xs text-purple-600 mt-1">↑ 5% vs ayer</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎟️</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 1: EMPLEADOS ACTIVOS - CONTROL DE PERSONAL */}
      <div className="bg-white rounded-2xl shadow-md p-5 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
            <span className="text-2xl">👥</span> Empleados en Turno
          </h2>
          <div className="flex items-center gap-3">
            <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {empleadosActivos.filter(e => e.estado === 'activo').length} Activos
            </span>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-full text-xs font-bold">
              {empleadosActivos.length} Total
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {empleadosActivos.map((empleado, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-3 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                  empleado.rol === 'Chef' ? 'bg-linear-to-br from-orange-400 to-red-400' :
                  empleado.rol === 'Mesera' || empleado.rol === 'Mesero' ? 'bg-linear-to-br from-blue-400 to-indigo-400' :
                  empleado.rol === 'Cajero' ? 'bg-linear-to-br from-green-400 to-emerald-400' :
                  'bg-linear-to-br from-purple-400 to-pink-400'
                } text-white`}>
                  {empleado.imagen}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{empleado.nombre}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500">{empleado.rol}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      empleado.estado === 'activo' ? 'bg-green-100 text-green-700' :
                      empleado.estado === 'en ruta' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-200 text-gray-700'
                    }`}>
                      {empleado.estado}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500">Eficiencia</span>
                  <span className="font-bold text-gray-800">{empleado.eficiencia}%</span>
                </div>
                <span className="text-xs text-gray-500">{empleado.turno}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN 2: VENTAS Y PRODUCTOS */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Gráfico de ventas por hora */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-1">
              <span className="text-xl">📈</span> Ventas por hora
            </h3>
            <span className="text-sm text-gray-500">Hoy</span>
          </div>
          <div className="space-y-2">
            {ventasPorHora.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-12">{item.hora}</span>
                <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-linear-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-end px-2"
                    style={{ width: `${(parseInt(item.ventas.replace(/[$,]/g, '')) / 2100) * 100}%` }}
                  >
                    <span className="text-xs text-white font-bold">{item.ventas}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-600 w-16">{item.ordenes} ord</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
            <span className="text-sm text-gray-600">Total día</span>
            <span className="text-xl font-bold text-gray-800">{resumenGeneral.ventasHoy}</span>
          </div>
        </div>

        {/* Productos más vendidos */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-1">
              <span className="text-xl">🔥</span> Productos Top
            </h3>
            <span className="text-sm text-gray-500">Esta semana</span>
          </div>
          <div className="space-y-3">
            {products.slice(0, 5).map((producto, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-700 w-6">#{idx + 1}</span>
                  <div>
                    <p className="font-medium text-gray-800">{producto.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        producto.stock < 20 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        Stock: {producto.stock}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/admin/products")} className="w-full mt-4 bg-gray-100 hover:bg-gray-200 py-2 rounded-xl text-sm font-medium text-gray-700 transition-colors">
            Ver inventario completo
          </button>
        </div>
      </div>

      {/* SECCIÓN 3: INVENTARIO CRÍTICO Y PROVEEDORES */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Inventario crítico */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-1">
              <span className="text-xl">⚠️</span> Inventario Crítico
            </h3>
            <span className="bg-red-100 text-red-700 px-3 py-1.5 rounded-full text-xs font-bold animate-pulse">
              {inventarioCritico.length} productos
            </span>
          </div>
          <div className="space-y-3">
            {inventarioCritico.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-red-50 rounded-xl border border-red-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">{item.producto}</span>
                    <span className="text-xs bg-white px-2 py-0.5 rounded-full border border-red-300 text-red-700">
                      Mín: {item.minimo} {item.unidad}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <span className="text-gray-600">Stock actual:</span>
                    <span className="font-bold text-red-600">{item.stock} {item.unidad}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{item.proveedor}</span>
                  </div>
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded-lg transition-colors">
                  Ordenar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pedidos a proveedores */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-1">
              <span className="text-xl">🚚</span> Pedidos a Proveedores
            </h3>
            <button className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg">
              + Nuevo pedido
            </button>
          </div>
          <div className="space-y-3">
            {pedidosProveedores.map((pedido) => (
              <div key={pedido.id} className="border-b border-gray-200 last:border-0 pb-3 last:pb-0">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">{pedido.proveedor}</span>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                        {pedido.id}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{pedido.productos.join(' • ')}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-800">{pedido.total}</span>
                    <div className={`text-xs mt-1 px-2 py-0.5 rounded-full ${
                      pedido.estado === 'en camino' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {pedido.estado}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">Entrega: {pedido.fecha}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECCIÓN 4: EXPERIENCIA DEL CLIENTE */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Quejas y reclamaciones */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-1">
              <span className="text-xl">😟</span> Quejas Recientes
            </h3>
            <span className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-xs font-bold">
              {quejasRecientes.length} sin resolver
            </span>
          </div>
          <div className="space-y-3">
            {quejasRecientes.map((queja) => (
              <div key={queja.id} className="bg-gray-50 rounded-xl p-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">{queja.cliente}</span>
                    <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                      Mesa {queja.mesa}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < queja.calificacion ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  <span className="font-medium">{queja.tipo}:</span> {queja.comentario}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">{queja.fecha}</span>
                  <button className="text-xs bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-lg">
                    Gestionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rendimiento de empleados */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-1">
              <span className="text-xl">🏆</span> Top Empleados
            </h3>
            <span className="text-sm text-gray-500">Por ventas hoy</span>
          </div>
          <div className="space-y-3">
            {rendimientoEmpleados.map((emp, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : 'bg-orange-600'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{emp.nombre}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>💰 {emp.ventas}</span>
                      <span>•</span>
                      <span>📋 {emp.ordenes} ord</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-bold text-gray-800">{emp.satisfaccion}</span>
                  </div>
                  <span className="text-xs text-green-600">+{emp.propinas}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECCIÓN 5: ACCIONES RÁPIDAS DE ADMINISTRACIÓN */}
      <div className="bg-linear-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl shadow-xl p-5 text-white">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <span className="text-2xl">⚡</span> Acciones de Administración
        </h3>
        <div className="grid grid-cols-6 gap-3">
          <button className="bg-white/20 hover:bg-white/30 rounded-xl p-3 transition-colors flex flex-col items-center">
            <span className="text-2xl">📊</span>
            <span className="text-xs mt-1">Reportes</span>
          </button>
          <button className="bg-white/20 hover:bg-white/30 rounded-xl p-3 transition-colors flex flex-col items-center">
            <span className="text-2xl">👥</span>
            <span className="text-xs mt-1">Empleados</span>
          </button>
          <button className="bg-white/20 hover:bg-white/30 rounded-xl p-3 transition-colors flex flex-col items-center">
            <span className="text-2xl">📦</span>
            <span className="text-xs mt-1">Inventario</span>
          </button>
          <button className="bg-white/20 hover:bg-white/30 rounded-xl p-3 transition-colors flex flex-col items-center">
            <span className="text-2xl">💰</span>
            <span className="text-xs mt-1">Finanzas</span>
          </button>
          <button className="bg-white/20 hover:bg-white/30 rounded-xl p-3 transition-colors flex flex-col items-center">
            <span className="text-2xl">📋</span>
            <span className="text-xs mt-1">Menú</span>
          </button>
          <button className="bg-white/20 hover:bg-white/30 rounded-xl p-3 transition-colors flex flex-col items-center">
            <span className="text-2xl">⚙️</span>
            <span className="text-xs mt-1">Configuración</span>
          </button>
          <button onClick={() => navigate("/admin/categories")} className="bg-white/20 hover:bg-white/30 rounded-xl p-3 transition-colors flex flex-col items-center">
            <span className="text-2xl">📂</span>
            <span className="text-xs mt-1">Categorías</span>
          </button>
        </div>
      </div>

      {/* Barra inferior de navegación admin */}
      <Navbar />
    </div>
  );
}