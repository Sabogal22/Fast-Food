import { useState } from "react";

interface Cuenta {
  id: number;
  mesa: number;
  total: number;
}

interface Props {
  cuenta: Cuenta;
  onClose: () => void;
  onConfirm: (
    metodo: string,
    data: {
      dineroRecibido?: number;
      referencia?: string;
      comprobante?: File | null;
    },
  ) => void;
}

export default function CobrarModal({ cuenta, onClose, onConfirm }: Props) {
  const [metodoPago, setMetodoPago] = useState("Efectivo");
  const [dineroRecibido, setDineroRecibido] = useState("");
  const [referencia, setReferencia] = useState("");
  const [comprobante, setComprobante] = useState<File | null>(null);

  const total = cuenta.total;
  const dinero = parseFloat(dineroRecibido) || 0;
  const cambio = metodoPago === "Efectivo" ? dinero - total : 0;

  const puedeConfirmar =
    (metodoPago === "Efectivo" && dinero >= total) ||
    (metodoPago === "Tarjeta" && referencia.trim() !== "") ||
    (metodoPago === "Transferencia" && referencia.trim() !== "");

  const formatear = (valor: number) =>
    valor.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
    });

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        {/* Header con gradiente */}
        <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-100 text-sm">Mesa</p>
              <h2 className="text-2xl font-bold text-white">Mesa {cuenta.mesa}</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {/* Total */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-center border border-gray-100">
            <p className="text-gray-500 text-sm mb-1">Total a pagar</p>
            <p className="text-4xl font-bold text-gray-800">{formatear(total)}</p>
          </div>

          {/* Métodos de pago */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-600 mb-2">Método de pago</p>
            <div className="grid grid-cols-3 gap-2">
              {["Efectivo", "Tarjeta", "Transferencia"].map((metodo) => (
                <button
                  key={metodo}
                  onClick={() => setMetodoPago(metodo)}
                  className={`
                    py-3 px-2 rounded-xl font-medium text-sm transition-all
                    ${metodoPago === metodo 
                      ? "bg-green-600 text-white shadow-lg shadow-green-200 scale-105" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }
                  `}
                >
                  {metodo}
                </button>
              ))}
            </div>
          </div>

          {/* Formularios según método */}
          <div className="mb-6 space-y-4">
            {metodoPago === "Transferencia" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Número de comprobante
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese el número de comprobante"
                    value={referencia}
                    onChange={(e) => setReferencia(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Subir comprobante
                  </label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-green-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setComprobante(e.target.files ? e.target.files[0] : null)
                      }
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                  </div>
                </div>
              </>
            )}

            {metodoPago === "Tarjeta" && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Número de autorización
                </label>
                <input
                  type="text"
                  placeholder="Ingrese el número de autorización"
                  value={referencia}
                  onChange={(e) => setReferencia(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            )}

            {metodoPago === "Efectivo" && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Dinero recibido
                </label>
                <input
                  type="number"
                  placeholder="Ingrese el monto recibido"
                  value={dineroRecibido}
                  onChange={(e) => setDineroRecibido(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />

                {dinero > 0 && (
                  <div className={`mt-3 p-3 rounded-xl ${
                    cambio < 0 
                      ? "bg-red-50 border border-red-100" 
                      : "bg-green-50 border border-green-100"
                  }`}>
                    <p className={`text-center font-bold ${
                      cambio < 0 ? "text-red-600" : "text-green-600"
                    }`}>
                      {cambio < 0
                        ? `❌ Faltan ${formatear(Math.abs(cambio))}`
                        : `✅ Cambio: ${formatear(cambio)}`}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Resumen */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
            <p className="text-sm font-medium text-gray-600 mb-2">Resumen del pago</p>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Método:</span>
                <span className="font-medium text-gray-700">{metodoPago}</span>
              </div>
              {metodoPago === "Efectivo" && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Cambio:</span>
                  <span className="font-medium text-gray-700">{formatear(cambio)}</span>
                </div>
              )}
              {metodoPago !== "Efectivo" && referencia && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Referencia:</span>
                  <span className="font-medium text-gray-700">{referencia}</span>
                </div>
              )}
            </div>
          </div>

          {/* Botón confirmar */}
          <button
            disabled={!puedeConfirmar}
            onClick={() =>
              onConfirm(metodoPago, {
                dineroRecibido: metodoPago === "Efectivo" ? dinero : undefined,
                referencia: metodoPago !== "Efectivo" ? referencia : undefined,
                comprobante: metodoPago === "Transferencia" ? comprobante : null,
              })
            }
            className={`
              w-full py-4 rounded-xl font-bold text-lg transition-all
              ${puedeConfirmar
                ? "bg-linear-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            Confirmar pago
          </button>
        </div>
      </div>
    </div>
  );
}