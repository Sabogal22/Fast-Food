export default function MeseroDashboard() {
  // Datos quemados para el mesero de comida rápida
  const mesasDisponibles = [
    { id: 2, capacidad: 2, ubicacion: 'ventana' },
    { id: 5, capacidad: 4, ubicacion: 'interior' },
    { id: 8, capacidad: 2, ubicacion: 'barra' },
    { id: 9, capacidad: 6, ubicacion: 'terraza' },
    { id: 11, capacidad: 2, ubicacion: 'ventana' },
    { id: 14, capacidad: 4, ubicacion: 'interior' },
  ];

  const mesasOcupadas = [
    { id: 4, comensales: 4, tiempo: 25, orden: ['2x Hamburguesa', '1x Papas grandes', '2x Refresco'], total: '$320' },
    { id: 7, comensales: 2, tiempo: 45, orden: ['1x Ensalada', '1x Sándwich', '1x Café'], total: '$210' },
    { id: 12, comensales: 3, tiempo: 15, orden: ['3x Tacos', '2x Quesadillas', '2x Agua'], total: '$380' },
    { id: 3, comensales: 2, tiempo: 8, orden: ['2x Hot dogs', '2x Refresco'], total: '$180' },
  ];

  const ordenesListas = [
    { id: 234, mesa: 4, platos: ['Hamburguesa', 'Papas'], tiempo: 2 },
    { id: 236, mesa: 12, platos: ['Tacos', 'Quesadillas'], tiempo: 1 },
    { id: 238, mesa: 3, platos: ['Hot dogs'], tiempo: 0 },
  ];

  const pedidosPendientes = [
    { id: 239, mesa: 7, platos: ['Ensalada', 'Sándwich'], tiempo: 8 },
    { id: 240, mesa: 4, platos: ['Refresco extra'], tiempo: 3 },
  ];

  const horaActual = new Date().getHours();
  const turno = horaActual < 17 ? 'Matutino' : 'Vespertino';

  return (
    <div className="p-4 bg-gray-50 min-h-screen pb-20">
      {/* Header del mesero - Modo comida rápida */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-linear-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center text-white shadow-md transform rotate-3">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-800">Mesero 🍔</h1>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Activo
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Turno {turno} • {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-2xl text-sm font-bold flex items-center gap-2">
          <span className="text-lg">💰</span>
          Ventas hoy: $1,890
        </div>
      </div>

      {/* Estadísticas rápidas - Solo lo que importa */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">🪑</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Mesas</p>
              <p className="text-xl font-bold text-gray-800">{mesasOcupadas.length}/{mesasOcupadas.length + mesasDisponibles.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">🍔</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Ordenes</p>
              <p className="text-xl font-bold text-gray-800">{ordenesListas.length + pedidosPendientes.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">⏳</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Tiempo</p>
              <p className="text-xl font-bold text-gray-800">12 min</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 1: Órdenes listas para servir - LO MÁS IMPORTANTE */}
      {ordenesListas.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-gray-800 mb-2 flex items-center gap-1 text-lg">
            <span className="text-2xl">✅</span> ¡Listo para servir!
          </h2>
          <div className="space-y-2">
            {ordenesListas.map((orden) => (
              <div key={orden.id} className="bg-linear-to-r from-green-50 to-white border border-green-200 rounded-2xl p-4 shadow-md">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      {orden.mesa}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Mesa {orden.mesa}</p>
                      <p className="text-xs text-gray-500">Orden #{orden.id}</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-bold">
                    {orden.tiempo === 0 ? '¡Ya!' : `${orden.tiempo} min`}
                  </span>
                </div>
                <div className="ml-13 mb-3">
                  {orden.platos.map((plato, idx) => (
                    <span key={idx} className="text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full inline-block mr-1 mb-1">
                      {plato}
                    </span>
                  ))}
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <span className="text-xl">🍽️</span>
                  Entregar orden
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECCIÓN 2: Mesas ocupadas y sus órdenes */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-gray-800 flex items-center gap-1 text-lg">
            <span className="text-2xl">🔴</span> Mis mesas
          </h2>
          <span className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium">
            {mesasOcupadas.length} ocupadas
          </span>
        </div>
        
        <div className="space-y-3">
          {mesasOcupadas.sort((a, b) => b.tiempo - a.tiempo).map((mesa) => (
            <div key={mesa.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              {/* Cabecera de mesa */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white ${
                    mesa.tiempo > 30 ? 'bg-red-500' : 
                    mesa.tiempo > 20 ? 'bg-orange-500' : 'bg-blue-500'
                  }`}>
                    {mesa.id}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Mesa {mesa.id}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>👥 {mesa.comensales} personas</span>
                      <span>•</span>
                      <span className={mesa.tiempo > 30 ? 'text-red-600 font-bold' : ''}>
                        ⏱️ {mesa.tiempo} min
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-xl font-bold text-gray-800">{mesa.total}</p>
                </div>
              </div>

              {/* Orden */}
              <div className="bg-gray-50 rounded-xl p-3 mb-3">
                <p className="text-xs text-gray-500 mb-1">🍽️ Orden:</p>
                <div className="flex flex-wrap gap-1">
                  {mesa.orden.map((item, idx) => (
                    <span key={idx} className="text-sm bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Acciones del mesero - SOLO tomar orden y pedir cuenta */}
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium flex items-center justify-center gap-1 transition-colors">
                  <span className="text-lg">➕</span>
                  Agregar
                </button>
                <button className="bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-xl font-medium flex items-center justify-center gap-1 transition-colors">
                  <span className="text-lg">💰</span>
                  Solicitar cuenta
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN 3: Pedidos en cocina */}
      {pedidosPendientes.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-gray-800 mb-2 flex items-center gap-1 text-lg">
            <span className="text-2xl">👨‍🍳</span> En preparación
          </h2>
          <div className="space-y-2">
            {pedidosPendientes.map((pedido) => (
              <div key={pedido.id} className="bg-white rounded-2xl border border-orange-200 p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-800">Mesa {pedido.mesa}</span>
                    <span className="text-xs text-gray-500">#{pedido.id}</span>
                  </div>
                  <span className="text-sm font-bold text-orange-600">{pedido.tiempo} min</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{pedido.platos.join(' • ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECCIÓN 4: Mesas disponibles */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-gray-800 flex items-center gap-1 text-lg">
            <span className="text-2xl">🟢</span> Mesas disponibles
          </h2>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
            {mesasDisponibles.length} libres
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {mesasDisponibles.map((mesa) => (
            <div key={mesa.id} className="bg-white border-2 border-dashed border-green-200 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">
                  {mesa.id}
                </div>
                <div>
                  <p className="font-medium text-gray-800">Mesa {mesa.id}</p>
                  <p className="text-xs text-gray-500 capitalize">{mesa.ubicacion} • {mesa.capacidad} pers</p>
                </div>
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors">
                Ocupar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Acciones rápidas del mesero */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around shadow-lg">
        <button className="flex flex-col items-center text-gray-600 hover:text-orange-600">
          <span className="text-2xl">📋</span>
          <span className="text-xs">Nueva orden</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-orange-600">
          <span className="text-2xl">🔄</span>
          <span className="text-xs">Cambiar mesa</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-orange-600">
          <span className="text-2xl">📝</span>
          <span className="text-xs">Nota especial</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-orange-600">
          <span className="text-2xl">🚪</span>
          <span className="text-xs">Cerrar turno</span>
        </button>
      </div>
    </div>
  );
}