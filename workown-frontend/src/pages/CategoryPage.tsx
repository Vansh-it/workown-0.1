import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, Users, ShieldCheck, Star } from "lucide-react";
import { Container, Section, SectionHeading, Badge, Eyebrow } from "../components/ui/Primitives";
import { Button } from "../components/ui/Button";
import { Accordion } from "../components/ui/Accordion";
import { CategoryIcon } from "../components/cards/CategoryIcon";
import { WorkerCard } from "../components/cards/WorkerCard";
import { getCategory, formatPrice, WORKERS, FAQS } from "../lib/data";

export default function CategoryPage() {
  const { slug } = useParams();
  const category = getCategory(slug ?? "");
  if (!category) return <Navigate to="/browse-services" replace />;

  const workers = WORKERS.filter((w) => w.categorySlug === category.slug);
  const shownWorkers = workers.length ? workers : WORKERS.slice(0, 3);
  const faqs = FAQS.slice(0, 3);

  return (
    <div>
      <Section tone="dim" className="pb-0 pt-12">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>{category.workerCount.toLocaleString("en-IN")}+ verified pros</Eyebrow>
              <h1 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] text-[var(--color-ink)]">
                Trusted {category.name} services, booked in minutes.
              </h1>
              <p className="mt-4 max-w-md text-[var(--color-ink-soft)]">{category.tagline}. Transparent pricing starting from {formatPrice(category.avgPrice)}, verified professionals, and live tracking on every booking.</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button to="/find-workers" iconRight={<ArrowRight className="h-4 w-4" />}>Find {category.name} Workers</Button>
                <Button to="/how-it-works" variant="secondary">How booking works</Button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[var(--radius-xl)]">
              <img src={category.heroImage} alt={`A professional performing a ${category.name} service`} className="h-64 w-full object-cover sm:h-80" />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[var(--color-ink)] backdrop-blur">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--color-green-600)]" /> Verified & background-checked
              </div>
            </div>
          </div>
        </Container>
        <div className="h-12" />
      </Section>

      <Section tone="canvas">
        <Container>
          <SectionHeading eyebrow="What's included" title={`Popular ${category.name} services`} sub="Clear, upfront pricing for every job — no surprises at checkout." />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {category.subServices.map((s) => (
              <div key={s.id} className="flex flex-col justify-between rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-5">
                <div className="flex items-start justify-between gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-600)]">
                    <CategoryIcon name={category.icon} className="h-4 w-4" />
                  </span>
                  <Badge tone="primary">From {formatPrice(s.startingPrice)}</Badge>
                </div>
                <h3 className="mt-4 font-display text-sm font-semibold text-[var(--color-ink)]">{s.name}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-ink-soft)]">{s.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dim">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Near you" title={`Top rated ${category.name} professionals`} />
            <Button to="/find-workers" variant="secondary" iconRight={<ArrowRight className="h-4 w-4" />}>See all</Button>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shownWorkers.map((w) => (
              <WorkerCard key={w.id} worker={w} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="canvas">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6 text-center">
              <Users className="mx-auto h-6 w-6 text-[var(--color-primary-500)]" />
              <p className="mt-3 font-display text-2xl font-bold">{category.workerCount.toLocaleString("en-IN")}+</p>
              <p className="text-sm text-[var(--color-ink-soft)]">Verified professionals</p>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6 text-center">
              <Star className="mx-auto h-6 w-6 fill-[var(--color-amber-500)] text-[var(--color-amber-500)]" />
              <p className="mt-3 font-display text-2xl font-bold">4.8 / 5</p>
              <p className="text-sm text-[var(--color-ink-soft)]">Average category rating</p>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6 text-center">
              <ShieldCheck className="mx-auto h-6 w-6 text-[var(--color-green-600)]" />
              <p className="mt-3 font-display text-2xl font-bold">100%</p>
              <p className="text-sm text-[var(--color-ink-soft)]">Background checked</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="dim">
        <Container>
          <div className="mx-auto max-w-2xl">
            <SectionHeading eyebrow="Still curious?" title={`${category.name} FAQs`} align="center" />
            <div className="mt-8">
              <Accordion items={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="navy">
        <Container className="flex flex-col items-center gap-5 text-center">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Book a trusted {category.name.toLowerCase()} professional today</h2>
          <Button to="/find-workers" variant="primary" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>Find {category.name} Workers</Button>
          <Link to="/browse-services" className="text-sm text-white/60 hover:text-white">Browse all categories</Link>
        </Container>
      </Section>
    </div>
  );
}
