import { ArrowRight, Clock3 } from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow } from "../components/ui/Primitives";
import { img } from "../lib/data";

const POSTS = [
  { title: "5 signs it's time to call a professional electrician", excerpt: "Flickering lights to tripped breakers — here's when a DIY fix becomes a safety risk.", image: img.electrician1, read: "4 min read", tag: "Home Tips" },
  { title: "How WorkOwn verifies every single worker", excerpt: "A behind-the-scenes look at our ID checks, background screening and ongoing monitoring.", image: img.plumber2, read: "6 min read", tag: "Trust & Safety" },
  { title: "From side gigs to a six-figure business: Suresh's story", excerpt: "How one electrician in Gurugram grew a loyal client base using WorkOwn.", image: img.electrician2, read: "5 min read", tag: "Worker Stories" },
  { title: "The ultimate monthly home maintenance checklist", excerpt: "Keep your home running smoothly all year with this simple seasonal checklist.", image: img.cleaner1, read: "3 min read", tag: "Home Tips" },
];

export default function Blog() {
  return (
    <div>
      <Section tone="dim" className="pb-10 pt-14">
        <Container>
          <Eyebrow>WorkOwn Journal</Eyebrow>
          <h1 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] text-[var(--color-ink)]">Stories, tips and news from WorkOwn.</h1>
        </Container>
      </Section>
      <Section tone="canvas">
        <Container>
          <SectionHeading eyebrow="Latest" title="From the blog" />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {POSTS.map((p) => (
              <article key={p.title} className="group overflow-hidden rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)]">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold uppercase tracking-wide text-[var(--color-primary-600)]">{p.tag}</span>
                  <h2 className="mt-2 font-display text-lg font-semibold text-[var(--color-ink)]">{p.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{p.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-[var(--color-ink-faint)]"><Clock3 className="h-3.5 w-3.5" /> {p.read}</span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-[var(--color-primary-600)]">Read more <ArrowRight className="h-3.5 w-3.5" /></span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
