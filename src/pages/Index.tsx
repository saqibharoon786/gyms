import { useEffect } from "react";
import { Navbar } from "@/components/site/Navbar";
import { HeroSection } from "@/components/site/HeroSection";
import { AboutSection } from "@/components/site/AboutSection";
import { TrainersLineupSection } from "@/components/site/TrainersLineupSection";
import { ServicesSection } from "@/components/site/ServicesSection";
import { TrainersSection } from "@/components/site/TrainersSection";
import { TransformationsSection } from "@/components/site/TransformationsSection";
import { KetoSection } from "@/components/site/KetoSection";
import { HomeTrainingSection } from "@/components/site/HomeTrainingSection";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { PricingSection } from "@/components/site/PricingSection";
import { YogaTangoSection } from "@/components/site/YogaTangoSection";


import { ContactSection } from "@/components/site/ContactSection";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { LoadingScreen } from "@/components/site/LoadingScreen";
import { ScheduleSection } from "@/components/site/ScheduleSection";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const Index = () => {
  useScrollReveal();
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen">
      <LoadingScreen />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <TrainersLineupSection />
        <ServicesSection />
        <TrainersSection />
        <TransformationsSection />
        <KetoSection />
        <HomeTrainingSection />
        <ScheduleSection />
        <TestimonialsSection />
        <PricingSection />
        <YogaTangoSection />
        <ContactSection />

      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default Index;
