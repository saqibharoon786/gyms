import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Check, Users, CalendarClock, Sparkles, User, UserPlus, UsersRound,
  Dumbbell, HeartHandshake, Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { waLink } from "@/lib/whatsapp";
import { toast } from "sonner";

type Plan = {
  name: string;
  step: string;
  icon: typeof Users;
  price: string;
  subtitle: string;
  desc: string[];
};

const groupPlans: Plan[] = [
  {
    name: "Fixed Slot",
    step: "01",
    icon: Users,
    price: "5,000",
    subtitle: "Same Time · Same Group",
    desc: ["Train with the same group every day", "Locked time slot", "Consistent batch of women"],
  },
  {
    name: "Flexible Slot",
    step: "02",
    icon: CalendarClock,
    price: "6,000",
    subtitle: "Flexible Time · Any Trainer",
    desc: ["Flexible Time", "Option of Choosing Any Trainer's Class", "Switch between morning & evening"],
  },
  {
    name: "Customized Group Class",
    step: "03",
    icon: Sparkles,
    price: "7,000",
    subtitle: "Tailored Workouts · Focused Guidance",
    desc: ["Tailored Workouts", "Focused Guidance", "Small group with personalised attention"],
  },
];

const personalPlans: Plan[] = [
  {
    name: "Individual Personal Training",
    step: "01",
    icon: User,
    price: "17,000",
    subtitle: "1 in 1 Session",
    desc: ["Fully private 1-on-1 coaching", "100% trainer attention", "Custom workout & diet"],
  },
  {
    name: "Pair Personal Training",
    step: "02",
    icon: UserPlus,
    price: "14,000",
    subtitle: "2 Members in One Class",
    desc: ["Train with a friend or sister", "Shared private session", "Personalised programming"],
  },
  {
    name: "2 Pair Personal Trainer",
    step: "03",
    icon: UsersRound,
    price: "10,000",
    subtitle: "4 Members in One Class",
    desc: ["Mini-group with 4 members", "Dedicated personal trainer", "Best value 1-on-few coaching"],
  },
];

const includes = [
  { icon: Dumbbell, label: "Machines + Floor Training" },
  { icon: HeartHandshake, label: "Trainer Support" },
  { icon: Leaf, label: "Free Diet Plan" },
];

const REGISTRATION_FEE = "2,000";

export const PricingSection = () => {
  const [selected, setSelected] = useState<Plan | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", age: "", goal: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please enter your name and phone number.");
      return;
    }
    const msg = [
      `Assalam u Alaikum! I'd like to enroll in *The Runners — ${selected.name}* (PKR ${selected.price}/month + PKR ${REGISTRATION_FEE} registration).`,
      ``,
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      form.age ? `*Age:* ${form.age}` : "",
      form.goal ? `*Goal:* ${form.goal}` : "",
      ``,
      `Please share next steps. Shukriya!`,
    ].filter(Boolean).join("\n");
    window.open(waLink(msg), "_blank");
    toast.success("Opening WhatsApp with your enrollment details…");
    setSelected(null);
    setForm({ name: "", phone: "", age: "", goal: "" });
  };

  const PlanCard = ({ p, accentPopular }: { p: Plan; accentPopular?: boolean }) => {
    const Icon = p.icon;
    return (
      <div
        className={cn(
          "relative rounded-2xl bg-[hsl(120_25%_4%)] border p-6 flex flex-col hover-lift",
          accentPopular ? "border-neon shadow-[0_0_60px_-12px_hsl(var(--neon)/0.55)]" : "border-neon/25"
        )}
      >
        {/* Step number */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-md bg-neon text-primary-foreground font-display text-sm tracking-widest">
          {p.step}
        </div>

        <div className="mt-4 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full border-2 border-neon grid place-items-center mb-4">
            <Icon className="w-6 h-6 text-neon" />
          </div>
          <h3 className="font-display text-xl tracking-wide leading-tight">{p.name}</h3>
          <p className="text-[11px] uppercase tracking-widest text-neon mt-2">{p.subtitle}</p>
        </div>

        <ul className="space-y-2 my-5 text-sm text-foreground/80">
          {p.desc.map((d) => (
            <li key={d} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-neon mt-0.5 shrink-0" />
              <span>{d}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <div className="rounded-lg bg-neon text-primary-foreground py-3 text-center font-display text-2xl tracking-wider mb-3">
            {p.price}/-
          </div>
          <Button variant="neon-outline" className="w-full" onClick={() => setSelected(p)}>
            Choose Plan
          </Button>
        </div>
      </div>
    );
  };

  const FeeBlock = ({ title, subtitle, tagline, plans, popularIdx }: {
    title: string; subtitle: string; tagline: string; plans: Plan[]; popularIdx?: number;
  }) => (
    <div className="rounded-3xl border border-neon/20 bg-gradient-to-b from-[hsl(120_30%_5%)] to-[hsl(120_30%_3%)] p-6 sm:p-10 mb-14">
      <div className="text-center mb-10">
        <h3 className="font-display text-4xl sm:text-6xl text-neon text-glow leading-none">{title}</h3>
        <div className="inline-flex items-center gap-3 mt-3">
          <span className="h-px w-8 bg-neon/60" />
          <span className="text-sm tracking-[0.3em] uppercase text-foreground/90">{subtitle}</span>
          <span className="h-px w-8 bg-neon/60" />
        </div>
        <p className="font-serif-elegant italic text-lg mt-3">
          Built for <span className="text-neon">Stronger Women</span>
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-4">
        {plans.map((p, i) => (
          <PlanCard key={p.name} p={p} accentPopular={i === popularIdx} />
        ))}
      </div>

      {/* Includes bar */}
      <div className="mt-8 rounded-xl border border-neon/30 px-4 sm:px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {includes.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-9 h-9 rounded-full border border-neon/40 grid place-items-center shrink-0">
              <Icon className="w-4 h-4 text-neon" />
            </div>
            <span className="text-xs uppercase tracking-widest text-foreground/85">{label}</span>
          </div>
        ))}
      </div>

      {/* Registration fee */}
      <div className="mt-5 flex items-center justify-center gap-4 flex-wrap">
        <span className="text-xs uppercase tracking-[0.3em] text-foreground/80">Registration Fee</span>
        <span className="px-5 py-2 rounded-md bg-neon text-primary-foreground font-display text-xl tracking-wider">
          {REGISTRATION_FEE}/-
        </span>
      </div>
    </div>
  );

  return (
    <section id="pricing" className="relative py-16 sm:py-24 md:py-32">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-neon text-xs uppercase tracking-[0.3em] mb-4">— Gym Packages</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-none mb-5">
            Choose your <span className="text-gradient-neon">power plan</span>
          </h2>
          <p className="text-muted-foreground">
            All prices in PKR / month. One-time registration fee of {REGISTRATION_FEE}/-. Cancel anytime.
          </p>
        </div>

        <FeeBlock
          title="FEE STRUCTURE"
          subtitle="Ladies Group Training"
          tagline="Built for Stronger Women"
          plans={groupPlans}
          popularIdx={1}
        />

        <FeeBlock
          title="PERSONAL TRAINING"
          subtitle="One-to-One · 100% You"
          tagline="Built for Stronger Women"
          plans={personalPlans}
          popularIdx={0}
        />

        <p className="text-center text-xs text-muted-foreground">
          Call <span className="text-neon">0317 0570415</span> or DM <span className="text-neon">@therunners.fitnessstudio</span> for any query.
        </p>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-md bg-background/95 backdrop-blur-xl border-neon/30">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl leading-tight">
                  Enroll — {selected.name}
                </DialogTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  PKR {selected.price}/month + PKR {REGISTRATION_FEE} one-time registration.
                  Submit details and continue on WhatsApp.
                </p>
              </DialogHeader>

              <form onSubmit={submit} className="space-y-3 mt-2">
                <div className="space-y-1.5">
                  <Label className="text-xs">Full Name *</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Phone *</Label>
                    <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+92 300 1234567" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Age</Label>
                    <Input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="25" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Fitness Goal (optional)</Label>
                  <Textarea
                    rows={3}
                    value={form.goal}
                    onChange={(e) => setForm({ ...form, goal: e.target.value })}
                    placeholder="e.g. Weight loss, toning, postpartum recovery…"
                  />
                </div>
                <Button type="submit" variant="neon" size="lg" className="w-full">
                  Continue on WhatsApp
                </Button>
                <p className="text-[10px] text-muted-foreground text-center">
                  Your details will be sent directly to The Runners admissions team via WhatsApp.
                </p>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
