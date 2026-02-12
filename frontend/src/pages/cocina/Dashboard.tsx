export default function CocinaDashboard() {
  // Datos quemados para el cocinero
  const ordenesActivas = [
    { id: 234, mesa: 4, platos: ['2x Paella', '1x Gazpacho'], tiempo: 5, cliente: 'Juan Pérez', nota: 'Sin cebolla' },
    { id: 235, mesa: 7, platos: ['3x Tacos', '2x Guacamole'], tiempo: 12, cliente: 'María García', nota: 'Picante' },
    { id: 236, mesa: 12, platos: ['1x Risotto', '2x Ensalada'], tiempo: 8, cliente: 'Carlos López', nota: '' },
    { id: 237, mesa: 3, platos: ['2x Hamburguesa', '1x Papas'], tiempo: 3, cliente: 'Ana Martínez', nota: 'Sin pepinillos' },
    { id: 238, mesa: 9, platos: ['4x Tacos', '3x Quesadillas'], tiempo: 15, cliente: 'Roberto Gómez', nota: '' },
  ];

  const ingredientesCriticos = [
    { nombre: 'Aguacate', cantidad: 3, unidad: 'piezas' },
    { nombre: 'Queso Parmesan', cantidad: 0.5, unidad: 'kg' },
    { nombre: 'Cebolla morada', cantidad: 2, unidad: 'piezas' },
    { nombre: 'Limón', cantidad: 1, unidad: 'bolsa' },
  ];

  const platosPopulares = [
    { nombre: 'Paella', veces: 23 },
    { nombre: 'Tacos', veces: 18 },
    { nombre: 'Hamburguesa', veces: 15 },
    { nombre: 'Risotto', veces: 12 },
  ];

  const horaActual = new Date().getHours();
  const turno = horaActual < 14 ? 'Matutino' : 'Vespertino';

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header rápido */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👨‍🍳</span>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Cocina</h1>
            <p className="text-xs text-gray-500">Turno {turno} • {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Activo
          </span>
          <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
            5 órdenes
          </span>
        </div>
      </div>

      {/* Grid rápida */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
          <span className="text-lg">⏱️</span>
          <p className="text-xs text-gray-500 mt-1">Tiempo prom</p>
          <p className="text-xl font-bold text-gray-800">14.5 min</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
          <span className="text-lg">📋</span>
          <p className="text-xs text-gray-500 mt-1">Hoy</p>
          <p className="text-xl font-bold text-gray-800">47 órdenes</p>
        </div>
      </div>

      {/* Órdenes activas - LO MÁS IMPORTANTE */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-gray-800 flex items-center gap-1">
            <span>🔥</span> Órdenes activas
          </h2>
          <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
            {ordenesActivas.length} pendientes
          </span>
        </div>
        
        <div className="space-y-2">
          {ordenesActivas.sort((a, b) => a.tiempo - b.tiempo).map((orden) => (
            <div key={orden.id} className={`bg-white p-3 rounded-xl shadow-sm border-l-4 ${
              orden.tiempo < 5 ? 'border-l-red-500 bg-red-50/30' : 
              orden.tiempo < 10 ? 'border-l-orange-500' : 'border-l-gray-300'
            }`}>
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800">Mesa {orden.mesa}</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                    #{orden.id}
                  </span>
                  {orden.tiempo < 5 && (
                    <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                      ¡URGENTE!
                    </span>
                  )}
                </div>
                <span className={`text-sm font-bold ${
                  orden.tiempo < 5 ? 'text-red-600' : 'text-gray-600'
                }`}>{orden.tiempo} min</span>
              </div>
              
              <div className="mb-1.5">
                {orden.platos.map((plato, idx) => (
                  <span key={idx} className="text-sm text-gray-700 block">
                    • {plato}
                  </span>
                ))}
              </div>
              
              {orden.nota && (
                <div className="text-xs bg-yellow-50 text-yellow-700 p-1.5 rounded-lg mb-1.5 flex items-center gap-1">
                  <span>📝</span> {orden.nota}
                </div>
              )}
              
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Cliente: {orden.cliente}</span>
                <button className="text-orange-600 hover:text-orange-700 font-medium">
                  ✓ Listo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Panel inferior rápido */}
      <div className="grid grid-cols-2 gap-3">
        {/* Ingredientes críticos */}
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
            <span>⚠️</span> Por agotarse
          </h3>
          <div className="space-y-1.5">
            {ingredientesCriticos.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs">
                <span className="text-gray-700">{item.nombre}</span>
                <span className="font-medium text-red-600">{item.cantidad} {item.unidad}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-2 text-xs bg-gray-100 hover:bg-gray-200 py-1.5 rounded-lg text-gray-700 transition-colors">
            Ver inventario
          </button>
        </div>

        {/* Hoy en cocina */}
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
            <span>📊</span> Más pedido
          </h3>
          <div className="space-y-1.5">
            {platosPopulares.map((plato, idx) => (
              <div key={idx} className="flex justify-between text-xs">
                <span className="text-gray-700">{plato.nombre}</span>
                <span className="font-medium text-orange-600">{plato.veces} hoy</span>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500 flex justify-between">
              <span>Comandas hoy</span>
              <span className="font-bold text-gray-800">47</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}