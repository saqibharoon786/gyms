import groupLineup from "@/assets/lineup-group.jpg.asset.json";
import personalLineup from "@/assets/lineup-personal.jpg.asset.json";

const items = [
  { img: groupLineup.url, label: "Group Training Lineup" },
  { img: personalLineup.url, label: "Personal Training Lineup" },
];

export const TrainersLineupSection = () => {
  return (
    <section id="lineup" className="relative py-16 sm:py-24 md:py-32">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12 reveal">
          <p className="text-neon text-xs uppercase tracking-[0.3em] mb-4">— Weekly Schedule</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl mb-5 leading-none">
            Trainers <span className="text-gradient-neon">Lineup</span>
          </h2>
          <p className="text-muted-foreground">
            Morning & evening slots for both Group and Personal training.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((it, i) => (
            <div
              key={it.label}
              className="reveal glass-card rounded-2xl overflow-hidden hover-lift border border-neon/20"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <img
                src={it.img}
                alt={it.label}
                loading="lazy"
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
