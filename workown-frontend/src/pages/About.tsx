import { Target, Heart, Users, Sparkles } from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow, Avatar, IconCircle } from "../components/ui/Primitives";
import { STATS, avatars, img } from "../lib/data";

const VALUES = [
  { icon: <Heart className="h-5 w-5" />, title: "Dignity first", desc: "Every worker is a skilled professional, never a commodity. We design for respect at every step." },
  { icon: <Target className="h-5 w-5" />, title: "Radical transparency", desc: "Clear pricing, honest ratings, and no hidden fees — for customers and workers alike." },
  { icon: <Users className="h-5 w-5" />, title: "Community-built", desc: "We build alongside the workers and households who use WorkOwn every day." },
  { icon: <Sparkles className="h-5 w-5" />, title: "Craft & quality", desc: "We obsess over details, from booking flows to on-the-ground service quality." },
];

const TEAM = [
  { name: "Ananya Kapoor", role: "Co-founder & CEO", avatar: avatars.woman1 },
  { name: "Rahul Bansal", role: "Co-founder & CTO", avatar: avatars.man2 },
  { name: "Imran Siddiqui", role: "Head of Worker Success", avatar: avatars.man4 },
  { name: "Divya Menon", role: "Head of Trust & Safety", avatar: avatars.woman2 },
];

export default function About() {
  return (
    <div>
      <Section tone="dim" className="pb-10 pt-14">
        <Container>
          <Eyebrow>Our story</Eyebrow>
          <h1 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] text-[var(--color-ink)]">
            Building India's most trusted home for skilled work.
          </h1>
          <p className="mt-4 max-w-xl text-[var(--color-ink-soft)]">
            WorkOwn started with a simple belief: skilled workers deserve dignity, fair pay and real opportunity — and the people who hire them deserve trust, transparency and speed. We're building the platform that delivers both.
          </p>
        </Container>
      </Section>

      <Section tone="canvas" className="pt-10">
        <Container>
          <div className="overflow-hidden rounded-[var(--radius-xl)]">
            <img src={img.carpenterHero} alt="A WorkOwn professional at work" className="h-64 w-full object-cover sm:h-96" />
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-2xl font-bold text-[var(--color-ink)] sm:text-3xl">{s.value}<span className="text-[var(--color-primary-500)]">{s.suffix}</span></p>
                <p className="mt-1 text-xs text-[var(--color-ink-soft)] sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-[11px] uppercase tracking-wide text-[var(--color-ink-faint)]">Figures shown are illustrative placeholders pending verified company data</p>
        </Container>
      </Section>

      <Section tone="dim">
        <Container>
          <SectionHeading eyebrow="What we stand for" title="Our values" align="center" />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6">
                <IconCircle icon={v.icon} />
                <h3 className="mt-4 font-display text-base font-semibold text-[var(--color-ink)]">{v.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-soft)]">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="canvas">
        <Container>
          <SectionHeading eyebrow="Leadership" title="Meet the team" align="center" />
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {TEAM.map((t) => (
              <div key={t.name} className="text-center">
                <Avatar src={t.avatar} name={t.name} size="xl" className="mx-auto" />
                <p className="mt-3 text-sm font-semibold text-[var(--color-ink)]">{t.name}</p>
                <p className="text-xs text-[var(--color-ink-soft)]">{t.role}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[11px] uppercase tracking-wide text-[var(--color-ink-faint)]">Team profiles are placeholders for design purposes</p>
        </Container>
      </Section>
    </div>
  );
}
