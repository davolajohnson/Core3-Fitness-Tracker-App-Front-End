// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { fetchMe, getToken } from "../services/authServices";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hydrating, setHydrating] = useState(true);

  // hydrate user on first load if token exists
  useEffect(() => {
    (async () => {
      const token = getToken();
      if (!token) {
        setHydrating(false);
        return;
      }
      try {
        const me = await fetchMe();   // {_id, username} or null
        setUser(me);
      } catch {
        // ignore; token might be invalid/expired
      } finally {
        setHydrating(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, hydrating }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
