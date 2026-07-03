import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, GraduationCap, LayoutDashboard, LogIn, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/runners-logo.png.asset.json";
import { services } from "@/data/services";
import { useAuth } from "@/context/AuthContext";
import { AdmissionDialog } from "@/components/site/AdmissionDialog";

const links = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services", dropdown: true },
  { label: "Journey", href: "/journey", route: true },
  { label: "Trainers", href: "/#trainers" },
  { label: "Transformations", href: "/#transformations" },
  { label: "Pricing", href: "/#pricing" },
  
  { label: "Contact", href: "/#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === "/";
  const { user, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Resolve hash links: when on home use anchor, otherwise navigate home with hash
  const resolve = (href: string) => {
    if (!href.startsWith("/#")) return href;
    return onHome ? href.slice(1) : href; // "#home" vs "/#home"
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled || !onHome
          ? "bg-background/80 backdrop-blur-xl border-b border-neon/10 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-16 h-16 rounded-xl bg-white border border-neon/30 p-1 flex items-center justify-center shrink-0 neon-glow-sm overflow-hidden">
            <img src={logo.url} alt="The Runners logo" className="w-full h-full object-contain" />
          </div>

          <div className="leading-none">
            <div className="font-display text-2xl tracking-wider">
              THE <span className="text-neon text-glow-soft">RUNNERS</span>
            </div>
            <div className="font-serif-elegant italic text-[10px] text-muted-foreground -mt-0.5">
              studio
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) =>
            l.dropdown ? (
              <div key={l.href} className="relative group">
                <a
                  href={resolve(l.href)}
                  className="relative inline-flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-neon transition-colors"
                >
                  {l.label}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                </a>
                <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[300px] z-50">
                  <div className="glass-card rounded-2xl p-3">
                    {services.map((s) => {
                      const I = s.icon;
                      return (
                        <Link
                          key={s.slug}
                          to={`/services/${s.slug}`}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-neon/10 transition-colors group/item"
                        >
                          <div className="w-9 h-9 rounded-lg border border-neon/30 grid place-items-center flex-shrink-0 group-hover/item:bg-neon/15">
                            <I className="w-4 h-4 text-neon" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-foreground group-hover/item:text-neon transition-colors flex items-center gap-2">
                              {s.title}
                              {s.free && (
                                <span className="text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded gradient-neon text-primary-foreground">
                                  FREE
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-muted-foreground leading-snug line-clamp-2">
                              {s.shortDesc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : l.route ? (
              <Link
                key={l.href}
                to={l.href}
                className="relative text-sm font-medium text-foreground/80 hover:text-neon transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-neon after:transition-all hover:after:w-full"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={resolve(l.href)}
                className="relative text-sm font-medium text-foreground/80 hover:text-neon transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-neon after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button variant="neon-outline" size="sm" className="hidden sm:inline-flex" asChild>
                <Link to="/dashboard"><LayoutDashboard className="w-4 h-4" /> Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={signOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button variant="neon-outline" size="sm" className="hidden sm:inline-flex" asChild>
              <Link to="/signin"><LogIn className="w-4 h-4" /> Sign In</Link>
            </Button>
          )}
          <AdmissionDialog
            trigger={
              <Button variant="neon" size="sm" className="hidden sm:inline-flex">
                <GraduationCap className="w-4 h-4" /> Admission
              </Button>
            }
          />
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-500 bg-background/95 backdrop-blur-xl border-t border-neon/10",
          open ? "max-h-[80vh] overflow-y-auto" : "max-h-0"
        )}
      >
        <div className="container py-6 flex flex-col gap-1">
          {links.map((l) =>
            l.dropdown ? (
              <div key={l.href} className="flex flex-col">
                <button
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="flex items-center justify-between text-base font-medium text-foreground/90 hover:text-neon transition-colors py-3"
                >
                  <span>{l.label}</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      mobileServicesOpen && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 pl-2 border-l border-neon/20 ml-1",
                    mobileServicesOpen ? "max-h-[600px] mb-2" : "max-h-0"
                  )}
                >
                  {services.map((s) => {
                    const I = s.icon;
                    return (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        onClick={() => {
                          setOpen(false);
                          setMobileServicesOpen(false);
                        }}
                        className="flex items-center gap-3 py-2.5 pl-3 text-sm text-foreground/85 hover:text-neon"
                      >
                        <I className="w-4 h-4 text-neon flex-shrink-0" />
                        <span>{s.title}</span>
                        {s.free && (
                          <span className="text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded gradient-neon text-primary-foreground">
                            FREE
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : l.route ? (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-foreground/90 hover:text-neon transition-colors py-3 border-b border-border/40"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={resolve(l.href)}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-foreground/90 hover:text-neon transition-colors py-3 border-b border-border/40"
              >
                {l.label}
              </a>
            )
          )}
          {user ? (
            <Button variant="neon-outline" className="mt-4 w-full" asChild>
              <Link to="/dashboard" onClick={() => setOpen(false)}>
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
            </Button>
          ) : (
            <Button variant="neon-outline" className="mt-4 w-full" asChild>
              <Link to="/signin" onClick={() => setOpen(false)}>
                <LogIn className="w-4 h-4" /> Sign In
              </Link>
            </Button>
          )}
          <AdmissionDialog
            trigger={
              <Button variant="neon" className="mt-2 w-full">
                <GraduationCap className="w-4 h-4" /> Admission
              </Button>
            }
          />
        </div>
      </div>
    </header>
  );
};
