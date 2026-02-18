import { useState } from "react";
import Swal from "sweetalert2";
import CobrarModal from "../../components/cajero/CobrarModal";

export default function CajeroDashboard() {
  interface Cuenta {
    id: number;
    mesa: number;
    cliente: string;
    total: number;
    metodo: string;
    tiempo: number;
    items: number;
  }

  // Datos quemados para el cajero
  const cuentasPendientes = [
    {
      id: 234,
      mesa: 4,
      cliente: "Juan Pérez",
      total: 1250,
      metodo: "Efectivo",
      tiempo: 5,
      items: 8,
    },
    {
      id: 235,
      mesa: 7,
      cliente: "María López",
      total: 890,
      metodo: "Tarjeta",
      tiempo: 12,
      items: 5,
    },
    {
      id: 236,
      mesa: 12,
      cliente: "Carlos Ruiz",
      total: 2100,
      metodo: "Transferencia",
      tiempo: 3,
      items: 12,
    },
    {
      id: 237,
      mesa: 3,
      cliente: "Ana García",
      total: 430,
      metodo: "Efectivo",
      tiempo: 8,
      items: 3,
    },
    {
      id: 238,
      mesa: 9,
      cliente: "Roberto Gómez",
      total: 670,
      metodo: "Tarjeta",
      tiempo: 15,
      items: 4,
    },
  ];

  const ventasHoy = [
    { hora: "13:45", mesa: 4, total: "$1,250", metodo: "Efectivo" },
    { hora: "13:32", mesa: 7, total: "$890", metodo: "Tarjeta" },
    { hora: "13:28", mesa: 2, total: "$560", metodo: "Efectivo" },
    { hora: "13:15", mesa: 11, total: "$780", metodo: "Tarjeta" },
    { hora: "13:00", mesa: 5, total: "$340", metodo: "Efectivo" },
    { hora: "12:45", mesa: 8, total: "$920", metodo: "Transferencia" },
  ];

  const metodosPago = [
    { metodo: "Efectivo", total: "$4,230", porcentaje: 45 },
    { metodo: "Tarjeta", total: "$3,890", porcentaje: 35 },
    { metodo: "Transferencia", total: "$2,120", porcentaje: 20 },
  ];

  const propinasHoy = [
    { mesero: "Carlos", propinas: "$450", ventas: "$3,240" },
    { mesero: "María", propinas: "$380", ventas: "$2,890" },
    { mesero: "Juan", propinas: "$520", ventas: "$3,670" },
    { mesero: "Ana", propinas: "$310", ventas: "$2,120" },
  ];

  const billetes = [
    { denominacion: "$1000", cantidad: 12, total: "$12,000" },
    { denominacion: "$500", cantidad: 24, total: "$12,000" },
    { denominacion: "$200", cantidad: 35, total: "$7,000" },
    { denominacion: "$100", cantidad: 42, total: "$4,200" },
    { denominacion: "$50", cantidad: 28, total: "$1,400" },
    { denominacion: "$20", cantidad: 45, total: "$900" },
  ];

  const horaActual = new Date().getHours();
  const turno = horaActual < 17 ? "Matutino" : "Vespertino";
  const totalVentas = "$8,240";
  const totalPropinas = "$1,660";
  const [modalOpen, setModalOpen] = useState(false);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState<Cuenta | null>(
    null,
  );

  const abrirModal = (cuenta: Cuenta) => {
    setCuentaSeleccionada(cuenta);
    setModalOpen(true);
  };

  const confirmarCobro = () => {
    Swal.fire({
      title: "¡Cobro confirmado!",
      text: "El pago se ha procesado correctamente",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#10b981",
      timer: 3000,
      timerProgressBar: true,
      background: "#fff",
      backdrop: `
      rgba(0,0,0,0.4)
      left top
      no-repeat
    `,
    }).then(() => {
      setModalOpen(false);
    });
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen pb-20">
      {/* Header del cajero */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-linear-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-md transform -rotate-3">
            <span className="text-2xl">💰</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-800">
                Panel de Cajero
              </h1>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Caja abierta
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Turno {turno} • {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="bg-linear-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-lg">
          <span className="text-lg">💵</span>
          Corte: {totalVentas}
        </div>
      </div>

      {/* KPIs principales - LO QUE IMPORTA AL CAJERO */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">💰</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Ventas hoy</p>
              <p className="text-xl font-bold text-gray-800">{totalVentas}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">⏳</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Por cobrar</p>
              <p className="text-xl font-bold text-gray-800">
                {cuentasPendientes.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">💸</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Propinas</p>
              <p className="text-xl font-bold text-gray-800">{totalPropinas}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">🧾</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Transacciones</p>
              <p className="text-xl font-bold text-gray-800">47</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 1: COBRAR - LO MÁS IMPORTANTE */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-gray-800 flex items-center gap-1 text-lg">
            <span className="text-2xl">💰</span> Cuentas por cobrar
          </h2>
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            {cuentasPendientes.length} pendientes
          </span>
        </div>

        <div className="space-y-3">
          {cuentasPendientes
            .sort((a, b) => a.tiempo - b.tiempo)
            .map((cuenta) => (
              <div
                key={cuenta.id}
                className="bg-white rounded-2xl shadow-md border-l-8 border-l-green-500 p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-linear-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                      {cuenta.mesa}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-gray-800">
                          Mesa {cuenta.mesa}
                        </p>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                          #{cuenta.id}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{cuenta.cliente}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <span>🍽️ {cuenta.items} items</span>
                        <span>•</span>
                        <span
                          className={
                            cuenta.tiempo < 5 ? "text-red-600 font-bold" : ""
                          }
                        >
                          ⏱️ {cuenta.tiempo} min esperando
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {cuenta.total}
                    </p>
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full mt-1 inline-block">
                      {cuenta.metodo}
                    </span>
                  </div>
                </div>

                {/* Botón de cobro */}
                <button
                  onClick={() => abrirModal(cuenta)}
                  className="w-full bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
                >
                  <span className="text-2xl">✅</span>
                  Cobrar {cuenta.total}
                </button>
              </div>
            ))}
          {modalOpen && cuentaSeleccionada && (
            <CobrarModal
              cuenta={cuentaSeleccionada}
              onClose={() => setModalOpen(false)}
              onConfirm={confirmarCobro}
            />
          )}
        </div>
      </div>

      {/* SECCIÓN 2: Dos columnas */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Métodos de pago */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-1">
            <span className="text-xl">💳</span> Métodos de pago
          </h3>
          <div className="space-y-3">
            {metodosPago.map((metodo, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{metodo.metodo}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800">
                      {metodo.total}
                    </span>
                    <span className="text-xs text-gray-500">
                      {metodo.porcentaje}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      metodo.metodo === "Efectivo"
                        ? "bg-green-500"
                        : metodo.metodo === "Tarjeta"
                          ? "bg-blue-500"
                          : "bg-purple-500"
                    }`}
                    style={{ width: `${metodo.porcentaje}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total cobrado</span>
              <span className="font-bold text-gray-800 text-lg">
                {totalVentas}
              </span>
            </div>
          </div>
        </div>

        {/* Propinas por mesero */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-1">
            <span className="text-xl">💸</span> Propinas del día
          </h3>
          <div className="space-y-3">
            {propinasHoy.map((mesero, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-linear-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {mesero.mesero.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {mesero.mesero}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    Ventas: {mesero.ventas}
                  </span>
                  <span className="font-bold text-green-600">
                    {mesero.propinas}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total propinas</span>
              <span className="text-xl font-bold text-green-600">
                {totalPropinas}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 3: Corte de caja y billetes */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Corte de caja */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-1">
            <span className="text-xl">🧮</span> Corte de caja
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Ventas totales</span>
              <span className="font-bold text-gray-800">{totalVentas}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Propinas</span>
              <span className="font-bold text-green-600">{totalPropinas}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Gastos</span>
              <span className="font-bold text-red-600">-$320</span>
            </div>
            <div className="border-t border-gray-200 my-2 pt-2">
              <div className="flex justify-between">
                <span className="font-bold text-gray-800">Corte final</span>
                <span className="text-xl font-bold text-gray-900">$9,580</span>
              </div>
            </div>
          </div>
          <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
            <span className="text-lg">🧾</span>
            Imprimir corte
          </button>
        </div>

        {/* Billetes en caja */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-1">
            <span className="text-xl">💵</span> Billetes en caja
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {billetes.map((billete, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">
                    {billete.denominacion}
                  </span>
                  <span className="text-xs text-gray-500">
                    x{billete.cantidad}
                  </span>
                </div>
                <span className="font-bold text-gray-800">{billete.total}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total efectivo</span>
              <span className="text-lg font-bold text-gray-800">$37,500</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 4: Historial de ventas */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800 flex items-center gap-1">
            <span className="text-xl">📋</span> Últimas ventas
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Ver todas →
          </button>
        </div>

        <div className="space-y-2">
          {ventasHoy.map((venta, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 w-12">{venta.hora}</span>
                <span className="font-medium text-gray-800">
                  Mesa {venta.mesa}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    venta.metodo === "Efectivo"
                      ? "bg-green-100 text-green-700"
                      : venta.metodo === "Tarjeta"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {venta.metodo}
                </span>
              </div>
              <span className="font-bold text-gray-800">{venta.total}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Acciones rápidas del cajero */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around shadow-lg">
        <button className="flex flex-col items-center text-gray-600 hover:text-green-600">
          <span className="text-2xl">💰</span>
          <span className="text-xs">Cobrar</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-green-600">
          <span className="text-2xl">🧾</span>
          <span className="text-xs">Corte</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-green-600">
          <span className="text-2xl">💵</span>
          <span className="text-xs">Retiro</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-green-600">
          <span className="text-2xl">📊</span>
          <span className="text-xs">Reportes</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-green-600">
          <span className="text-2xl">🔒</span>
          <span className="text-xs">Cerrar caja</span>
        </button>
      </div>
    </div>
  );
}
