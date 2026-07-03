import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Wallet, LogOut, ArrowLeft, Menu, Inbox, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const allItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true, roles: ["super_admin", "member"] as const },
  { to: "/dashboard/registration", label: "Registration", icon: ClipboardList, roles: ["super_admin", "admin"] as const },
  { to: "/dashboard/fees", label: "Fees", icon: Wallet, roles: ["super_admin", "admin"] as const },
  { to: "/dashboard/inquiries", label: "Inquiries", icon: Inbox, roles: ["super_admin", "admin"] as const },
];

const DashboardLayout = () => {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    document.documentElement.classList.add("dark");
    setOpen(false);
  }, [loc.pathname]);

  if (!user) return <Navigate to="/signin" replace />;

  // Admins land on Registration (no dashboard access)
  if (user.role === "admin" && loc.pathname === "/dashboard") {
    return <Navigate to="/dashboard/registration" replace />;
  }

  const items = allItems.filter((i) => i.roles.includes(user.role as never));

  const roleLabel =
    user.role === "super_admin" ? "Super Admin" :
    user.role === "admin" ? "Admin Panel" : "Member Portal";
  const roleColor = user.role === "super_admin" ? "text-neon" : user.role === "admin" ? "text-amber-400" : "text-foreground/70";

  const Sidebar = (
    <aside className="w-64 shrink-0 border-r border-neon/10 bg-background/60 backdrop-blur-xl flex flex-col">
      <div className="p-5 border-b border-neon/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-background/40 p-1 grid place-items-center neon-glow-sm">
          <img src={logo} alt="The Runners" className="w-full h-full object-contain" />
        </div>
        <div className="leading-tight">
          <div className="font-display text-base tracking-wider">THE <span className="text-neon">RUNNERS</span></div>
          <div className={cn("text-[10px] flex items-center gap-1", roleColor)}>
            <Shield className="w-2.5 h-2.5" /> {roleLabel}
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {items.map((i) => {
          const I = i.icon;
          return (
            <NavLink
              key={i.to}
              to={i.to}
              end={i.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                  isActive ? "bg-neon/15 text-neon" : "text-foreground/80 hover:bg-neon/5 hover:text-neon"
                )
              }
            >
              <I className="w-4 h-4" />
              {i.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-neon/10 space-y-2">
        <div className="px-3 py-2 rounded-lg bg-background/40">
          <div className="text-xs text-muted-foreground">Signed in as</div>
          <div className="text-sm text-foreground truncate">{user.name}</div>
          <div className="text-[10px] text-muted-foreground truncate">{user.email}</div>
        </div>
        <NavLink to="/" className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-neon">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to site
        </NavLink>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-destructive hover:bg-destructive/10 rounded-lg"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex">{Sidebar}</div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 flex">{Sidebar}</div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-neon/10 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
          <button onClick={() => setOpen(true)} className="p-2"><Menu className="w-5 h-5" /></button>
          <div className="font-display tracking-wider text-sm">
            THE <span className="text-neon">RUNNERS</span>
            <span className={cn("ml-2 text-[10px]", roleColor)}>{roleLabel}</span>
          </div>
          <Button size="sm" variant="ghost" onClick={signOut}><LogOut className="w-4 h-4" /></Button>
        </header>

        <main className="flex-1 p-3 sm:p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
