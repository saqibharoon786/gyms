import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, GraduationCap, Mail } from "lucide-react";
import { toast } from "sonner";
import { addInquiry, buildInquiryMailto, INQUIRY_RECIPIENT } from "@/lib/members-store";
import { z } from "zod";

const programs = ["Personal Training", "Group Classes", "Home Training", "Body Transformation", "Nutrition Consultation"];

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 letters").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  age: z.string().trim().regex(/^\d{1,2}$/, "Age must be 1-99"),
  program: z.string().min(1),
  message: z.string().trim().max(800),
});

type Props = { trigger: React.ReactNode };

export const AdmissionDialog = ({ trigger }: Props) => {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState<null | { name: string; email: string }>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", age: "", program: programs[0], message: "" });
  const [errs, setErrs] = useState<Record<string, string>>({});

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const m: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { m[i.path[0] as string] = i.message; });
      setErrs(m);
      return;
    }
    setErrs({});
    const data = parsed.data as { name: string; email: string; phone: string; age: string; program: string; message: string };
    addInquiry(data);
    // Open mailto so the inquiry email is sent to the admissions inbox
    const mailto = buildInquiryMailto(data);
    window.open(mailto, "_blank");
    setDone({ name: data.name, email: data.email });
    toast.success("Inquiry submitted successfully! 🎉", {
      description: "Our team will contact you within 24 hours.",
    });
  };

  const reset = () => {
    setDone(null);
    setForm({ name: "", email: "", phone: "", age: "", program: programs[0], message: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setDone(null); }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg max-h-[92vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-neon/20">
        {done ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-full grid place-items-center bg-neon/15 mb-4 neon-glow-sm">
              <CheckCircle2 className="w-9 h-9 text-neon" />
            </div>
            <h2 className="font-display text-2xl">Thank you, {done.name}! 🌟</h2>
            <p className="text-sm text-muted-foreground mt-3 px-4">
              Your admission inquiry has reached <span className="text-neon font-medium">The Runners Gym</span>.
              Our team will call you within the next <span className="text-neon">24 hours</span>.
            </p>
            <div className="glass-card rounded-xl p-4 mt-5 text-left text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-neon">
                <Mail className="w-3.5 h-3.5" /> Confirmation
              </div>
              <p className="text-muted-foreground leading-relaxed">
                A confirmation has been sent to <span className="text-foreground">{done.email}</span> and our admissions team at <span className="text-foreground">{INQUIRY_RECIPIENT}</span>.
              </p>
            </div>
            <Button variant="neon" className="mt-6 w-full" onClick={reset}>Done</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-neon/15 grid place-items-center neon-glow-sm">
                  <GraduationCap className="w-5 h-5 text-neon" />
                </div>
                <div>
                  <DialogTitle className="font-display text-2xl">Admission Inquiry</DialogTitle>
                  <p className="text-xs text-muted-foreground mt-1">Fill in your details — we'll contact you within 24 hours</p>
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={submit} className="space-y-3.5 mt-2">
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Full Name" err={errs.name}>
                  <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Ahmed Khan" />
                </Field>
                <Field label="Email" err={errs.email}>
                  <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" />
                </Field>
                <Field label="Phone" err={errs.phone}>
                  <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+92 300 1234567" />
                </Field>
                <Field label="Age" err={errs.age}>
                  <Input type="number" value={form.age} onChange={(e) => update("age", e.target.value)} placeholder="25" />
                </Field>
              </div>
              <Field label="Interested Program" err={errs.program}>
                <select
                  value={form.program}
                  onChange={(e) => update("program", e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {programs.map((p) => <option key={p}>{p}</option>)}
                </select>
              </Field>
              <Field label="Message (optional)" err={errs.message}>
                <Textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell us about your goals or any questions..."
                  rows={3}
                />
              </Field>
              <Button type="submit" variant="neon" size="lg" className="w-full mt-1">
                Submit Inquiry
              </Button>
              <p className="text-[10px] text-muted-foreground text-center">
                Inquiry will be sent directly to <span className="text-neon">{INQUIRY_RECIPIENT}</span>.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

const Field = ({ label, err, children }: { label: string; err?: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="text-xs">{label}</Label>
    {children}
    {err && <p className="text-[11px] text-destructive">{err}</p>}
  </div>
);
