import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CalendarClock, CheckCircle2, Clock, CreditCard, Receipt, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getMembers,
  getMemberPayments,
  getPayments,
  markMonthlyPaid,
  updateMember,
  ensureCurrentMonthPayment,
  useStoreVersion,
} from "@/lib/members-store";

const Fees = () => {
  useStoreVersion();
  const members = getMembers();
  const [selectedId, setSelectedId] = useState<string>(members[0]?.id ?? "");

  // Ensure the current month payment row exists for every member
  members.forEach((m) => ensureCurrentMonthPayment(m.id));

  const member = useMemo(() => members.find((m) => m.id === selectedId), [members, selectedId]);
  const payments = useMemo(() => (member ? getMemberPayments(member.id) : []), [member, selectedId]);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const currentPayment = payments.find((p) => p.month === currentMonth);

  // Build the cycle schedule for ALL members (current month due)
  const today = new Date();
  const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const allPayments = getPayments();
  const schedule = members.map((m) => {
    const joinDay = new Date(m.joinDate).getDate();
    const y = today.getFullYear();
    const mo = today.getMonth();
    // clamp day to last day of month
    const lastDay = new Date(y, mo + 1, 0).getDate();
    const dueDay = Math.min(joinDay, lastDay);
    const dueDate = new Date(y, mo, dueDay);
    const pay = allPayments.find((p) => p.memberId === m.id && p.month === currentMonth);
    const isPaid = pay?.status === "Paid";
    const isOverdue = !isPaid && todayMid > dueDate;
    const isDueToday = !isPaid && todayMid.getTime() === dueDate.getTime();
    return { m, dueDate, pay, isPaid, isOverdue, isDueToday };
  }).sort((a, b) => {
    // overdue first, then due-today, then upcoming, then paid
    const rank = (x: typeof a) => x.isOverdue ? 0 : x.isDueToday ? 1 : !x.isPaid ? 2 : 3;
    return rank(a) - rank(b) || a.dueDate.getTime() - b.dueDate.getTime();
  });

  if (members.length === 0) {
    return (
      <div className="max-w-xl mx-auto glass-card rounded-2xl p-10 text-center">
        <Users className="w-12 h-12 text-neon mx-auto mb-3" />
        <h2 className="font-display text-2xl">No Members Yet</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Pehle Registration module se member add karein. Phir un ki fees yahan manage hongi.
        </p>
      </div>
    );
  }

  const clearRegistration = () => {
    if (!member) return;
    updateMember(member.id, { registrationPaid: true });
  };
  const clearMonthly = () => {
    if (!member || !currentPayment) return;
    markMonthlyPaid(member.id, currentPayment.month);
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <div className="text-xs text-neon tracking-widest uppercase">Billing</div>
        <h1 className="font-display text-2xl sm:text-3xl mt-1">Fees & Payments</h1>
        <p className="text-muted-foreground text-sm mt-2">
          Member select karein - registration fee aur monthly fee alag alag manage karein.
        </p>
      </div>

      {/* Monthly Dues Schedule - all members current cycle */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-neon/10 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-neon" />
            <h2 className="font-display text-lg">Monthly Dues Schedule</h2>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-destructive" /> Overdue</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-400" /> Pending</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-neon" /> Paid</span>
          </div>
        </div>
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3">Member</th>
                <th className="text-left px-4 py-3">ID</th>
                <th className="text-left px-4 py-3">Due Date</th>
                <th className="text-left px-4 py-3">Amount</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-right px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map(({ m, dueDate, isPaid, isOverdue, isDueToday }) => {
                const dateStr = dueDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
                const daysDiff = Math.round((dueDate.getTime() - todayMid.getTime()) / 86400000);
                const nextJoinDay = new Date(m.joinDate).getDate();
                const nextMonthLast = new Date(today.getFullYear(), today.getMonth() + 2, 0).getDate();
                const nextDue = new Date(today.getFullYear(), today.getMonth() + 1, Math.min(nextJoinDay, nextMonthLast));
                return (
                  <tr
                    key={m.id}
                    className={cn(
                      "border-t border-border/40 transition-colors",
                      isOverdue && "bg-destructive/10 hover:bg-destructive/15",
                      isDueToday && !isPaid && "bg-yellow-400/10",
                      !isOverdue && !isDueToday && "hover:bg-muted/30",
                    )}
                  >
                    <td className="px-4 py-3 font-medium">{m.name}</td>
                    <td className="px-4 py-3 text-neon font-display text-xs">{m.id}</td>
                    <td className={cn("px-4 py-3", isOverdue && "text-destructive font-semibold")}>
                      {dateStr}
                      {!isPaid && (
                        <span className="block text-[10px] text-muted-foreground mt-0.5">
                          {isOverdue
                            ? `${Math.abs(daysDiff)} day(s) overdue`
                            : isDueToday
                            ? "Due today"
                            : `in ${daysDiff} day(s)`}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">PKR {m.monthlyFee.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {isPaid ? (
                        <Badge className="bg-neon/15 text-neon border-neon/30 gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Paid
                        </Badge>
                      ) : isOverdue ? (
                        <Badge className="bg-destructive/20 text-destructive border-destructive/40 gap-1">
                          <AlertTriangle className="w-3 h-3" /> Overdue
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <Clock className="w-3 h-3" /> Pending
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {!isPaid ? (
                        <Button
                          size="sm"
                          variant={isOverdue ? "destructive" : "neon-outline"}
                          onClick={() => markMonthlyPaid(m.id, currentMonth)}
                        >
                          Mark Paid
                        </Button>
                      ) : (
                        <span className="text-[11px] text-muted-foreground">
                          Next: {nextDue.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-border/40">
          {schedule.map(({ m, dueDate, isPaid, isOverdue, isDueToday }) => {
            const dateStr = dueDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
            const daysDiff = Math.round((dueDate.getTime() - todayMid.getTime()) / 86400000);
            return (
              <div
                key={m.id}
                className={cn(
                  "p-4 space-y-2",
                  isOverdue && "bg-destructive/10",
                  isDueToday && !isPaid && "bg-yellow-400/10",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-medium truncate">{m.name}</div>
                    <div className="text-neon font-display text-[11px]">{m.id}</div>
                  </div>
                  {isPaid ? (
                    <Badge className="bg-neon/15 text-neon border-neon/30 gap-1 shrink-0">
                      <CheckCircle2 className="w-3 h-3" /> Paid
                    </Badge>
                  ) : isOverdue ? (
                    <Badge className="bg-destructive/20 text-destructive border-destructive/40 gap-1 shrink-0">
                      <AlertTriangle className="w-3 h-3" /> Overdue
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="gap-1 shrink-0">
                      <Clock className="w-3 h-3" /> Pending
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className={cn(isOverdue && "text-destructive font-semibold")}>
                    <span className="text-muted-foreground">Due: </span>{dateStr}
                    {!isPaid && (
                      <span className="block text-[10px] text-muted-foreground">
                        {isOverdue ? `${Math.abs(daysDiff)} day(s) overdue` : isDueToday ? "Due today" : `in ${daysDiff} day(s)`}
                      </span>
                    )}
                  </div>
                  <div className="font-medium">PKR {m.monthlyFee.toLocaleString()}</div>
                </div>
                {!isPaid && (
                  <Button
                    size="sm"
                    variant={isOverdue ? "destructive" : "neon-outline"}
                    className="w-full"
                    onClick={() => markMonthlyPaid(m.id, currentMonth)}
                  >
                    Mark Paid
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>


      {/* Member dropdown */}
      <div className="glass-card rounded-xl p-5">
        <label className="text-xs text-muted-foreground uppercase tracking-wider">Select Member</label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full mt-2 h-12 rounded-md border border-neon/20 bg-background px-3 text-sm font-medium"
        >
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} ({m.id}) - {m.program}
            </option>
          ))}
        </select>
      </div>

      {member && (
        <>
          {/* Two fee cards: registration + monthly */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* Registration Fee */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Registration Fee</div>
                  <div className="font-display text-xs text-neon mt-1">ONE-TIME</div>
                </div>
                <Receipt className="w-5 h-5 text-neon" />
              </div>
              <div className="font-display text-3xl mt-4">PKR {member.registrationFee.toLocaleString()}</div>
              <div className="mt-3">
                {member.registrationPaid ? (
                  <Badge className="bg-neon/15 text-neon border-neon/30 gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Paid
                  </Badge>
                ) : (
                  <Badge variant="outline" className="gap-1"><Clock className="w-3 h-3" /> Pending</Badge>
                )}
              </div>
              {!member.registrationPaid && (
                <Button variant="neon" className="mt-5 w-full" onClick={clearRegistration}>
                  <CheckCircle2 className="w-4 h-4" /> Mark Registration Paid
                </Button>
              )}
            </div>

            {/* Monthly Fee */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Monthly Fee</div>
                  <div className="font-display text-xs text-neon mt-1">{new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase()}</div>
                </div>
                <CreditCard className="w-5 h-5 text-neon" />
              </div>
              <div className="font-display text-3xl mt-4">PKR {member.monthlyFee.toLocaleString()}</div>
              <div className="mt-3">
                {currentPayment?.status === "Paid" ? (
                  <Badge className="bg-neon/15 text-neon border-neon/30 gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Cleared
                  </Badge>
                ) : (
                  <Badge variant="outline" className="gap-1"><Clock className="w-3 h-3" /> Pending</Badge>
                )}
              </div>
              {currentPayment?.status !== "Paid" && (
                <Button variant="neon" className="mt-5 w-full" onClick={clearMonthly}>
                  <CheckCircle2 className="w-4 h-4" /> Clear Monthly Fee
                </Button>
              )}
            </div>
          </div>

          {/* Member info */}
          <div className="glass-card rounded-xl p-5 grid sm:grid-cols-4 gap-3 text-sm">
            <Info k="Member ID" v={<span className="text-neon font-display">{member.id}</span>} />
            <Info k="Phone" v={member.phone} />
            <Info k="Email" v={member.email} />
            <Info k="Joined" v={new Date(member.joinDate).toLocaleDateString()} />
          </div>

          {/* Payment history */}
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-neon/10 flex items-center justify-between">
              <h2 className="font-display text-lg">Monthly Payment History</h2>
              <span className="text-xs text-muted-foreground">{payments.length} record(s)</span>
            </div>
            <div className="divide-y divide-border/40">
              {payments.length === 0 && (
                <div className="px-5 py-8 text-center text-sm text-muted-foreground">No payments yet</div>
              )}
              {payments.map((p) => (
                <div key={p.month} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
                  <div className="min-w-[110px] text-sm font-medium">
                    {new Date(p.month + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </div>
                  <div className="text-sm flex-1 min-w-[100px]">PKR {p.amount.toLocaleString()}</div>
                  <div>
                    {p.status === "Paid" ? (
                      <Badge className="bg-neon/15 text-neon border-neon/30 gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Paid
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="gap-1"><Clock className="w-3 h-3" /> Pending</Badge>
                    )}
                  </div>
                  {p.status === "Paid" && p.paidDate && (
                    <div className="text-[11px] text-muted-foreground ml-auto">
                      Paid on {new Date(p.paidDate).toLocaleDateString()}
                    </div>
                  )}
                  {p.status !== "Paid" && (
                    <Button size="sm" variant="neon-outline" className="ml-auto" onClick={() => markMonthlyPaid(member.id, p.month)}>
                      Clear
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Info = ({ k, v }: { k: string; v: React.ReactNode }) => (
  <div>
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
    <div className="mt-1">{v}</div>
  </div>
);

export default Fees;
