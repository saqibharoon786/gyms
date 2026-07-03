// Direct imports for transformation images
import t1 from "@/assets/before1.png";
import t2 from "@/assets/before2.png";
import t3 from "@/assets/before3.png";
import t6 from "@/assets/before4.png";

type Item = { img: string; name: string; weeks: number; quote: string };

const items: Item[] = [
  { img: t1, name: "Mariam, 28", weeks: 16, quote: "Lost 14kg & gained confidence I never knew I had." },
  { img: t2, name: "Sara, 34", weeks: 20, quote: "Postpartum to powerful — PERFECTLY changed my life." },
  { img: t3, name: "Aisha, 30", weeks: 36, quote: "From April 2023 to January 2024 — a whole new me." },
  { img: t6, name: "Hina, 32", weeks: 52, quote: "January 2023 to 2024 — from dumbbells to deadlifts." },
];

export const TransformationsSection = () => {
  return (
    <section id="transformations" className="relative py-16 sm:py-24 md:py-32">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <p className="text-neon text-xs uppercase tracking-[0.3em] mb-4">— Transformations</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-none mb-5">
            Real results. <span className="text-gradient-neon">Real women.</span>
          </h2>
          <p className="text-muted-foreground">Genuine before & after results from our members.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {items.map((it, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="rounded-2xl overflow-hidden border border-neon/15">
                <img src={it.img} alt={`${it.name} before and after transformation`} loading="lazy" className="w-full h-auto object-cover" />
              </div>
              <div className="mt-5 text-center">
                <h3 className="font-display text-2xl tracking-wide">{it.name}</h3>
                <p className="text-neon text-xs uppercase tracking-widest mb-2">{it.weeks} week journey</p>
                <p className="font-serif-elegant italic text-sm text-muted-foreground">"{it.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};