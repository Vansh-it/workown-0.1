import { useState } from "react";
import { Search, CalendarCheck2, MapPinned, CreditCard, Star, Repeat, UserPlus, ShieldCheck, Wrench, Wallet, TrendingUp, ArrowRight, LocateFixed } from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow, IconCircle } from "../components/ui/Primitives";
import { Button } from "../components/ui/Button";
import { Tabs } from "../components/ui/Tabs";
import { Accordion } from "../components/ui/Accordion";
import { LiveMap } from "../components/cards/LiveMap";
import { FAQS } from "../lib/data";

const CUSTOMER_STEPS = [
  { icon: <Search className="h-5 w-5" />, title: "Search or browse", desc: "Find the right category or search for exactly what you need." },
  { icon: <Star className="h-5 w-5" />, title: "Compare workers", desc: "Check ratings, pricing, availability and reviews side by side." },
  { icon: <CalendarCheck2 className="h-5 w-5" />, title: "Book instantly or request", desc: "Pick a date, time and address — confirmed in moments." },
  { icon: <MapPinned className="h-5 w-5" />, title: "Track live", desc: "Follow your worker's ETA in real time from confirmation to arrival." },
  { icon: <CreditCard className="h-5 w-5" />, title: "Pay securely", desc: "Pay in-app via UPI, card, wallet or cash — always transparent." },
  { icon: <Repeat className="h-5 w-5" />, title: "Rate & rebook", desc: "Leave a review and set up recurring visits with your favourite workers." },
];

const WORKER_STEPS = [
  { icon: <UserPlus className="h-5 w-5" />, title: "Register", desc: "Create your profile with skills, rates and your service area." },
  { icon: <ShieldCheck className="h-5 w-5" />, title: "Get verified", desc: "Complete ID and background checks to unlock your verified badge." },
  { icon: <Wrench className="h-5 w-5" />, title: "Set your services", desc: "List what you offer and your availability." },
  { icon: <CalendarCheck2 className="h-5 w-5" />, title: "Accept bookings", desc: "Review requests and accept the jobs that fit your schedule." },
  { icon: <Wallet className="h-5 w-5" />, title: "Get paid", desc: "Receive secure payments directly to your bank account." },
  { icon: <TrendingUp className="h-5 w-5" />, title: "Grow your reputation", desc: "Earn reviews and unlock more bookings over time." },
];

export default function HowItWorks() {
  const [audience, setAudience] = useState<"customer" | "worker">("customer");
  const steps = audience === "customer" ? CUSTOMER_STEPS : WORKER_STEPS;

  return (
    <div>
      <Section tone="dim" className="pb-10 pt-14">
        <Container className="text-center">
          <Eyebrow>Simple, transparent, safe</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] text-[var(--color-ink)]">How WorkOwn Works</h1>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-ink-soft)]">Whether you're booking help or offering your skills, here's exactly what to expect — step by step.</p>
          <div className="mt-8 flex justify-center">
            <Tabs tabs={[{ id: "customer", label: "For Customers" }, { id: "worker", label: "For Workers" }]} active={audience} onChange={(id) => setAudience(id as "customer" | "worker")} />
          </div>
        </Container>
      </Section>

      <Section tone="canvas">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="relative rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6">
                <div className="flex items-center gap-3">
                  <IconCircle icon={s.icon} />
                  <span className="font-display text-2xl font-bold text-[var(--color-primary-100)]">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-[var(--color-ink)]">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-soft)]">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button to={audience === "customer" ? "/find-workers" : "/register-worker"} iconRight={<ArrowRight className="h-4 w-4" />}>
              {audience === "customer" ? "Find a worker now" : "Start your application"}
            </Button>
          </div>
        </Container>
      </Section>

      <Section tone="navy">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow className="border-white/20 bg-white/10 text-white">Live tracking</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight text-white">See your worker approach in real time</h2>
              <p className="mt-4 max-w-md text-white/70">From the moment a booking is confirmed, GPS tracking shows the live route and ETA — updated every few seconds for complete peace of mind.</p>
              <ul className="mt-6 space-y-3 text-sm text-white/80">
                <li className="flex items-center gap-2.5"><LocateFixed className="h-4 w-4 text-[var(--color-primary-300)]" /> Accurate to within 1–2 minutes, even in traffic</li>
                <li className="flex items-center gap-2.5"><ShieldCheck className="h-4 w-4 text-[var(--color-primary-300)]" /> Share your trip with family for extra safety</li>
                <li className="flex items-center gap-2.5"><Wrench className="h-4 w-4 text-[var(--color-primary-300)]" /> Status updates from confirmed to completed</li>
              </ul>
            </div>
            <LiveMap className="h-80 sm:h-96" eta={6} />
          </div>
        </Container>
      </Section>

      <Section tone="canvas" id="faq">
        <Container>
          <div className="mx-auto max-w-2xl">
            <SectionHeading eyebrow="Answers" title="Frequently Asked Questions" align="center" />
            <div className="mt-10">
              <Accordion items={FAQS.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
            </div>
            <div className="mt-8 flex flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-canvas-dim)] p-8 text-center">
              <p className="font-display text-lg font-semibold text-[var(--color-ink)]">Still have questions?</p>
              <p className="text-sm text-[var(--color-ink-soft)]">Our support team is here to help, 7 days a week.</p>
              <Button to="/support" variant="secondary">Contact Support</Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
