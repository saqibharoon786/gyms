import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getService, services } from "@/data/services";

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = slug ? getService(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (service) document.title = `${service.title} — The Runners`;
  }, [service]);

  if (!service) return <Navigate to="/" replace />;

  const Icon = service.icon;
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <article className="pt-28 sm:pt-32 pb-16 sm:pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div
          className="absolute -top-40 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "var(--gradient-radial-glow)" }}
        />
        <div className="container relative">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-neon transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to home
          </Link>

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon/30 bg-neon/5 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-neon" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-neon font-medium">
                  {service.free ? "100% Free" : "Premium Service"}
                </span>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] mb-5">
                {service.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-gradient-neon text-glow">
                  {service.title.split(" ").slice(-1)}
                </span>
              </h1>
              <p className="font-serif-elegant italic text-lg sm:text-xl text-muted-foreground max-w-2xl">
                {service.tagline}
              </p>
            </div>
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-neon/30 grid place-items-center neon-glow-sm">
              <div className="absolute inset-0 rounded-2xl gradient-neon opacity-20" />
              <Icon className="relative w-10 h-10 sm:w-12 sm:h-12 text-neon" />
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container mt-16 sm:mt-20 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          <p className="text-base sm:text-lg leading-relaxed text-foreground/85">
            {service.intro}
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {service.highlights.map((h) => (
              <div key={h.title} className="glass-card rounded-2xl p-5">
                <h3 className="font-display text-xl tracking-wide mb-2 text-neon">
                  {h.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-display text-3xl sm:text-4xl mb-6 tracking-wide">
              What's <span className="text-gradient-neon">Included</span>
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {service.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card/40"
                >
                  <span className="mt-0.5 w-6 h-6 rounded-full grid place-items-center bg-neon/15 border border-neon/40 flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-neon" />
                  </span>
                  <span className="text-sm sm:text-base text-foreground/85">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA card */}
        <aside className="lg:sticky lg:top-28 self-start">
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-neon mb-3">Ready to start?</p>
            <h3 className="font-display text-3xl mb-3 leading-none">
              {service.cta}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Talk to our team and get started in minutes — no commitment required.
            </p>
            <div className="flex flex-col gap-3">
              <Button variant="neon" size="lg" className="w-full" asChild>
                <Link to="/#contact">
                  {service.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="neon-outline" size="lg" className="w-full" asChild>
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </aside>
      </section>

      {/* Other services */}
      <section className="container mt-20 sm:mt-28">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-8 tracking-wide">
          Explore other <span className="text-gradient-neon">services</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {others.map((s) => {
            const I = s.icon;
            return (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="group glass-card rounded-2xl p-6 hover-lift block"
              >
                <div className="w-12 h-12 rounded-xl border border-neon/30 grid place-items-center mb-4 group-hover:bg-neon/10 transition-colors">
                  <I className="w-5 h-5 text-neon" />
                </div>
                <h3 className="font-display text-xl tracking-wide mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.shortDesc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-neon text-xs uppercase tracking-widest">
                  Learn more →
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </article>
  );
};

export default ServiceDetail;
