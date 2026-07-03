import { Instagram, Facebook, Youtube } from "lucide-react";
import logo from "@/assets/logo.png"; 
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { WHATSAPP_DISPLAY, waLink } from "@/lib/whatsapp";

export const Footer = () => {
  return (
    <footer className="relative pt-20 pb-8 border-t border-neon/10 bg-[hsl(120_30%_3%)]">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-xl bg-white border border-neon/30 p-1 flex items-center justify-center overflow-hidden">
                <img src={logo} alt="The Runners logo" className="w-full h-full object-contain" /> {/* ✅ removed .url */}
              </div>

              <div className="font-display text-2xl tracking-wider">
                THE <span className="text-neon">RUNNERS</span>
              </div>
            </a>
            <p className="font-serif-elegant italic text-muted-foreground max-w-md">
              Pakistan's first premium ladies-only gym. A space where womens rise.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.instagram.com/the_runners_fitness_studio?igsh=emE2bHE5cHd4N3Bw&utm_source=ig_contact_invite"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full grid place-items-center border border-border text-foreground/70 hover:border-neon hover:text-neon hover:bg-neon/5 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/aqsa.syed.fitness.trainer/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full grid place-items-center border border-border text-foreground/70 hover:border-neon hover:text-neon hover:bg-neon/5 transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full grid place-items-center text-white transition-transform hover:scale-110"
                style={{ backgroundColor: "#25D366" }}
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full grid place-items-center border border-border text-foreground/70 hover:border-neon hover:text-neon hover:bg-neon/5 transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["About", "Services", "Trainers", "Pricing", "Contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="text-muted-foreground hover:text-neon transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Platinum Plaza, Soan Garden</li>
              <li>{WHATSAPP_DISPLAY}</li>
              <li>hello@therunners.pk</li>
              <li>Mon–Sat · 6am–10pm</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-muted-foreground">
          <p>© 2025 The Runners. All Rights Reserved.</p>
          <p className="font-serif-elegant italic">Strength looks beautiful on you.</p>
        </div>
      </div>
    </footer>
  );
};