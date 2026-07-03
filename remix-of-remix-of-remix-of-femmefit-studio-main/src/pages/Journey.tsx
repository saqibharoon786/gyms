import { useEffect, useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Award, Flame, Heart, Sparkles, Target, Users, X, MapPin, Calendar, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const milestones = [
  { year: "2019", title: "The Spark", desc: "Coach Aqsa ne ek choti si studio se shuruat ki — sirf 8 women ke saath, ek mission ke saath: women ko unka strongest version banana." },
  { year: "2020", title: "Community Grows", desc: "Pandemic ke dauran online sessions launch huey. 200+ women ne apne ghar se hi transformation start ki." },
  { year: "2022", title: "First Studio Opens", desc: "The Runners Fitness Studio ka pehla women-only space khula — fully equipped, safe, and judgment-free." },
  { year: "2024", title: "1000+ Transformations", desc: "Hum ne 1000+ women ki transformation journey complete ki — strength, weight-loss, confidence — sab kuch." },
  { year: "2026", title: "A Movement", desc: "Aaj The Runners sirf gym nahi — ek movement hai. Where every woman runs her own race." },
];

const values = [
  { icon: Heart, title: "Sisterhood", desc: "We rise by lifting each other. No competition, only community." },
  { icon: Target, title: "Real Results", desc: "Trackable, measurable transformations — not promises." },
  { icon: Users, title: "Women-Only", desc: "A safe, private space designed exclusively for women." },
  { icon: Flame, title: "Energy", desc: "Music, motion, and motivation in every session." },
  { icon: Award, title: "Certified Coaches", desc: "Internationally trained female trainers and nutritionists." },
  { icon: Sparkles, title: "Whole-Self Wellness", desc: "Body, mind, and confidence — we train all three." },
];

type Story = {
  name: string;
  city: string;
  age: number;
  duration: string;
  loss: string;
  goal: string;
  tagline: string;
  story: string;
  initial: string;
  color: string;
};

const stories: Story[] = [
  {
    name: "Ayesha Khan",
    city: "Islamabad",
    age: 28,
    duration: "8 mahine",
    loss: "18 kg",
    goal: "Weight Loss & Stamina",
    tagline: "Pehli baar apne aap ko mirror me dekh kar muskurai.",
    story:
      "Shadi ke baad mera weight 82kg ho gaya tha. Confidence bilkul khatam. Maine The Runners join kiya kyunki yeh ladies-only tha — mera comfort zone wahi tha. Coach Aqsa ne meri diet plan ki, cardio routine set kiya aur har hafte mera progress check kiya. 8 mahine me 18 kilo kam huey. Aaj main apne kapron me fit hoon, aur apne bachon ke saath bina thake khelti hoon. The Runners ne mujhe meri kho hui zindagi wapas di.",
    initial: "AK",
    color: "from-pink-500/20 to-rose-500/10",
  },
  {
    name: "Hira Sheikh",
    city: "Rawalpindi",
    age: 34,
    duration: "1 saal",
    loss: "22 kg + Strong Core",
    goal: "Postpartum Recovery",
    tagline: "Maa banne ke baad bhi apni body wapas pa sakti hoon.",
    story:
      "Doosre baby ke baad meri body bilkul change ho gayi thi. Back pain, weakness, aur stretch marks. Doctor ne kaha exercise zaroori hai lekin mujhe kahin safe jagah nahi mil rahi thi. The Runners aayi to mujhe pata chala ki yeh sirf gym nahi — yeh family hai. Coach ne postpartum-safe routine banayi, core strengthening karwai, aur slowly weights start karwaye. Aaj 22 kilo kam aur apni shaadi wali dress me wapas fit hoon.",
    initial: "HS",
    color: "from-emerald-500/20 to-green-500/10",
  },
  {
    name: "Fatima Iqbal",
    city: "Islamabad",
    age: 22,
    duration: "6 mahine",
    loss: "12 kg",
    goal: "PCOS Management",
    tagline: "PCOS ko apni zindagi par hawi nahi hone diya.",
    story:
      "PCOS diagnose hua to weight bohot tezi se barhne laga. Hormonal imbalance, mood swings, aur period irregularity. Doctor ne strength training aur clean diet recommend ki. The Runners me Coach Aqsa ne mere liye specifically PCOS-friendly plan banaya — heavy weights, low-impact cardio, keto diet. 6 mahine me 12 kilo kam huey, periods regular ho gaye, aur energy levels best hain. PCOS girls — yeh possible hai!",
    initial: "FI",
    color: "from-violet-500/20 to-purple-500/10",
  },
  {
    name: "Sana Riaz",
    city: "Islamabad",
    age: 41,
    duration: "10 mahine",
    loss: "Diabetes Reversed",
    goal: "Health & Strength",
    tagline: "41 ki umar me apni zindagi ki sab se strong version hoon.",
    story:
      "Pre-diabetic thi, blood pressure high, aur har waqt thakawat. Beti ne zabardasti The Runners join karwaya. Pehle din tu lagta tha main yeh nahi kar sakti. Lekin coaches itni supportive hain ke har step pe motivate karti rahi. Aaj 10 mahine baad — sugar normal, BP normal, aur main 30 minute treadmill par chalti hoon bina ruke. Mere bachon ko mujh par fakhr hai.",
    initial: "SR",
    color: "from-amber-500/20 to-orange-500/10",
  },
  {
    name: "Zainab Malik",
    city: "Rawalpindi",
    age: 19,
    duration: "4 mahine",
    loss: "Confidence Gained",
    goal: "Body Toning",
    tagline: "University ki shy larki se confident athlete tak.",
    story:
      "Main bohot patli thi lekin body bilkul out of shape. Friends ke saath beach jane se darti thi. Mama ne The Runners suggest kiya. Yahan aakar pata chala ki fitness sirf weight loss nahi — toning, posture, confidence — sab kuch hai. Coach ne strength training start karwai, protein-rich diet di. 4 mahine me body completely toned, posture better, aur confidence sky-high. Ab main shorts pehen kar gym aati hoon!",
    initial: "ZM",
    color: "from-cyan-500/20 to-blue-500/10",
  },
  {
    name: "Maryam Ahmed",
    city: "Islamabad",
    age: 36,
    duration: "1.5 saal",
    loss: "30 kg",
    goal: "Major Weight Loss",
    tagline: "30 kilo kam — lekin asli journey andar ki thi.",
    story:
      "Meri shadi ke 12 saal baad weight 95kg ho gaya tha. Husband bohot supportive thay lekin main khud apne aap se naraz thi. The Runners join kiya tu pehle 3 mahine bohot mushkil thay — body adjust nahi ho rahi thi. Lekin coach Aqsa ne kabhi haar nahi mani. Slowly weight gira, stamina barhi, aur aaj 1.5 saal me 30 kilo kam. Lekin asli transformation andar ki hai — main ab apne aap se mohabbat karti hoon.",
    initial: "MA",
    color: "from-rose-500/20 to-pink-500/10",
  },
  {
    name: "Nimra Tariq",
    city: "Rawalpindi",
    age: 26,
    duration: "7 mahine",
    loss: "15 kg + Marathon Ready",
    goal: "Endurance Training",
    tagline: "Pakistan ki marathon me participate kiya — apne dum par.",
    story:
      "Bachpan se overweight thi. Sports me hissa lene se sharmati thi. The Runners aayi tu kabhi socha bhi nahi tha ke ek din marathon run karungi. Coach ne running plan banaya, gradually distance barhayi. 7 mahine me 15 kilo kam aur Islamabad Half-Marathon complete ki — 21km! Medal hath me leke royi. Yeh sab The Runners ki wajah se possible hua.",
    initial: "NT",
    color: "from-lime-500/20 to-green-500/10",
  },
  {
    name: "Sadia Hussain",
    city: "Rawalpindi",
    age: 45,
    duration: "1 saal",
    loss: "Joint Pain Gone",
    goal: "Mobility & Strength",
    tagline: "45 me bhi 25 wali energy.",
    story:
      "Knee pain aur back pain ki wajah se seedhi nahi chadh sakti thi. Sab ne kaha umar ho gayi, aaram karo. Lekin main ne The Runners try kiya. Coach ne low-impact strength training start karwai, mobility work karwai, aur diet clean ki. Aaj 1 saal baad — pain bilkul nahi, 4 manzil seedhiyan chad jati hoon, aur grandkids ke saath bhagti hoon. Umar sirf number hai!",
    initial: "SH",
    color: "from-teal-500/20 to-emerald-500/10",
  },
];

const Journey = () => {
  const [active, setActive] = useState<Story | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-neon/5 via-transparent to-transparent pointer-events-none" />
          <div className="container relative">
            <div className="max-w-3xl">
              <div className="text-xs text-neon tracking-[0.3em] uppercase">Our Story</div>
              <h1 className="font-display text-4xl md:text-6xl mt-3 leading-tight">
                THE <span className="text-neon text-glow-soft">JOURNEY</span><br />
                of every woman who runs.
              </h1>
              <p className="text-muted-foreground mt-5 text-base md:text-lg max-w-2xl">
                Yeh sirf ek gym ki kahani nahi — yeh un hazaron Pakistani women ki kahani hai jinhone apni race khud chuni, khud lari, aur khud jeeti.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 border-t border-neon/10">
          <div className="container grid md:grid-cols-2 gap-10 items-start">
            <div>
              <div className="text-xs text-neon tracking-widest uppercase">Our Mission</div>
              <h2 className="font-display text-3xl md:text-4xl mt-2">Strong body. <br/>Strong mind. <span className="text-neon">Stronger you.</span></h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              The Runners ek aisi jagah hai jahan har woman apni body ko respect karna seekhti hai, apni strength discover karti hai, aur apni journey khud likhti hai. Hum yahan sirf workouts nahi sikhate — hum confidence build karte hain, sisterhood banate hain, aur har member ko uski potential tak pohchate hain.
            </p>
          </div>
        </section>

        {/* Member Journeys (clickable cards) */}
        <section className="py-16 border-t border-neon/10">
          <div className="container">
            <div className="text-center mb-12">
              <div className="text-xs text-neon tracking-widest uppercase">Real Members. Real Stories.</div>
              <h2 className="font-display text-3xl md:text-5xl mt-2">Meet our <span className="text-neon">Runners</span></h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">Click kisi bhi card par — uski poori journey padhne ke liye.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {stories.map((s) => (
                <button
                  key={s.name}
                  onClick={() => setActive(s)}
                  className={`group text-left glass-card rounded-2xl p-5 hover-lift relative overflow-hidden bg-gradient-to-br ${s.color} border-neon/15`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full grid place-items-center bg-neon/15 border border-neon/40 font-display text-lg text-neon">
                      {s.initial}
                    </div>
                    <div className="min-w-0">
                      <div className="font-display text-lg leading-tight truncate">{s.name}</div>
                      <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {s.city} · {s.age} yrs
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-neon uppercase tracking-wider mb-2">{s.goal}</div>
                  <p className="font-serif-elegant italic text-sm text-foreground/85 leading-snug mb-4">
                    "{s.tagline}"
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-neon/10 pt-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {s.duration}</span>
                    <span className="flex items-center gap-1 text-neon"><TrendingDown className="w-3 h-3" /> {s.loss}</span>
                  </div>
                  <div className="absolute top-3 right-3 text-[10px] text-neon opacity-0 group-hover:opacity-100 transition">Read →</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 border-t border-neon/10">
          <div className="container">
            <div className="text-center mb-14">
              <div className="text-xs text-neon tracking-widest uppercase">Milestones</div>
              <h2 className="font-display text-3xl md:text-4xl mt-2">Where we've been</h2>
            </div>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-neon/20" />
              <div className="space-y-10">
                {milestones.map((m, i) => (
                  <div key={m.year} className={`relative md:grid md:grid-cols-2 md:gap-10 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}>
                    <div className={`pl-10 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-10" : "md:pl-10"}`}>
                      <div className="font-display text-3xl text-neon">{m.year}</div>
                      <h3 className="font-display text-xl mt-1">{m.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{m.desc}</p>
                    </div>
                    <div className="hidden md:block" />
                    <div className="absolute left-3 md:left-1/2 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-neon neon-glow-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 border-t border-neon/10">
          <div className="container">
            <div className="text-center mb-12">
              <div className="text-xs text-neon tracking-widest uppercase">What we stand for</div>
              <h2 className="font-display text-3xl md:text-4xl mt-2">Our Values</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {values.map((v) => {
                const I = v.icon;
                return (
                  <div key={v.title} className="glass-card rounded-2xl p-6 hover-lift">
                    <div className="w-11 h-11 rounded-lg border border-neon/30 grid place-items-center mb-4">
                      <I className="w-5 h-5 text-neon" />
                    </div>
                    <h3 className="font-display text-lg">{v.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-neon/10">
          <div className="container text-center max-w-2xl">
            <h2 className="font-display text-3xl md:text-5xl">Ready to start <span className="text-neon">your journey?</span></h2>
            <p className="text-muted-foreground mt-4">Join hundreds of Pakistani women who chose to run their own race — at their own pace.</p>
            <div className="flex flex-wrap gap-3 justify-center mt-7">
              <Button variant="neon" size="lg" asChild><Link to="/signin">Member Login</Link></Button>
              <Button variant="neon-outline" size="lg" asChild><a href="/#contact">Join Now</a></Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />

      {/* Story dialog */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-2xl bg-background border-neon/30 max-h-[90vh] overflow-y-auto">
          {active && (
            <div>
              <div className="flex items-start gap-4 mb-5 pr-8">
                <div className={`w-16 h-16 rounded-full grid place-items-center bg-gradient-to-br ${active.color} border border-neon/40 font-display text-xl text-neon shrink-0`}>
                  {active.initial}
                </div>
                <div>
                  <div className="font-display text-2xl">{active.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                    <MapPin className="w-3 h-3" /> {active.city} · {active.age} years
                  </div>
                  <div className="text-xs text-neon uppercase tracking-wider mt-2">{active.goal}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="glass-card rounded-lg p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Duration</div>
                  <div className="font-display text-base text-neon mt-1">{active.duration}</div>
                </div>
                <div className="glass-card rounded-lg p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Result</div>
                  <div className="font-display text-base text-neon mt-1">{active.loss}</div>
                </div>
              </div>

              <p className="font-serif-elegant italic text-lg text-neon mb-4">"{active.tagline}"</p>
              <p className="text-foreground/85 leading-relaxed text-sm whitespace-pre-line">{active.story}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Journey;
