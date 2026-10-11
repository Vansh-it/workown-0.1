import { Fingerprint, MapPin, Lock, FileCheck2, PhoneOff, Flag, LifeBuoy } from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow, IconCircle } from "../components/ui/Primitives";
import { Button } from "../components/ui/Button";

const PILLARS = [
  { icon: <Fingerprint className="h-5 w-5" />, title: "ID verification", desc: "Every worker submits government ID before their profile can go live." },
  { icon: <FileCheck2 className="h-5 w-5" />, title: "Background checks", desc: "We partner with a certified verification agency to screen every applicant." },
  { icon: <MapPin className="h-5 w-5" />, title: "Live location sharing", desc: "Both sides can see live location during an active booking for safety and accuracy." },
  { icon: <PhoneOff className="h-5 w-5" />, title: "Masked communication", desc: "Calls and chats never reveal your real phone number to the other party." },
  { icon: <Lock className="h-5 w-5" />, title: "Encrypted conversations", desc: "All in-app messages are encrypted in transit and saved securely to your account." },
  { icon: <Flag className="h-5 w-5" />, title: "Report & block", desc: "Flag any concerning behaviour instantly — our safety team responds within hours." },
];

export default function TrustSafety() {
  return (
    <div>
      <Section tone="navy" className="pb-16 pt-14">
        <Container>
          <Eyebrow className="border-white/20 bg-white/10 text-white">Trust & Safety</Eyebrow>
          <h1 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] text-white">
            Every worker verified. Every booking protected.
          </h1>
          <p className="mt-4 max-w-xl text-white/70">Trust is the foundation of WorkOwn. Here's exactly how we keep both customers and workers safe, every single day.</p>
        </Container>
      </Section>

      <Section tone="canvas" className="-mt-10">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.title} className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
                <IconCircle icon={p.icon} />
                <h3 className="mt-4 font-display text-base font-semibold text-[var(--color-ink)]">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-soft)]">{p.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dim">
        <Container>
          <SectionHeading eyebrow="Our verification process" title="How we verify every worker" />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "ID submission", desc: "Government-issued ID and address proof are collected and verified." },
              { step: "02", title: "Background screening", desc: "A certified agency screens for criminal history and prior complaints." },
              { step: "03", title: "Skill confirmation", desc: "We confirm claimed skills through references and a short interview." },
              { step: "04", title: "Ongoing monitoring", desc: "Ratings and reports are continuously monitored post-verification." },
            ].map((s) => (
              <div key={s.step} className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6">
                <span className="font-display text-3xl font-bold text-[var(--color-primary-100)]">{s.step}</span>
                <h3 className="mt-3 font-display text-sm font-semibold text-[var(--color-ink)]">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-soft)]">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="canvas">
        <Container className="flex flex-col items-center gap-5 rounded-[var(--radius-xl)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-canvas-dim)] p-10 text-center">
          <IconCircle icon={<LifeBuoy className="h-6 w-6" />} size="lg" />
          <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] sm:text-2xl">Spotted something concerning?</h2>
          <p className="max-w-md text-sm text-[var(--color-ink-soft)]">Report it to our Trust & Safety team and we'll investigate within 24 hours.</p>
          <Button to="/support#contact">Report a concern</Button>
        </Container>
      </Section>
    </div>
  );
}
