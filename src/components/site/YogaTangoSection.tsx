import yoga from "@/assets/yoga-class.jpg.asset.json";
import tango from "@/assets/tango-class.jpg.asset.json";

const classes = [
  { img: yoga.url, label: "Yoga Class — Every Thursday" },
  { img: tango.url, label: "Tango Class — Mother & Daughter" },
];

export const YogaTangoSection = () => {
  return (
    <section id="special-classes" className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-b from-transparent via-secondary/10 to-transparent">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12 reveal">
          <p className="text-neon text-xs uppercase tracking-[0.3em] mb-4">— Special Classes</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl mb-5 leading-none">
            Yoga & <span className="text-gradient-neon">Tango</span>
          </h2>
          <p className="text-muted-foreground">
            Mindful flows and joyful bonding sessions — beyond strength training.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {classes.map((c, i) => (
            <div
              key={c.label}
              className="reveal glass-card rounded-2xl overflow-hidden hover-lift border border-neon/20"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <img src={c.img} alt={c.label} loading="lazy" className="w-full h-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
