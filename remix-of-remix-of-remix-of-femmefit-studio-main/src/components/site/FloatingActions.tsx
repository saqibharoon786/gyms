import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { waLink } from "@/lib/whatsapp";

export const FloatingActions = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href={waLink("Hi The Runners! I'd like to know more about your gym.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp us"
        className="fixed z-50 bottom-6 right-6 w-14 h-14 rounded-full grid place-items-center hover:scale-110 transition-transform shadow-[0_8px_30px_rgba(37,211,102,0.5)]"
        style={{ backgroundColor: "#25D366" }}
      >
        <WhatsAppIcon className="w-7 h-7 text-white" />
      </a>

      <button
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed z-40 bottom-24 right-6 w-11 h-11 rounded-full bg-card border border-neon/30 text-neon grid place-items-center transition-all duration-500 hover:bg-neon hover:text-primary-foreground",
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  );
};
