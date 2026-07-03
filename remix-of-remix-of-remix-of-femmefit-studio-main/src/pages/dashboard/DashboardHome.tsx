import { useAuth } from "@/context/AuthContext";
import { Activity, Inbox, TrendingUp, Users, Wallet, AlertCircle } from "lucide-react";
import { getInquiries, getMembers, getPayments, useStoreVersion } from "@/lib/members-store";
import { Navigate } from "react-router-dom";

const DashboardHome = () => {
  useStoreVersion();
  const { user } = useAuth();

  // Admin role doesn't see dashboard
  if (user?.role === "admin") return <Navigate to="/dashboard/registration" replace />;

  const members = getMembers();
  const payments = getPayments();
  const inquiries = getInquiries();
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyPaid = payments.filter((p) => p.month === currentMonth && p.status === "Paid");
  const monthlyPending = payments.filter((p) => p.month === currentMonth && p.status === "Pending");
  const monthlyRevenue = monthlyPaid.reduce((s, p) => s + p.amount, 0);
  const regRevenue = members.filter((m) => m.registrationPaid).reduce((s, m) => s + m.registrationFee, 0);

  const isSuperAdmin = user?.role === "super_admin";

  if (!isSuperAdmin) {
    // Member view
    return (
      <div className="space-y-6 max-w-4xl">
        <div>
          <div className="text-xs text-neon tracking-widest uppercase">Welcome back</div>
          <h1 className="font-display text-3xl md:text-4xl mt-1">Hi, {user?.name} 👋</h1>
          <p className="text-muted-foreground text-sm mt-2">Your fitness journey at a glance.</p>
        </div>
        <div className="glass-card rounded-2xl p-8 text-center">
          <Activity className="w-10 h-10 text-neon mx-auto" />
          <h2 className="font-display text-2xl mt-3">Keep going! 💪</h2>
          <p className="text-sm text-muted-foreground mt-2">Your trainer will update your progress soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 max-w-6xl">
      <div>
        <div className="text-xs text-neon tracking-widest uppercase">Super Admin</div>
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl mt-1 break-words">Welcome, {user?.name} 🛡️</h1>
        <p className="text-muted-foreground text-sm mt-2">Full overview of The Runners Gym.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={Users} label="Total Members" value={String(members.length)} sub="Registered" />
        <Stat icon={Wallet} label="Monthly Revenue" value={`PKR ${monthlyRevenue.toLocaleString()}`} sub={`${monthlyPaid.length} paid this month`} />
        <Stat icon={AlertCircle} label="Pending Fees" value={String(monthlyPending.length)} sub="Members to clear" tone="warn" />
        <Stat icon={Inbox} label="New Inquiries" value={String(inquiries.length)} sub="From website" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6">
          <h2 className="font-display text-xl mb-4">Recent Members</h2>
          <div className="space-y-2">
            {members.slice(0, 5).map((m) => (
              <div key={m.id} className="flex items-center justify-between p-3 rounded-lg bg-background/40 border border-neon/10">
                <div>
                  <div className="text-sm font-medium">{m.name}</div>
                  <div className="text-[11px] text-muted-foreground">{m.id} · {m.program}</div>
                </div>
                <span className="text-xs text-neon">PKR {m.monthlyFee}/mo</span>
              </div>
            ))}
            {members.length === 0 && <p className="text-sm text-muted-foreground">No members yet. Register some!</p>}
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h2 className="font-display text-xl mb-4">Recent Inquiries</h2>
          <div className="space-y-2">
            {inquiries.slice(0, 5).map((i) => (
              <div key={i.id} className="p-3 rounded-lg bg-background/40 border border-neon/10">
                <div className="text-sm font-medium">{i.name}</div>
                <div className="text-[11px] text-muted-foreground">{i.email} · {i.program}</div>
              </div>
            ))}
            {inquiries.length === 0 && <p className="text-sm text-muted-foreground">No inquiries yet.</p>}
          </div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 text-neon mb-1">
          <TrendingUp className="w-4 h-4" /> Lifetime Registration Revenue
        </div>
        <div className="font-display text-2xl text-foreground">PKR {regRevenue.toLocaleString()}</div>
      </div>
    </div>
  );
};

const Stat = ({ icon: I, label, value, sub, tone }: { icon: any; label: string; value: string; sub: string; tone?: "warn" }) => (
  <div className="glass-card rounded-xl p-4">
    <div className="flex items-center justify-between">
      <I className={`w-5 h-5 ${tone === "warn" ? "text-amber-400" : "text-neon"}`} />
    </div>
    <div className="font-display text-xl mt-3 break-words">{value}</div>
    <div className="text-xs text-muted-foreground mt-1">{label}</div>
    <div className="text-[10px] text-muted-foreground/80 mt-0.5">{sub}</div>
  </div>
);

export default DashboardHome;
