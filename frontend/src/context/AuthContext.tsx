import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { loginRequest, getCurrentUser } from "../services/auth";

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // ✅ LOGIN
  const login = async (username: string, password: string) => {
    const data = await loginRequest(username, password);

    // Guardamos el token en localStorage
    localStorage.setItem("access", data.access);

    setToken(data.access);

    const userData = await getCurrentUser(data.access);
    setUser(userData);
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("access");
    setUser(null);
    setToken(null);
  };

  // ✅ MANTENER SESIÓN AL RECARGAR
  useEffect(() => {
    const storedToken = localStorage.getItem("access");

    if (storedToken) {
      setToken(storedToken);

      getCurrentUser(storedToken)
        .then((userData) => {
          setUser(userData);
        })
        .catch(() => {
          // Si el token ya no sirve lo borramos
          localStorage.removeItem("access");
          setUser(null);
          setToken(null);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
