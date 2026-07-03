import { useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { name: "Aisha R.", summary: "Lost 12 kg in 4 months", quote: "I joined The Runners weighing 78 kg with zero stamina. Coach Aqsa designed a strength + cardio plan around my PCOS. 4 months later — 12 kilos down, periods regular, energy through the roof." },
  { name: "Fatima S.", summary: "Postpartum strength regained", quote: "After my second baby my core was completely gone. The Runners' postpartum program rebuilt me — from barely holding a plank to deadlifting 60 kg in 6 months." },
  { name: "Hina K.", summary: "Home training member", quote: "Working 9-to-6, gym tha mushkil. Their home trainer aati hai roz subah 7 baje. 5 months mein 9 kilo weight loss aur waist 4 inches kam." },
  { name: "Maya I.", summary: "Free keto plan — 8 kg down", quote: "The free keto meal plan completely changed how I eat. Combined with their HIIT classes I lost 8 kilos in 10 weeks without ever feeling starved." },
  { name: "Zara A.", summary: "Toned & confident", quote: "The Runners is hands down the best ladies-only gym in Soan Garden. Hygienic, fully private, female trainers who actually understand a woman's body. 6 months and my whole body composition has changed." },
  { name: "Mehreen Q.", summary: "Fat loss + muscle gain", quote: "Lost 15 kg and gained visible muscle definition in 7 months. Coaches track every workout, every meal. Yeh sirf gym nahi, complete transformation system hai." },
  { name: "Sana T.", summary: "First-time gym goer", quote: "Beginner thi, machines se darti thi. Coaches ne har machine khud sikhayi, har set count kiya. Aaj 5 months baad main heavy squats kar rahi hoon — 20 kilo weight loss bonus." },
  { name: "Areeba M.", summary: "Strength program", quote: "Imported Matrix equipment, spotless studio, internationally certified female coaches. Bench press 30 kg, squat 50 kg — never thought a Pakistani gym for women would offer this level of strength training." },
];

export const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--neon)/0.08),transparent_70%)]" />
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <p className="text-neon text-xs uppercase tracking-[0.3em] mb-4">— Member Results</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-none mb-5">
            Real <span className="text-gradient-neon">transformations</span>
          </h2>
          <p className="text-muted-foreground mt-4">Weight loss, strength gains, postpartum recovery — every story is from a verified member of The Runners.</p>
        </div>

        <div className="relative reveal">
          <button
            aria-label="Previous testimonial"
            onClick={() => scrollBy(-1)}
            className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-background/80 backdrop-blur border border-neon/30 text-neon grid place-items-center hover:bg-neon hover:text-primary-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            aria-label="Next testimonial"
            onClick={() => scrollBy(1)}
            className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-background/80 backdrop-blur border border-neon/30 text-neon grid place-items-center hover:bg-neon hover:text-primary-foreground transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth px-2 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="snap-center shrink-0 w-[88%] sm:w-[60%] lg:w-[44%]"
              >
                <div className="glass-card rounded-2xl p-8 md:p-10 h-full flex flex-col justify-between border-neon/20 shadow-[0_0_60px_-10px_hsl(var(--neon)/0.25)]">
                  <div>
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-neon text-neon" />
                      ))}
                    </div>
                    <p className="font-serif-elegant italic text-lg md:text-xl leading-relaxed text-foreground/90">
                      "{t.quote}"
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full gradient-neon grid place-items-center font-display text-lg text-primary-foreground">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-display text-xl tracking-wide">{t.name}</div>
                      <div className="text-xs uppercase tracking-widest text-neon">{t.summary}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
