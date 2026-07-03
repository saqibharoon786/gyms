import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, LogIn, Shield, User } from "lucide-react";
import logo from "@/assets/logo.png";

const demoAccounts = [
  { role: "Super Admin", email: "superadmin@therunners.com", password: "super1234", icon: Shield, tone: "text-neon" },
  { role: "Admin", email: "admin@therunners.com", password: "admin1234", icon: Shield, tone: "text-amber-400" },
  { role: "Member", email: "demo@therunners.com", password: "demo1234", icon: User, tone: "text-foreground/80" },
];

const SignIn = () => {
  const { user, signIn } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("superadmin@therunners.com");
  const [password, setPassword] = useState("super1234");
  const [err, setErr] = useState<string | null>(null);

  if (user) return <Navigate to="/dashboard" replace />;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = signIn(email, password);
    if (!r.ok) return setErr(r.error || "Login failed");
    nav("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-neon/10 pointer-events-none" />
      <Link to="/" className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon">
        <ArrowLeft className="w-4 h-4" /> Back to site
      </Link>

      <div className="w-full max-w-md glass-card rounded-2xl p-8 relative">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-background/40 p-1 grid place-items-center neon-glow-sm">
            <img src={logo} alt="The Runners" className="w-full h-full object-contain" />
          </div>
          <h1 className="font-display text-2xl tracking-wider mt-3">
            STAFF & MEMBER <span className="text-neon text-glow-soft">LOGIN</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Sign in to your portal</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          {err && <div className="text-xs text-destructive">{err}</div>}
          <Button type="submit" variant="neon" className="w-full">
            <LogIn className="w-4 h-4" /> Sign In
          </Button>
        </form>

        <div className="mt-5 pt-4 border-t border-border/40">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2 text-center">Demo Credentials</p>
          <div className="space-y-1.5">
            {demoAccounts.map((a) => {
              const I = a.icon;
              return (
                <button
                  key={a.email}
                  type="button"
                  onClick={() => { setEmail(a.email); setPassword(a.password); setErr(null); }}
                  className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-background/40 border border-border/40 hover:border-neon/40 text-left transition-colors"
                >
                  <I className={`w-4 h-4 ${a.tone}`} />
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-medium ${a.tone}`}>{a.role}</div>
                    <div className="text-[10px] text-muted-foreground truncate">{a.email} / {a.password}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
