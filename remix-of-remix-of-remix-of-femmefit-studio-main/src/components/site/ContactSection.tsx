import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Instagram, Clock } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { WHATSAPP_DISPLAY, waLink } from "@/lib/whatsapp";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(80),
  phone: z.string().trim().min(7, "Phone required").max(20),
  email: z.string().trim().email("Invalid email").max(120),
  message: z.string().trim().min(1, "Message required").max(800),
});

export const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    const { name, phone, email, message } = parsed.data;
    const text = `Hi The Runners! 👋\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\n\n${message}`;
    window.open(waLink(text), "_blank");
    toast.success("Opening WhatsApp…", { description: "Tap send in WhatsApp to deliver your message." });
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--neon)/0.1),transparent_60%)]" />
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <p className="text-neon text-xs uppercase tracking-[0.3em] mb-4">— Contact</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-none mb-5">
            Let's <span className="text-gradient-neon">connect</span>
          </h2>
          <p className="text-muted-foreground">
            Fill the form and send it directly to our WhatsApp — we reply within an hour.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <form
            onSubmit={handleSubmit}
            className="reveal glass-card rounded-2xl p-8 md:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required maxLength={80} className="bg-input border-border focus-visible:ring-neon" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" required type="tel" placeholder="+92 3XX XXXXXXX" maxLength={20} className="bg-input border-border focus-visible:ring-neon" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" required type="email" maxLength={120} className="bg-input border-border focus-visible:ring-neon" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" rows={5} required maxLength={800} className="bg-input border-border focus-visible:ring-neon resize-none" />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full text-white hover:opacity-90"
              style={{ backgroundColor: "#25D366" }}
            >
              <WhatsAppIcon className="w-5 h-5" /> Send via WhatsApp
            </Button>
            <p className="text-[11px] text-muted-foreground text-center">
              Your message goes directly to {WHATSAPP_DISPLAY} on WhatsApp.
            </p>
          </form>

          <div className="reveal space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: MapPin, title: "Visit", text: "Main Commercial Road, NC11/1, Platinum Plaza, Soan Garden" },
                { icon: Phone, title: "Call", text: WHATSAPP_DISPLAY },
                { icon: Mail, title: "Email", text: "hello@therunners.pk" },
                { icon: Clock, title: "Hours", text: "Mon–Sat · 6am – 10pm" },
              ].map((c) => (
                <div key={c.title} className="glass-card rounded-xl p-5 hover-lift">
                  <c.icon className="w-5 h-5 text-neon mb-3" />
                  <div className="font-display text-lg tracking-wide">{c.title}</div>
                  <div className="text-sm text-muted-foreground">{c.text}</div>
                </div>
              ))}
            </div>

            <a
              href="https://maps.app.goo.gl/qSpneZxzz8NhahTn8"
              target="_blank"
              rel="noopener noreferrer"
              className="block glass-card rounded-2xl overflow-hidden border-neon/20 hover:border-neon/50 transition-colors"
              aria-label="Open The Runners location in Google Maps"
            >
              <iframe
                title="The Runners Location — Platinum Plaza, Soan Garden"
                src="https://www.google.com/maps?q=The+Runners+Ladies+Fitness+Studio+Platinum+Plaza+Soan+Garden+Islamabad&output=embed"
                className="w-full h-64 border-0 pointer-events-none"
                loading="lazy"
              />
              <div className="flex items-center justify-between px-4 py-2.5 text-xs text-neon border-t border-neon/20">
                <span className="inline-flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Platinum Plaza, Soan Garden</span>
                <span>Open in Google Maps →</span>
              </div>
            </a>


            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/the_runners_fitness_studio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full grid place-items-center border border-neon/30 text-neon hover:bg-neon hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full grid place-items-center text-white transition-transform hover:scale-110"
                style={{ backgroundColor: "#25D366" }}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
