import { Button } from "@/components/ui/button";
import { Calendar, Home, Dumbbell, Clock, ShieldCheck, MapPin } from "lucide-react";

const steps = [
  { icon: Calendar, title: "Book", desc: "Pick a slot via WhatsApp or our form." },
  { icon: Home, title: "Trainer Visits", desc: "A certified female trainer arrives at your door." },
  { icon: Dumbbell, title: "Train at Home", desc: "Sweat in your safe space — equipment provided." },
];

const benefits = [
  { icon: ShieldCheck, t: "100% privacy & comfort" },
  { icon: Clock, t: "Flexible timings — you choose" },
  { icon: MapPin, t: "Service across major cities" },
  { icon: Home, t: "No commute, no excuses" },
];

export const HomeTrainingSection = () => {
  return (
    <section id="home-training" className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-b from-transparent via-secondary/10 to-transparent">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <p className="text-neon text-xs uppercase tracking-[0.3em] mb-4">— Home-Based Training</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-none mb-5">
            We come <span className="text-gradient-neon">to you</span>
          </h2>
          <p className="text-muted-foreground">
            Ghar baithay — your trainer, your time, your transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="reveal relative glass-card rounded-2xl p-8 text-center hover-lift"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full gradient-neon grid place-items-center font-display text-xl text-primary-foreground neon-glow-sm">
                {i + 1}
              </div>
              <s.icon className="w-10 h-10 text-neon mx-auto mb-5 mt-2" />
              <h3 className="font-display text-2xl mb-2 tracking-wide">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal grid md:grid-cols-2 gap-8 items-center glass-card rounded-2xl p-8 md:p-12">
          <div>
            <h3 className="font-display text-3xl md:text-4xl mb-4 leading-none">
              Why women love it
            </h3>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b.t} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-neon/10 border border-neon/20 grid place-items-center">
                    <b.icon className="w-4 h-4 text-neon" />
                  </div>
                  <span className="text-foreground/85">{b.t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center md:text-right">
            <p className="font-serif-elegant italic text-lg text-muted-foreground mb-5">
              Ready to start at home?
            </p>
            <Button variant="neon" size="xl" asChild>
              <a href="#contact">Book a Home Session</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
