import { Instagram, Facebook, MessageCircle } from "lucide-react";
// Direct imports for all trainer images
import t1 from "@/assets/lady1.jpg";
import t2 from "@/assets/trainer-2.jpg";
import t3 from "@/assets/trainer-3.jpg";
import t4 from "@/assets/lady2.ipg.jpg";

const trainers = [
  { img: t1, name: "Ayesha Khan", spec: "Strength & Conditioning", exp: "8 yrs" },
  { img: t2, name: "Sana Malik", spec: "Yoga & Mobility", exp: "6 yrs" },
  { img: t3, name: "Hira Ahmed", spec: "HIIT & Fat Loss", exp: "5 yrs" },
  { img: t4, name: "Zoya Iqbal", spec: "Nutrition Coach", exp: "7 yrs" },
];

export const TrainersSection = () => {
  return (
    <section id="trainers" className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-b from-transparent via-secondary/10 to-transparent">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <p className="text-neon text-xs uppercase tracking-[0.3em] mb-4">— Meet the team</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl mb-5 leading-none">
            Our <span className="text-gradient-neon">female</span> trainers
          </h2>
          <p className="text-muted-foreground">
            Certified · Experienced · Home Visit Available
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((t, i) => (
            <div
              key={t.name}
              className="reveal group relative rounded-2xl overflow-hidden border border-neon/10 hover-lift bg-card"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  width={768}
                  height={1024}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-neon/20 backdrop-blur-md border border-neon/30 text-[10px] uppercase tracking-wider text-neon">
                  {t.exp}
                </div>

                {/* Hover socials */}
                <div className="absolute inset-x-0 bottom-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex gap-2 justify-center">
                    {[Instagram, Facebook, MessageCircle].map((Icon, idx) => (
                      <a
                        key={idx}
                        href="#"
                        aria-label="social"
                        className="w-9 h-9 rounded-full grid place-items-center bg-background/80 border border-neon/30 text-neon hover:bg-neon hover:text-primary-foreground transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 text-center">
                <h3 className="font-display text-2xl tracking-wide">{t.name}</h3>
                <p className="text-neon text-xs uppercase tracking-widest mt-1">{t.spec}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};