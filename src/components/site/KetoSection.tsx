import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Salad, CheckCircle2 } from "lucide-react";

const days = [
  { day: "Mon", meal: "Avocado eggs + spinach" },
  { day: "Tue", meal: "Grilled chicken & broccoli" },
  { day: "Wed", meal: "Salmon, asparagus, butter" },
  { day: "Thu", meal: "Beef stir-fry with bell peppers" },
  { day: "Fri", meal: "Greek yogurt & berries bowl" },
  { day: "Sat", meal: "Cauliflower rice biryani" },
  { day: "Sun", meal: "Cheat-meal: keto pizza" },
];

export const KetoSection = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Your free keto plan is on its way! 🥑", {
      description: "Check your WhatsApp shortly.",
    });
    setOpen(false);
  };

  return (
    <section id="keto" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--neon)/0.12),transparent_60%)]" />
      <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full gradient-neon text-primary-foreground text-[10px] font-bold uppercase tracking-widest mb-5 neon-glow-sm">
            <Salad className="w-3.5 h-3.5" /> 100% Free
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-none mb-5">
            Your free <br />
            <span className="text-gradient-neon">keto meal plan</span>
          </h2>
          <p className="font-serif-elegant italic text-lg text-muted-foreground mb-4">
            Sahi diet, sahi natija — designed for women, by nutritionists.
          </p>
          <p className="text-foreground/75 mb-8 leading-relaxed">
            A 7-day, fully-portioned keto plan crafted around desi flavors. Lose fat without losing
            taste. No hidden costs, no gimmicks — just real food, real results.
          </p>

          <ul className="grid sm:grid-cols-2 gap-3 mb-10">
            {["Halal & desi-friendly", "Weekly grocery list", "Sehri & iftar variations", "Vegetarian options"].map(
              (b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle2 className="w-4 h-4 text-neon" /> {b}
                </li>
              )
            )}
          </ul>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="neon" size="xl">
                Get Your Free Diet Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-neon/30">
              <DialogHeader>
                <DialogTitle className="font-display text-3xl">Claim your free plan</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <div>
                  <Label htmlFor="kname">Name</Label>
                  <Input id="kname" required maxLength={80} className="bg-input border-border focus-visible:ring-neon" />
                </div>
                <div>
                  <Label htmlFor="kphone">WhatsApp Number</Label>
                  <Input id="kphone" required type="tel" placeholder="+92 3XX XXXXXXX" maxLength={20} className="bg-input border-border focus-visible:ring-neon" />
                </div>
                <div>
                  <Label htmlFor="kgoal">Your Goal</Label>
                  <Input id="kgoal" placeholder="e.g. lose 8kg in 3 months" maxLength={120} className="bg-input border-border focus-visible:ring-neon" />
                </div>
                <Button type="submit" variant="neon" className="w-full" size="lg">
                  Send My Plan
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="reveal">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-2xl tracking-wide">Sample Week</h3>
              <span className="text-xs uppercase tracking-widest text-neon">7-day preview</span>
            </div>
            <div className="space-y-2">
              {days.map((d, i) => (
                <div
                  key={d.day}
                  className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg bg-background/50 border border-border hover:border-neon/40 hover:bg-neon/5 transition-all"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <span className="font-display text-lg w-12 text-neon">{d.day}</span>
                  <span className="flex-1 text-sm text-foreground/85">{d.meal}</span>
                  <CheckCircle2 className="w-4 h-4 text-neon/70" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
