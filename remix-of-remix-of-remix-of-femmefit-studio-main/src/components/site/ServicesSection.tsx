import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { services } from "@/data/services";

export const ServicesSection = () => {
  return (
    <section id="services" className="relative py-16 sm:py-24 md:py-32">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <p className="text-neon text-xs uppercase tracking-[0.3em] mb-4">— What we offer</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl mb-5 leading-none">
            Services that <span className="text-gradient-neon">empower</span>
          </h2>
          <p className="text-muted-foreground">
            Everything a modern woman needs to feel her strongest, calmest, most radiant self.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className={cn(
                "reveal group relative glass-card rounded-2xl p-8 hover-lift block",
                "transition-all duration-500"
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {s.free && (
                <span className="absolute top-4 right-4 text-[10px] font-bold tracking-wider px-3 py-1 rounded-full gradient-neon text-primary-foreground neon-glow-sm">
                  100% FREE
                </span>
              )}

              <div className="relative w-14 h-14 rounded-xl border border-neon/30 grid place-items-center mb-6 group-hover:bg-neon/10 transition-colors">
                <div className="absolute inset-0 rounded-xl gradient-neon opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <s.icon className="relative w-6 h-6 text-neon group-hover:text-primary-foreground transition-colors" />
              </div>

              <h3 className="font-display text-2xl mb-3 tracking-wide">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.shortDesc}</p>

              <div className="mt-6 inline-flex items-center gap-1 text-neon text-xs uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                Learn more →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
