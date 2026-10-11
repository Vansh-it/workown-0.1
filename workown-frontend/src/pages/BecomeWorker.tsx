import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wallet, Smartphone, ShieldCheck, Star, TrendingUp, GraduationCap, Quote, Wrench, Zap, Sparkles, BookOpen, Hammer,
} from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow, Avatar, IconCircle, Badge } from "../components/ui/Primitives";
import { Button } from "../components/ui/Button";
import { avatars, img } from "../lib/data";

const BENEFITS = [
  { icon: <Wallet className="h-5 w-5" />, title: "Earn on your terms", desc: "Set your own rates and work the hours that suit you — daily, weekly or full-time." },
  { icon: <Smartphone className="h-5 w-5" />, title: "Simple app", desc: "Accept jobs, chat with customers and get paid, all from one easy-to-use app." },
  { icon: <ShieldCheck className="h-5 w-5" />, title: "Secure payments", desc: "Money lands directly in your bank account within 24 hours of job completion." },
  { icon: <Star className="h-5 w-5" />, title: "Build your reputation", desc: "Collect verified reviews that help you win more bookings over time." },
  { icon: <TrendingUp className="h-5 w-5" />, title: "Grow your business", desc: "Add new services, raise your rates, and expand your service area as you grow." },
  { icon: <GraduationCap className="h-5 w-5" />, title: "Free skill development", desc: "Access training videos and certifications to learn new, higher-paying skills." },
];

const STEPS = [
  { title: "Sign up", desc: "Create your profile with your skills, experience and service area in minutes." },
  { title: "Get verified", desc: "Submit your ID for a quick background check so customers can trust you." },
  { title: "Set your rates", desc: "Choose your services, pricing and working hours." },
  { title: "Start earning", desc: "Accept your first booking and get paid securely." },
];

const DEMAND_SERVICES = [
  { icon: <Wrench className="h-5 w-5" />, name: "Plumbing", growth: "+32%" },
  { icon: <Zap className="h-5 w-5" />, name: "Electrical", growth: "+28%" },
  { icon: <Sparkles className="h-5 w-5" />, name: "Cleaning", growth: "+41%" },
  { icon: <BookOpen className="h-5 w-5" />, name: "Tutoring", growth: "+37%" },
  { icon: <Hammer className="h-5 w-5" />, name: "Carpentry", growth: "+22%" },
];

const HOURLY_RATES: Record<string, number> = { Plumbing: 349, Electrical: 399, Cleaning: 299, Tutoring: 499, Carpentry: 449 };

export default function BecomeWorker() {
  const [category, setCategory] = useState("Plumbing");
  const [hours, setHours] = useState(30);
  const estimate = HOURLY_RATES[category] * hours;

  return (
    <div>
      <Section tone="navy" className="pb-20 pt-14">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow className="border-white/20 bg-white/10 text-white">Join 50,000+ professionals</Eyebrow>
              <h1 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.05] text-white">
                Your skill is your business. Let's grow it.
              </h1>
              <p className="mt-4 max-w-md text-white/70">Join the WorkOwn community and turn your trade into a thriving, respected career — with steady bookings, fair pay and real support.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button to="/register-worker" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>Join the WorkOwn Community</Button>
                <Button to="#estimator" variant="ghost-light" size="lg">Estimate my earnings</Button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[var(--radius-xl)]">
              <img src={img.electrician1} alt="A confident WorkOwn electrician professional" className="h-72 w-full object-cover sm:h-96" />
              <div className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-[var(--radius-lg)] bg-white/95 p-4 backdrop-blur">
                <Avatar src={avatars.man2} name="Suresh Kumar" />
                <div>
                  <p className="text-sm font-bold text-[var(--color-ink)]">Suresh Kumar</p>
                  <p className="text-xs text-[var(--color-ink-soft)]">Earns ₹38,000+ / month · Gurugram</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="canvas" className="-mt-10">
        <Container>
          <SectionHeading eyebrow="Why join" title="Why Join WorkOwn?" align="center" sub="Everything you need to turn your skills into steady, respected income." />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6">
                <IconCircle icon={b.icon} />
                <h3 className="mt-4 font-display text-base font-semibold text-[var(--color-ink)]">{b.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-soft)]">{b.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dim">
        <Container>
          <SectionHeading eyebrow="4 simple steps" title="How to get started" align="center" />
          <div className="relative mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.title} className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary-500)] font-display text-lg font-bold text-white">{i + 1}</div>
                <h3 className="mt-4 font-display text-base font-semibold text-[var(--color-ink)]">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-soft)]">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button to="/register-worker" iconRight={<ArrowRight className="h-4 w-4" />}>Start your application</Button>
          </div>
        </Container>
      </Section>

      <Section tone="canvas" id="training">
        <Container>
          <SectionHeading eyebrow="Real stories" title="Worker Success Stories" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { name: "Mohammed Irfan", role: "Electrician, Hyderabad", quote: "WorkOwn tripled my monthly bookings within 3 months.", avatar: avatars.man2 },
              { name: "Kavita Devi", role: "Cleaner, Noida", quote: "I built a loyal client base of 40+ families through the app.", avatar: avatars.woman2 },
              { name: "Manoj Verma", role: "Carpenter, Delhi", quote: "Free training helped me offer modular kitchens too.", avatar: avatars.man3 },
            ].map((s) => (
              <div key={s.name} className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6">
                <Quote className="h-6 w-6 text-[var(--color-primary-200)]" />
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">&ldquo;{s.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <Avatar src={s.avatar} name={s.name} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-ink)]">{s.name}</p>
                    <p className="text-xs text-[var(--color-ink-faint)]">{s.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dim">
        <Container>
          <SectionHeading eyebrow="High demand" title="Services in High Demand" sub="Booking demand grew fastest in these categories over the last 90 days." />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {DEMAND_SERVICES.map((s) => (
              <div key={s.name} className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-5 text-center">
                <IconCircle icon={s.icon} className="mx-auto" />
                <p className="mt-3 text-sm font-semibold text-[var(--color-ink)]">{s.name}</p>
                <Badge tone="verified" className="mt-2">{s.growth} demand</Badge>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="canvas" id="estimator">
        <Container>
          <div className="mx-auto max-w-2xl rounded-[var(--radius-xl)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-8 sm:p-10">
            <SectionHeading eyebrow="Estimator" title="See what you could earn" align="center" />
            <div className="mt-8 space-y-7">
              <div>
                <p className="mb-2.5 text-sm font-medium text-[var(--color-ink)]">Your category</p>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(HOURLY_RATES).map((c) => (
                    <button key={c} onClick={() => setCategory(c)} className={`rounded-full border-2 px-4 py-2 text-sm font-semibold ${category === c ? "border-[var(--color-primary-500)] bg-[var(--color-primary-50)] text-[var(--color-primary-700)]" : "border-[color:rgba(21,32,30,0.1)] text-[var(--color-ink-soft)]"}`}>{c}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[var(--color-ink)]">Hours per week</p>
                  <span className="font-display text-base font-bold text-[var(--color-primary-600)]">{hours} hrs</span>
                </div>
                <input type="range" min={5} max={60} step={5} value={hours} onChange={(e) => setHours(Number(e.target.value))} className="mt-3 w-full accent-[var(--color-primary-500)]" />
              </div>
              <div className="rounded-[var(--radius-lg)] bg-[var(--color-primary-500)] p-6 text-center text-white">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Estimated monthly earnings</p>
                <p className="mt-2 font-display text-4xl font-bold">₹{(estimate * 4).toLocaleString("en-IN")}</p>
                <p className="mt-1 text-xs text-white/70">Based on average {category} rates in your area (placeholder estimate)</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="navy">
        <Container className="flex flex-col items-center gap-5 text-center">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Ready to put your skills to work?</h2>
          <Button to="/register-worker" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>Join the WorkOwn Community</Button>
          <Link to="/how-it-works" className="text-sm text-white/60 hover:text-white">Learn how WorkOwn works</Link>
        </Container>
      </Section>
    </div>
  );
}
