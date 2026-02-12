import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../assets/login.css";
import Swal from "sweetalert2";

export default function Login() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(username, password);
      await Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: "Login exitoso 🎉",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario o contraseña incorrectos",
      });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-red-50 relative overflow-hidden">
      {/* Elementos decorativos de comida */}
      <div className="absolute top-10 left-10 text-7xl animate-bounce">🍕</div>
      <div className="absolute top-20 right-20 text-6xl animate-spin-slow">
        🍔
      </div>
      <div className="absolute bottom-10 left-20 text-7xl animate-wiggle">
        🌮
      </div>
      <div className="absolute bottom-20 right-10 text-8xl animate-float">
        🍜
      </div>
      <div className="absolute top-1/2 left-5 text-5xl animate-pulse">🥗</div>
      <div className="absolute top-1/3 right-5 text-6xl animate-bounce-slow">
        🍣
      </div>

      {/* Patrón de fondo de comida */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      {/* Contenedor principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {/* Tarjeta de login estilo menú */}
        <div className="w-full max-w-md">
          {/* Cabecera del restaurante */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-white rounded-full shadow-xl shadow-orange-200/50 mb-4">
              <span className="text-6xl">🍽️</span>
            </div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
              Sabor Express
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              ¡Bienvenido a tu cocina favorita!
            </p>
          </div>

          {/* Tarjeta principal estilo receta */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl shadow-orange-300/20 border border-orange-100 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            {/* Decoración superior como mantel */}
            <div className="h-3 bg-linear-to-r from-orange-400 via-red-500 to-amber-400"></div>

            <div className="p-8">
              {/* Iconos decorativos de ingredientes */}
              <div className="flex justify-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform">
                  <span className="text-2xl">🧂</span>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center transform -rotate-12 hover:rotate-0 transition-transform">
                  <span className="text-2xl">🌶️</span>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform">
                  <span className="text-2xl">🧀</span>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center transform -rotate-12 hover:rotate-0 transition-transform">
                  <span className="text-2xl">🥑</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                Iniciar Sesión
              </h2>
              <p className="text-gray-500 text-center mb-8 text-sm">
                Ingresa tus datos para ordenar
              </p>

              {/* Formulario estilo orden de comida */}
              <div className="space-y-6">
                {/* Campo usuario estilo "tu orden" */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="text-lg">👨‍🍳</span>
                    Tu nombre de chef
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400 group-focus-within:text-orange-500 transition-colors">
                        👤
                      </span>
                    </div>
                    <input
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 focus:bg-white transition-all outline-none text-gray-700 placeholder-gray-400"
                      placeholder="ej. Juan Pérez"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                {/* Campo contraseña estilo "receta secreta" */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="text-lg">🔪</span>
                    Receta secreta
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400 group-focus-within:text-orange-500 transition-colors">
                        🔒
                      </span>
                    </div>
                    <input
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 focus:bg-white transition-all outline-none text-gray-700 placeholder-gray-400"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* Opciones extras estilo menú */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer group">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-md group-hover:border-orange-400 transition-colors flex items-center justify-center">
                      <span className="text-orange-500 hidden group-hover:block">
                        ✓
                      </span>
                    </div>
                    <span>Recordar mi orden</span>
                  </label>
                  <a
                    href="#"
                    className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
                  >
                    <span>¿Olvidaste tu receta?</span>
                    <span>→</span>
                  </a>
                </div>

                {/* Botón de ingreso estilo "ordenar ahora" */}
                <button
                  onClick={handleLogin}
                  className="w-full bg-linear-to-r from-orange-500 via-red-500 to-amber-500 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/30 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <span className="text-2xl group-hover:rotate-12 transition-transform">
                    🍳
                  </span>
                  <span>¡Cocinar ahora!</span>
                  <span className="text-2xl group-hover:rotate-12 transition-transform">
                    👨‍🍳
                  </span>
                </button>

                {/* Enlace de registro estilo "nuevo en el restaurante" */}
                <div className="text-center pt-4 border-t-2 border-dashed border-gray-200">
                  <p className="text-gray-600">
                    ¿Eres nuevo en Sabor Express?{" "}
                    <a
                      href="#"
                      className="text-orange-600 hover:text-orange-700 font-semibold hover:underline"
                    >
                      Crea tu receta aquí
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Pie con especialidades */}
            <div className="bg-linear-to-r from-orange-50 to-amber-50 px-6 py-4 border-t border-orange-100">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>🍕 Italiana</span>
                <span>🍣 Japonesa</span>
                <span>🌮 Mexicana</span>
                <span>🥘 Española</span>
              </div>
            </div>
          </div>

          {/* Mensaje de especialidad */}
          <p className="text-center mt-6 text-gray-500 text-sm">
            Hoy tenemos 🍝 pasta fresca y 🥩 cortes especiales
          </p>
        </div>
      </div>
    </div>
  );
}
