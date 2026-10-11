import { Briefcase, MapPin, ArrowRight } from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow, Badge } from "../components/ui/Primitives";
import { Button } from "../components/ui/Button";

const ROLES = [
  { title: "Senior Product Designer", team: "Design", location: "Remote · India", type: "Full-time" },
  { title: "Backend Engineer, Trust & Safety", team: "Engineering", location: "Bengaluru", type: "Full-time" },
  { title: "City Operations Manager", team: "Operations", location: "Delhi NCR", type: "Full-time" },
  { title: "Worker Success Associate", team: "Worker Success", location: "Hyderabad", type: "Full-time" },
];

export default function Careers() {
  return (
    <div>
      <Section tone="dim" className="pb-10 pt-14">
        <Container>
          <Eyebrow>We're hiring</Eyebrow>
          <h1 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] text-[var(--color-ink)]">Help us build the future of skilled work.</h1>
          <p className="mt-4 max-w-xl text-[var(--color-ink-soft)]">We're a small, fast-moving team obsessed with dignity, craft and trust. Come build something that matters to millions of households and workers.</p>
        </Container>
      </Section>
      <Section tone="canvas">
        <Container>
          <SectionHeading eyebrow="Open roles" title="Current openings" />
          <div className="mt-8 divide-y divide-[color:rgba(21,32,30,0.08)] rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)]">
            {ROLES.map((r) => (
              <div key={r.title} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-base font-semibold text-[var(--color-ink)]">{r.title}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-ink-soft)]">
                    <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {r.team}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {r.location}</span>
                    <Badge tone="neutral">{r.type}</Badge>
                  </p>
                </div>
                <Button variant="secondary" size="sm" iconRight={<ArrowRight className="h-4 w-4" />}>Apply</Button>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[var(--color-ink-faint)]">Roles listed are placeholders — connect a real ATS before launch.</p>
        </Container>
      </Section>
    </div>
  );
}
