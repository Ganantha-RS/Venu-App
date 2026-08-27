import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("venu_token");
      if (token) {
        try {
          const response = await api.get("/auth/me");
          // Format respon API dari AuthController: { success: true, message: '...', data: user }
          setUser(response.data.data);
        } catch (error) {
          console.error("Failed to fetch authenticated user:", error);
          localStorage.removeItem("venu_token");
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("venu_token", token);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      localStorage.removeItem("venu_token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}


