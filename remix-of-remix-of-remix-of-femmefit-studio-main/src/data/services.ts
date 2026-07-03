import { Dumbbell, Users, Home, Apple, Flame, Salad, Video, type LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  shortDesc: string;
  icon: LucideIcon;
  free?: boolean;
  tagline: string;
  intro: string;
  highlights: { title: string; desc: string }[];
  bullets: string[];
  cta: string;
};

export const services: Service[] = [
  {
    slug: "personal-training",
    title: "Personal Training",
    shortDesc: "1-on-1 coaching tailored to your goals — strength, weight loss, toning.",
    icon: Dumbbell,
    tagline: "Aap ki body, aap ka journey — sirf aap ke liye",
    intro:
      "Get a fully personalised training experience with a certified female coach. Every session, every rep, every plan — designed around your body, lifestyle, and goals.",
    highlights: [
      { title: "Custom Plan", desc: "Built around your body type, schedule and goals." },
      { title: "Certified Coach", desc: "Train with internationally certified female trainers." },
      { title: "Real Results", desc: "Track measurable progress every 2 weeks." },
    ],
    bullets: [
      "Strength, fat-loss & toning programs",
      "Posture & mobility correction",
      "Weekly progress check-ins",
      "Personalised nutrition guidance",
      "Flexible morning & evening slots",
    ],
    cta: "Book a Personal Trainer",
  },
  {
    slug: "group-classes",
    title: "Group Classes",
    shortDesc: "Yoga, Zumba, HIIT & dance — energy, music, sisterhood.",
    icon: Users,
    tagline: "Sath chalti hain — sath jeetti hain",
    intro:
      "Sweat together, laugh together, grow together. Our group classes blend high-energy music, expert choreography and a sisterhood that lifts every woman in the room.",
    highlights: [
      { title: "High Energy", desc: "Music-driven classes that don't feel like a workout." },
      { title: "All Levels", desc: "Beginner-friendly modifications for every move." },
      { title: "Community", desc: "Train alongside an inspiring circle of women." },
    ],
    bullets: [
      "Zumba & Bollywood dance fitness",
      "HIIT & fat-burn circuits",
      "Yoga & mindful stretching",
      "Pilates & core sculpt",
      "Multiple slots throughout the week",
    ],
    cta: "Join a Group Class",
  },
  {
    slug: "home-training",
    title: "Home-Based Training",
    shortDesc: "Our certified trainer comes to you. Train in your safe space.",
    icon: Home,
    tagline: "Aap ke ghar — aap ke comfort zone main",
    intro:
      "Prefer privacy? Our certified female trainer comes to your home with everything needed for a complete workout — no gym, no commute, no excuses.",
    highlights: [
      { title: "100% Private", desc: "Train safely inside your own space." },
      { title: "Equipment-Optional", desc: "Workouts adapted to whatever you have." },
      { title: "Flexible Timing", desc: "Choose slots that fit your routine." },
    ],
    bullets: [
      "Female trainer at your doorstep",
      "Strength, cardio & flexibility programs",
      "Pre & post-natal training available",
      "Custom diet support included",
      "Available across major city areas",
    ],
    cta: "Book Home Training",
  },
  {
    slug: "nutrition-consultation",
    title: "Nutrition Consultation",
    shortDesc: "Personalised diet plans by certified female nutritionists.",
    icon: Apple,
    tagline: "Khao smart — jiyo strong",
    intro:
      "Food is fuel — and yours should taste like home. Get desi-friendly, lifestyle-aware diet plans crafted by certified female nutritionists.",
    highlights: [
      { title: "Desi Friendly", desc: "Real meals you actually want to eat." },
      { title: "Goal Focused", desc: "Fat loss, muscle gain, PCOS, hormonal balance." },
      { title: "Ongoing Support", desc: "Weekly tweaks based on your progress." },
    ],
    bullets: [
      "Detailed lifestyle & body analysis",
      "Custom desi-style meal plans",
      "PCOS & thyroid-friendly options",
      "Grocery & prep guidance",
      "Weekly check-ins on WhatsApp",
    ],
    cta: "Get My Diet Plan",
  },
  {
    slug: "body-transformation",
    title: "Body Transformation",
    shortDesc: "12-week intensive programs designed for real, lasting results.",
    icon: Flame,
    tagline: "12 hafte. Ek nayi aap.",
    intro:
      "Our flagship 12-week transformation program combines training, nutrition, accountability and mindset coaching for the kind of change that actually lasts.",
    highlights: [
      { title: "12-Week Plan", desc: "Structured phases for real, visible change." },
      { title: "Daily Tracking", desc: "Workouts, meals, water, sleep — all logged." },
      { title: "Mindset Coaching", desc: "Build the habits that hold the results." },
    ],
    bullets: [
      "Personal coach + nutritionist",
      "Weekly body & strength tracking",
      "Before & after documentation",
      "Private WhatsApp support group",
      "Lifetime access to recipes & guides",
    ],
    cta: "Start My Transformation",
  },
  {
    slug: "online-classes",
    title: "Online Classes",
    shortDesc: "Live virtual training sessions — train from anywhere in Pakistan.",
    icon: Video,
    tagline: "Ghar baithay — full studio experience",
    intro:
      "Join live online sessions with our certified female coaches from the comfort of your home. Same energy, same form-correction, same results — over Zoom or WhatsApp video.",
    highlights: [
      { title: "Live & Interactive", desc: "Real-time coaching, not pre-recorded videos." },
      { title: "Small Batches", desc: "Max 8 women per class for proper attention." },
      { title: "Flexible Schedule", desc: "Morning, evening & weekend slots." },
    ],
    bullets: [
      "Live Zoom workout sessions",
      "Form correction in real-time",
      "Recorded replays for missed classes",
      "Diet & nutrition guidance included",
      "Available pan-Pakistan",
    ],
    cta: "Join Online Classes",
  },
  {
    slug: "free-keto-diet-plan",
    title: "Free Keto Diet Plan",
    shortDesc: "Weekly meal plans crafted to fuel your transformation.",
    icon: Salad,
    free: true,
    tagline: "Bilkul free — sirf aap ke liye",
    intro:
      "A complete 7-day keto meal plan, crafted by our nutrition team — yours absolutely free. Easy desi swaps, grocery list included.",
    highlights: [
      { title: "100% Free", desc: "No hidden fees, no subscription." },
      { title: "7-Day Plan", desc: "Breakfast, lunch, dinner & snacks covered." },
      { title: "Desi Swaps", desc: "Local ingredients, real flavors." },
    ],
    bullets: [
      "Full 7-day keto meal schedule",
      "Printable grocery list",
      "Desi-friendly recipe ideas",
      "Hydration & supplement guide",
      "Delivered instantly to WhatsApp",
    ],
    cta: "Get My Free Plan",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
