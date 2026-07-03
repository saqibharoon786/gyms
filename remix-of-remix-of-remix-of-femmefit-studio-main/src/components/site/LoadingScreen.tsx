import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

export const LoadingScreen = () => {
  const [hidden, setHidden] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHidden(true), 1400);
    const t2 = setTimeout(() => setDone(true), 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-700 ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full gradient-neon blur-2xl opacity-50 animate-neon-pulse" />
          <div className="relative w-24 h-24 rounded-2xl grid place-items-center neon-glow bg-background/40 p-2">
            <img src={logo} alt="The Runners logo" className="w-full h-full object-contain animate-pulse" />
          </div>
        </div>
        <div className="mt-6 font-display text-3xl tracking-[0.3em] text-glow">
          THE <span className="text-neon">RUNNERS</span>
        </div>
        <div className="mt-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Loading your power
        </div>
      </div>
    </div>
  );
};
