import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Role = "super_admin" | "admin" | "member";

type User = { email: string; name: string; role: Role };

type AuthCtx = {
  user: User | null;
  signIn: (email: string, password: string) => { ok: boolean; error?: string };
  signOut: () => void;
};

const Ctx = createContext<AuthCtx | undefined>(undefined);
const KEY = "tr_auth_user";

// Demo credentials with roles
const ACCOUNTS: Record<string, { password: string; name: string; role: Role }> = {
  "superadmin@therunners.com": { password: "super1234", name: "Super Admin", role: "super_admin" },
  "admin@therunners.com": { password: "admin1234", name: "Admin Staff", role: "admin" },
  "demo@therunners.com": { password: "demo1234", name: "Demo Member", role: "member" },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  const signIn = (email: string, password: string) => {
    if (!email || !password) return { ok: false, error: "Email aur password dono required hain." };
    const e = email.trim().toLowerCase();
    const acc = ACCOUNTS[e];
    if (!acc || acc.password !== password) {
      return { ok: false, error: "Galat email ya password. Demo credentials use karein." };
    }
    const u: User = { email: e, name: acc.name, role: acc.role };
    localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
    return { ok: true };
  };

  const signOut = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };

  return <Ctx.Provider value={{ user, signIn, signOut }}>{children}</Ctx.Provider>;
};

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be inside AuthProvider");
  return c;
};
