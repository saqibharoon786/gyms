import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, UserPlus } from "lucide-react";
import { addMember, getMembers, useStoreVersion } from "@/lib/members-store";
import { toast } from "sonner";

const programs = ["Personal Training", "Group Classes", "Home Training", "Body Transformation", "Nutrition Consultation"];

const Registration = () => {
  useStoreVersion();
  const [done, setDone] = useState<null | { id: string; name: string; program: string }>(null);
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", age: "",
    height: "", weight: "", address: "",
    emergencyName: "", emergencyPhone: "", medicalIssues: "",
    program: programs[0], goal: "",
    registrationFee: "5000", monthlyFee: "8500",
    joinDate: today,
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const m = addMember({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      age: Number(form.age) || 0,
      program: form.program,
      goal: form.goal.trim(),
      registrationFee: Number(form.registrationFee) || 0,
      registrationPaid: false,
      monthlyFee: Number(form.monthlyFee) || 0,
      joinDate: form.joinDate,
      height: form.height.trim(),
      weight: form.weight.trim(),
      address: form.address.trim(),
      emergencyName: form.emergencyName.trim(),
      emergencyPhone: form.emergencyPhone.trim(),
      medicalIssues: form.medicalIssues.trim(),
    });
    toast.success(`Member registered: ${m.id}`, { description: `${m.name} - ${m.program}` });
    setDone({ id: m.id, name: m.name, program: m.program });
  };

  const reset = () => {
    setDone(null);
    setForm({
      name: "", email: "", phone: "", age: "",
      height: "", weight: "", address: "",
      emergencyName: "", emergencyPhone: "", medicalIssues: "",
      program: programs[0], goal: "",
      registrationFee: "5000", monthlyFee: "8500",
      joinDate: new Date().toISOString().slice(0, 10),
    });
  };

  const total = getMembers().length;

  if (done) {
    return (
      <div className="max-w-xl mx-auto glass-card rounded-2xl p-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-full grid place-items-center bg-neon/15 mb-4 neon-glow-sm">
          <CheckCircle2 className="w-8 h-8 text-neon" />
        </div>
        <h2 className="font-display text-2xl">Registration Successful! 🎉</h2>
        <p className="text-sm text-muted-foreground mt-2">
          {done.name} ki <span className="text-neon">{done.program}</span> registration complete.
        </p>
        <div className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neon/10 border border-neon/30">
          <span className="text-xs text-muted-foreground">Member ID</span>
          <span className="font-display text-xl text-neon tracking-wider">{done.id}</span>
        </div>
        <p className="text-[11px] text-muted-foreground mt-4">
          Yeh ID Fees module main dropdown main dikhayi degi.
        </p>
        <Button variant="neon-outline" className="mt-6" onClick={reset}>Register Another</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-1 flex-wrap">
        <div className="text-xs text-neon tracking-widest uppercase">New Member</div>
        <span className="text-[10px] text-muted-foreground">Total members: <span className="text-foreground">{total}</span></span>
      </div>
      <h1 className="font-display text-2xl sm:text-3xl flex items-center gap-3">
        <UserPlus className="w-6 h-6 sm:w-7 sm:h-7 text-neon" /> Register Member
      </h1>
      <p className="text-muted-foreground text-sm mt-2">
        Member ki details bharein. Unique ID automatic generate hogi (e.g. <span className="text-neon">TR-{new Date().getFullYear()}-0001</span>).
      </p>

      <form onSubmit={submit} className="glass-card rounded-2xl p-4 sm:p-6 md:p-8 mt-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full Name"><Input required value={form.name} onChange={(e) => update("name", e.target.value)} /></Field>
          <Field label="Email"><Input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} /></Field>
          <Field label="Phone"><Input required value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+92 300 1234567" /></Field>
          <Field label="Age"><Input required type="number" value={form.age} onChange={(e) => update("age", e.target.value)} /></Field>
          <Field label="Program">
            <select value={form.program} onChange={(e) => update("program", e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
              {programs.map((p) => <option key={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="Goal"><Input value={form.goal} onChange={(e) => update("goal", e.target.value)} placeholder="e.g. weight loss" /></Field>
          <Field label="Registration Fee (PKR) - one time">
            <Input required type="number" value={form.registrationFee} onChange={(e) => update("registrationFee", e.target.value)} />
          </Field>
          <Field label="Monthly Fee (PKR)">
            <Input required type="number" value={form.monthlyFee} onChange={(e) => update("monthlyFee", e.target.value)} />
          </Field>
          <Field label="Height (e.g. 5'8 or 172cm)"><Input value={form.height} onChange={(e) => update("height", e.target.value)} /></Field>
          <Field label="Weight (kg)"><Input value={form.weight} onChange={(e) => update("weight", e.target.value)} placeholder="70" /></Field>
          <Field label="Emergency Contact Name"><Input value={form.emergencyName} onChange={(e) => update("emergencyName", e.target.value)} /></Field>
          <Field label="Emergency Contact Phone"><Input value={form.emergencyPhone} onChange={(e) => update("emergencyPhone", e.target.value)} placeholder="+92 300 0000000" /></Field>
          <div className="sm:col-span-2">
            <Field label="Address"><Input value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="House #, Street, Area, City" /></Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Any Medical Issues / Allergies"><Input value={form.medicalIssues} onChange={(e) => update("medicalIssues", e.target.value)} placeholder="e.g. asthma, knee injury — or 'None'" /></Field>
          </div>
          <Field label="Join Date (fees cycle is calculated from this date)">
            <Input required type="date" value={form.joinDate} onChange={(e) => update("joinDate", e.target.value)} max={new Date().toISOString().slice(0, 10)} />
          </Field>
        </div>
        <Button type="submit" variant="neon" size="lg" className="w-full sm:w-auto">
          <UserPlus className="w-4 h-4" /> Register & Generate ID
        </Button>
      </form>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="text-xs">{label}</Label>
    {children}
  </div>
);

export default Registration;
