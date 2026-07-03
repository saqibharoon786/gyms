import { useEffect, useRef, useState } from "react";
import aboutImg from "@/assets/gym-real-8.jpg";
import g1 from "@/assets/gym-real-1.jpg";
import g2 from "@/assets/gym-real-2.jpg";
import g3 from "@/assets/gym-real-3.jpg";
import g4 from "@/assets/gym-real-4.jpg";
import g5 from "@/assets/gym-real-5.jpg";
import g6 from "@/assets/gym-real-6.jpg";
import g7 from "@/assets/gym-real-7.jpg";
import g8 from "@/assets/gym-real-8.jpg";
// Direct imports for the "inside" images (removed .asset.json)
import i11 from "@/assets/aqsa.png";
import i12 from "@/assets/inside-11.jpg";
import i13 from "@/assets/inside-12.jpg";
import i14 from "@/assets/inside-13.jpg";
import i15 from "@/assets/inside-14.jpg";
import i16 from "@/assets/inside-15.jpeg";
import i17 from "@/assets/inside-16.jpeg";
import i18 from "@/assets/inside-17.jpeg";
import i19 from "@/assets/inside-18.jpeg";
import i20 from "@/assets/inside-19.jpeg";
import { ShieldCheck, Heart, Sparkles, MapPin, Clock, Dumbbell, Music2, Wind, Users, ChevronLeft, ChevronRight } from "lucide-react";

const stats = [
  { value: 500, suffix: "+", label: "Active Members" },
  { value: 6, suffix: "Yrs", label: "Empowering Women" },
  { value: 10, suffix: "+", label: "Certified Trainers" },
  { value: 98, suffix: "%", label: "Satisfaction" },
];

// Updated gallery array – now uses the imported image variables directly (no .url)
const galleryImages = [
  { src: i15, cat: "Our Building" },
  { src: i12, cat: "Cardio Zone" },
  { src: i13, cat: "Dumbbell Rack" },
  { src: i19, cat: "Cardio Floor" },
  { src: i16, cat: "Free Weights" },
  { src: i17, cat: "Boxing Bag" },
  { src: i11, cat: "Foam Rollers" },
  { src: i18, cat: "Strength Machine" },
  { src: i14, cat: "Champion of the Month" },
  { src: i20, cat: "Our Members" },
  { src: g5, cat: "Studio" },
  { src: g1, cat: "Cardio" },
  { src: g6, cat: "Cardio" },
  { src: g8, cat: "Studio" },
  { src: g2, cat: "Mat Area" },
  { src: g3, cat: "Reception" },
  { src: g7, cat: "Strength" },
  { src: g4, cat: "Stretch" },
];

const Counter = ({ to, suffix }: { to: number; suffix: string }) => {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const dur = 1600;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref} className="font-display text-4xl sm:text-5xl md:text-6xl text-neon text-glow">
      {n}
      {suffix}
    </span>
  );
};

const GalleryCarousel = () => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative reveal">
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-neon text-xs uppercase tracking-[0.3em] mb-3">— Inside The Runners</p>
          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight">
            Real photos from our <span className="text-gradient-neon">studio</span>
          </h3>
        </div>
        <div className="hidden sm:flex gap-2">
          <button
            aria-label="Previous photo"
            onClick={() => scrollBy(-1)}
            className="w-11 h-11 rounded-full border border-neon/30 text-neon grid place-items-center hover:bg-neon hover:text-primary-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            aria-label="Next photo"
            onClick={() => scrollBy(1)}
            className="w-11 h-11 rounded-full border border-neon/30 text-neon grid place-items-center hover:bg-neon hover:text-primary-foreground transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative">
        <button
          aria-label="Previous photo"
          onClick={() => scrollBy(-1)}
          className="sm:hidden absolute left-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur border border-neon/30 text-neon grid place-items-center"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          aria-label="Next photo"
          onClick={() => scrollBy(1)}
          className="sm:hidden absolute right-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur border border-neon/30 text-neon grid place-items-center"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div
          ref={ref}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {galleryImages.map((g, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-[88%] sm:w-[55%] lg:w-[40%] relative rounded-2xl overflow-hidden border border-neon/15 group"
            >
              <img
                src={g.src}
                alt={`The Runners gym - ${g.cat}`}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-4 left-5 text-[10px] uppercase tracking-widest text-neon">
                {g.cat}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-3">
        Use the arrows to browse all photos one by one.
      </p>
    </div>
  );
};

export const AboutSection = () => {
  return (
    <section id="about" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="container grid lg:grid-cols-2 gap-14 items-center">
        <div className="reveal relative">
          <div className="absolute -inset-4 gradient-neon opacity-20 blur-2xl rounded-full" />
          <div className="relative rounded-2xl overflow-hidden border border-neon/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
            <img
              src={aboutImg}
              alt="Interior of The Runners premium ladies gym"
              loading="lazy"
              width={1280}
              height={1280}
              className="w-full h-[520px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 glass-card rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-neon grid place-items-center">
                <ShieldCheck className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-display text-lg leading-none">100% Ladies Only</div>
                <div className="text-xs text-muted-foreground">Safe. Private. Empowering.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal">
          <p className="text-neon text-xs uppercase tracking-[0.3em] mb-4">— About The Runners</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-6 leading-none">
            Built for women.<br />
            <span className="text-gradient-neon">By women.</span>
          </h2>
          <p className="font-serif-elegant italic text-xl text-muted-foreground mb-4">
            Where strength meets serenity.
          </p>
          <p className="text-foreground/75 mb-6 leading-relaxed">
            The Runners was born from a simple belief — every woman deserves a space where she
            feels safe, celebrated, and seen. We've created a luxurious sanctuary in the heart of
            Pakistan, designed exclusively for ladies who refuse to play small.
          </p>

          <ul className="space-y-3 mb-10">
            {[
              { icon: ShieldCheck, t: "Ladies-only — completely private environment" },
              { icon: Heart, t: "Female trainers who understand your journey" },
              { icon: Sparkles, t: "Premium equipment, spa-grade hygiene" },
            ].map(({ icon: Icon, t }) => (
              <li key={t} className="flex items-start gap-3">
                <Icon className="w-5 h-5 text-neon mt-0.5 shrink-0" />
                <span className="text-foreground/80">{t}</span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border">
            {stats.map((s) => (
              <div key={s.label}>
                <Counter to={s.value} suffix={s.suffix} />
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery carousel — all gym photos, browse one by one */}
      <div id="gallery" className="container mt-20 sm:mt-28">
        <GalleryCarousel />
      </div>

      {/* Detailed info about The Runners */}
      <div className="container mt-20 sm:mt-28 reveal">
        <div className="max-w-4xl mx-auto">
          <p className="text-neon text-xs uppercase tracking-[0.3em] mb-4 text-center">— Everything about The Runners</p>
          <h3 className="font-display text-3xl md:text-5xl mb-8 leading-tight text-center">
            Pakistan's <span className="text-gradient-neon">premium ladies-only</span> fitness studio.
          </h3>

          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>
              <span className="text-neon font-semibold">The Runners Fitness Studio</span> is an exclusive women-only gym, specially designed for Pakistani ladies. Whether you're a beginner or an advanced athlete, you can start your fitness journey in a safe, private, and judgment-free environment.
            </p>
            <p>
              Our studio is equipped with fully imported equipment — Matrix treadmills, ellipticals, recumbent bikes, leg press, sit-up benches, free weights and a dedicated mat area. A boxing bag, battle ropes and a stretching zone are also available. Comfortable lighting, a disco-mode music system and premium interior keep you motivated through every session.
            </p>
            <p>
              We don't just train you — we focus on complete transformation: <span className="text-neon">strength training, weight loss, cardio, yoga, zumba, keto diet planning, and 1-on-1 personal training.</span> Every member is guided by a certified female trainer.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            {[
              { icon: Dumbbell, title: "Imported Equipment", desc: "Matrix, Reebok & premium machines." },
              { icon: Users, title: "Female Trainers", desc: "Certified, experienced, supportive." },
              { icon: Music2, title: "Energetic Vibe", desc: "Music, lights & disco-mode workouts." },
              { icon: Wind, title: "AC & Hygienic", desc: "Spa-grade cleaning, fresh air daily." },
              { icon: Clock, title: "Flexible Timings", desc: "Morning & evening batches available." },
              { icon: MapPin, title: "Prime Location", desc: "Easy access, safe parking, ladies entry." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card rounded-xl p-4 flex items-start gap-3 hover-lift">
                <div className="w-10 h-10 rounded-lg border border-neon/30 grid place-items-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-neon" />
                </div>
                <div>
                  <div className="font-display text-base">{title}</div>
                  <div className="text-xs text-muted-foreground">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 glass-card rounded-2xl p-6 border-neon/30">
            <div className="text-xs uppercase tracking-widest text-neon mb-2">Our Promise</div>
            <p className="font-serif-elegant italic text-lg text-foreground/90">
              "We don't just make you fit — we teach you to believe in yourself. Every woman here is running her own race, and we run it with her."
            </p>
            <div className="text-xs text-muted-foreground mt-3">— Coach Aqsa Syed, Founder</div>
          </div>
        </div>
      </div>
    </section>
  );
};