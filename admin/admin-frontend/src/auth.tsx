import { createContext, useContext, useEffect, useState } from "react";
import { api } from "./api";

const Ctx = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setReady(true);
      return;
    }
    api("/auth/me")
      .then((d) => setUser(d.user || { email: localStorage.getItem("email") }))
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  async function login(email: string, password: string) {
    const r = await api("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
    localStorage.setItem("token", r.token);
    localStorage.setItem("email", r.user.email);
    setUser(r.user);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    location.href = "/login";
  }

  return <Ctx.Provider value={{ user, ready, login, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
