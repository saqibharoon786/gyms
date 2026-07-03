import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import hero1 from "@/assets/gym-real-1.jpg";
import hero2 from "@/assets/gym-real-3.jpg";
import hero3 from "@/assets/gym-real-5.jpg";
import hero4 from "@/assets/gym-real-7.jpg";

const slides = [
  { img: hero1, alt: "The Runners ladies gym — Soan Garden" },
  { img: hero2, alt: "Group training session at The Runners" },
  { img: hero3, alt: "Strength training floor" },
  { img: hero4, alt: "Members training together" },
];


export const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex items-center">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.img}
              alt={s.alt}
              className={`w-full h-full object-cover ${i === index ? "animate-ken-burns" : ""}`}
              {...(i === 0 ? {} : { loading: "lazy" as const })}
            />
          </div>
        ))}
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        <div className="absolute inset-0 grid-pattern opacity-40" />
      </div>

      <div className="container relative z-10 pt-28 pb-20">
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon/30 bg-neon/5 backdrop-blur-sm mb-8 animate-fade-in"
            style={{ animationDelay: "0.1s", opacity: 0 }}
          >
            <Sparkles className="w-3.5 h-3.5 text-neon" />
            <span className="text-xs uppercase tracking-[0.25em] text-neon font-medium">
              Pakistan's #1 Ladies-Only Gym
            </span>
          </div>

          <h1
            className="font-display text-[2.75rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.95] sm:leading-[0.85] mb-6 animate-fade-in-up break-words"
            style={{ animationDelay: "0.25s", opacity: 0 }}
          >
            Transform <br />
            Your Body.
            <br />
            <span className="text-gradient-neon text-glow">Own Your Power.</span>
          </h1>

          <p
            className="font-serif-elegant italic text-lg md:text-2xl text-muted-foreground max-w-xl mb-3 animate-fade-in-up"
            style={{ animationDelay: "0.5s", opacity: 0 }}
          >
            Pakistan's first premium ladies-only gym
          </p>
          <p
            className="text-sm md:text-base text-foreground/70 max-w-lg mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.65s", opacity: 0 }}
          >
            A safe, luxurious sanctuary built for women — by women. Train hard, feel powerful, glow different.
          </p>

          <div
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.8s", opacity: 0 }}
          >
            <Button variant="neon" size="xl" className="w-full sm:w-auto" asChild>
              <a href="#pricing">
                Gym Packages <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="neon-outline" size="xl" className="w-full sm:w-auto" asChild>
              <a href="#contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === index ? "w-12 bg-neon neon-glow-sm" : "w-6 bg-foreground/30"
            }`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground z-20">
        <span className="rotate-90 origin-center mt-6">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-neon to-transparent animate-pulse" />
      </div>
    </section>
  );
};
