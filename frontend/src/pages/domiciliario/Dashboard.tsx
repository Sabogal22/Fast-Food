export default function DomiciliarioDashboard() {
  // Datos quemados para el domiciliario
  const pedidosAsignados = [
    { id: 1245, cliente: 'Juan Pérez', direccion: 'Calle 23 #45-67, Apartamento 302', telefono: '312-456-7890', tiempo: 8, total: '$45,200', items: 4, distancia: '2.3 km' },
    { id: 1246, cliente: 'María Rodríguez', direccion: 'Carrera 15 #78-90, Casa', telefono: '320-123-4567', tiempo: 15, total: '$32,500', items: 3, distancia: '3.1 km' },
    { id: 1247, cliente: 'Carlos López', direccion: 'Diagonal 34 #12-34, Conjunto Cerrado', telefono: '315-789-1234', tiempo: 25, total: '$28,900', items: 2, distancia: '1.8 km' },
  ];

  const pedidosPendientesAsignar = [
    { id: 1248, cliente: 'Ana Martínez', direccion: 'Transversal 5 #67-89, Edificio Azul', telefono: '318-456-7890', tiempo: 5, total: '$38,700', items: 5, distancia: '2.7 km' },
    { id: 1249, cliente: 'Roberto Gómez', direccion: 'Calle 8 #90-12, Local 3', telefono: '314-987-6543', tiempo: 12, total: '$22,300', items: 2, distancia: '1.2 km' },
    { id: 1250, cliente: 'Laura Méndez', direccion: 'Carrera 50 #23-45, Torre 2', telefono: '316-543-2109', tiempo: 18, total: '$51,600', items: 6, distancia: '4.5 km' },
  ];

  const pedidosEntregadosHoy = [
    { id: 1240, cliente: 'Pedro Sánchez', direccion: 'Calle 12 #34-56', hora: '13:45', propina: '$5,000' },
    { id: 1241, cliente: 'Sofía Torres', direccion: 'Carrera 7 #89-01', hora: '13:15', propina: '$3,000' },
    { id: 1242, cliente: 'Diego Ramírez', direccion: 'Diagonal 23 #45-67', hora: '12:50', propina: '$4,000' },
  ];

  const estadisticasDia = {
    entregas: 12,
    kmRecorridos: 28.5,
    propinas: '$28,500',
    promedioEntrega: '18 min',
    calificacion: 4.8,
  };

  const horaActual = new Date().getHours();
  const turno = horaActual < 17 ? 'Matutino' : 'Vespertino';

  return (
    <div className="p-4 bg-gray-50 min-h-screen pb-20">
      {/* Header del domiciliario */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-md transform rotate-6">
            <span className="text-2xl">🛵</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-800">Domiciliario</h1>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                En línea
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Turno {turno} • {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-lg">
          <span className="text-lg">🛵</span>
          ID: DOM-{Math.floor(Math.random() * 1000)}
        </div>
      </div>

      {/* KPIs del domiciliario - LO QUE IMPORTA */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">📦</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Hoy</p>
              <p className="text-xl font-bold text-gray-800">{estadisticasDia.entregas}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">⏳</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Asignados</p>
              <p className="text-xl font-bold text-gray-800">{pedidosAsignados.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">💸</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Propinas</p>
              <p className="text-xl font-bold text-gray-800">{estadisticasDia.propinas}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">⭐</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Calificación</p>
              <p className="text-xl font-bold text-gray-800">{estadisticasDia.calificacion}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 1: PEDIDOS ASIGNADOS - LO MÁS IMPORTANTE */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-gray-800 flex items-center gap-1 text-lg">
            <span className="text-2xl">🛵</span> Mis pedidos
          </h2>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
            {pedidosAsignados.length} asignados
          </span>
        </div>

        <div className="space-y-3">
          {pedidosAsignados.sort((a, b) => a.tiempo - b.tiempo).map((pedido) => (
            <div key={pedido.id} className="bg-white rounded-2xl shadow-md border-l-8 border-l-blue-500 p-4 hover:shadow-lg transition-shadow">
              {/* Header del pedido */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    #{pedido.id.toString().slice(-3)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-800">{pedido.cliente}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        pedido.tiempo < 10 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {pedido.tiempo < 10 ? '🔥 Urgente' : `${pedido.tiempo} min`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span className="flex items-center gap-1">📍 {pedido.distancia}</span>
                      <span>•</span>
                      <span>🍽️ {pedido.items} items</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold text-gray-800">{pedido.total}</p>
                </div>
              </div>

              {/* Dirección y contacto */}
              <div className="bg-gray-50 rounded-xl p-3 mb-3">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-lg">📍</span>
                  <span className="text-sm text-gray-700 flex-1">{pedido.direccion}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">📞</span>
                  <a href={`tel:${pedido.telefono}`} className="text-sm text-blue-600 font-medium hover:underline">
                    {pedido.telefono}
                  </a>
                </div>
              </div>

              {/* Acciones del domiciliario */}
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                  <span className="text-lg">✅</span>
                  Entregado
                </button>
                <button className="bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                  <span className="text-lg">📞</span>
                  Llamar
                </button>
              </div>
              <button className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors text-sm">
                <span className="text-lg">🗺️</span>
                Ver en mapa
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN 2: PEDIDOS DISPONIBLES */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-gray-800 flex items-center gap-1 text-lg">
            <span className="text-2xl">📦</span> Pedidos disponibles
          </h2>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
            {pedidosPendientesAsignar.length} cerca de ti
          </span>
        </div>

        <div className="space-y-2">
          {pedidosPendientesAsignar.map((pedido) => (
            <div key={pedido.id} className="bg-white rounded-xl border border-dashed border-gray-300 p-3 hover:border-blue-500 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">📍</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-800">{pedido.cliente}</p>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                        {pedido.distancia}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{pedido.direccion.substring(0, 30)}...</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{pedido.total}</p>
                  <p className="text-xs text-gray-500">{pedido.items} items</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <span>⏱️</span> {pedido.tiempo} min
                  </span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-lg font-medium transition-colors">
                  Tomar pedido
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN 3: Estadísticas y entregas recientes */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Resumen del día */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-1">
            <span className="text-xl">📊</span> Mi día
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Kilómetros recorridos</span>
              <span className="font-bold text-gray-800">{estadisticasDia.kmRecorridos} km</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tiempo promedio</span>
              <span className="font-bold text-gray-800">{estadisticasDia.promedioEntrega}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Propinas acumuladas</span>
              <span className="font-bold text-green-600">{estadisticasDia.propinas}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Calificación</span>
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-800">{estadisticasDia.calificacion}</span>
                <span className="text-yellow-400">⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Últimas entregas */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-1">
            <span className="text-xl">✅</span> Últimas entregas
          </h3>
          <div className="space-y-2">
            {pedidosEntregadosHoy.map((pedido) => (
              <div key={pedido.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-12">{pedido.hora}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{pedido.cliente}</p>
                    <p className="text-xs text-gray-500">{pedido.direccion.substring(0, 20)}...</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  +{pedido.propina}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
            Ver historial completo →
          </button>
        </div>
      </div>

      {/* SECCIÓN 4: Mapa rápido (simulado) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-gray-800 flex items-center gap-1">
            <span className="text-xl">🗺️</span> Ruta optimizada
          </h3>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            3 paradas • 5.8 km
          </span>
        </div>
        <div className="bg-linear-to-br from-gray-100 to-gray-200 rounded-xl h-32 flex items-center justify-center relative">
          {/* Simulación visual de mapa */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">1</div>
                <span className="text-xs mt-1 text-gray-700">Inicio</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-400 border-t-2 border-dashed border-gray-500"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs">2</div>
                <span className="text-xs mt-1 text-gray-700">Mesa 4</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-400 border-t-2 border-dashed border-gray-500"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs">3</div>
                <span className="text-xs mt-1 text-gray-700">Mesa 7</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-400 border-t-2 border-dashed border-gray-500"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">4</div>
                <span className="text-xs mt-1 text-gray-700">Mesa 12</span>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
          <span className="text-lg">🧭</span>
          Iniciar navegación
        </button>
      </div>

      {/* Estado del domiciliario */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around shadow-lg">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm text-gray-600">Disponible</span>
        </div>
        <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <span className="text-2xl">🛵</span>
          <span className="text-xs">Mis pedidos</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <span className="text-2xl">🗺️</span>
          <span className="text-xs">Mapa</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <span className="text-2xl">📊</span>
          <span className="text-xs">Estadísticas</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-red-600">
          <span className="text-2xl">⏸️</span>
          <span className="text-xs">Pausar</span>
        </button>
      </div>
    </div>
  );
}