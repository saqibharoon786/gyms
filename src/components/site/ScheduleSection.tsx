import groupSchedule from "@/assets/group-schedule.png";
import monthlySchedule from "@/assets/monthly-schedule.png";
import { Calendar, Clock } from "lucide-react";

export const ScheduleSection = () => {
  return (
    <section id="schedule" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-neon/5 blur-3xl pointer-events-none" />

      <div className="container relative">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon/30 bg-neon/5 text-neon text-xs uppercase tracking-[0.3em] mb-5">
            <Calendar className="w-3.5 h-3.5" />
            Class Timings
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl">
            TRAIN ON YOUR <span className="text-neon text-glow-soft">SCHEDULE</span>
          </h2>
          <p className="font-serif-elegant italic text-muted-foreground mt-3 text-base md:text-lg">
            Stronger Together — har din, har waqt
          </p>
        </div>

        {/* Group Schedule + Monthly Schedule */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Group Class Schedule */}
          <div className="reveal group relative rounded-2xl overflow-hidden glass-card hover-lift">
            <div className="relative aspect-[3/4] overflow-hidden bg-background">
              <img
                src={groupSchedule}
                alt="The Runners group class schedule with morning and evening sessions"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/70 backdrop-blur border border-neon/30 text-[10px] uppercase tracking-[0.25em] text-neon">
                <Clock className="w-3 h-3" /> Daily
              </div>
            </div>
            <div className="p-5 md:p-6 border-t border-neon/10">
              <h3 className="font-display text-2xl md:text-3xl tracking-wide">
                GROUP CLASS <span className="text-neon">SCHEDULE</span>
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5">
                Morning & evening batches — pick the slot that fits your routine.
              </p>
            </div>
          </div>

          {/* Monthly Gym Schedule */}
          <div className="reveal group relative rounded-2xl overflow-hidden glass-card hover-lift">
            <div className="relative aspect-[3/4] overflow-hidden bg-background">
              <img
                src={monthlySchedule}
                alt="The Runners monthly gym class schedule by week and weekday"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/70 backdrop-blur border border-neon/30 text-[10px] uppercase tracking-[0.25em] text-neon">
                <Calendar className="w-3 h-3" /> Monthly
              </div>
            </div>
            <div className="p-5 md:p-6 border-t border-neon/10">
              <h3 className="font-display text-2xl md:text-3xl tracking-wide">
                MONTHLY <span className="text-neon">GYM PLAN</span>
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5">
                4-week structured plan — Zumba, HIIT, Yoga, Strength & more.
              </p>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-12 text-center reveal">
          <p className="font-display tracking-[0.4em] text-sm md:text-base text-foreground/80">
            STRONG BODY. <span className="text-neon">STRONG MIND.</span> STRONGER YOU.
          </p>
        </div>
      </div>
    </section>
  );
};
