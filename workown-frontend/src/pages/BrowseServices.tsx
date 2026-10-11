import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Users } from "lucide-react";
import { Container, Section, SectionHeading } from "../components/ui/Primitives";
import { CategoryIcon } from "../components/cards/CategoryIcon";
import { CATEGORIES, formatPrice } from "../lib/data";

export default function BrowseServices() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return CATEGORIES;
    const q = query.toLowerCase();
    return CATEGORIES.filter((c) => c.name.toLowerCase().includes(q) || c.subServices.some((s) => s.name.toLowerCase().includes(q)));
  }, [query]);

  return (
    <div>
      <Section tone="dim" className="pb-10 pt-14">
        <Container>
          <SectionHeading eyebrow="All services" title="Browse Service Categories" sub="13 categories, hundreds of sub-services — every one backed by verified professionals and transparent pricing." />
          <div className="mt-7 flex max-w-md items-center gap-3 rounded-full border border-[color:rgba(21,32,30,0.1)] bg-[var(--color-surface)] px-5 py-3.5 shadow-[var(--shadow-card)] focus-within:border-[var(--color-primary-400)]">
            <Search className="h-4 w-4 text-[var(--color-ink-faint)]" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for a service, e.g. “leak repair”" className="h-6 w-full bg-transparent text-sm outline-none placeholder:text-[var(--color-ink-faint)]" />
          </div>
        </Container>
      </Section>

      <Section tone="canvas" className="pt-12">
        <Container className="space-y-16">
          {filtered.map((cat) => (
            <div key={cat.id} id={cat.slug} className="scroll-mt-24">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-600)]">
                    <CategoryIcon name={cat.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">{cat.name}</h2>
                    <p className="flex items-center gap-1.5 text-sm text-[var(--color-ink-soft)]">
                      <Users className="h-3.5 w-3.5" /> {cat.workerCount.toLocaleString("en-IN")}+ workers · From {formatPrice(cat.avgPrice)}
                    </p>
                  </div>
                </div>
                <Link to={`/services/${cat.slug}`} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[color:rgba(21,32,30,0.12)] px-4 py-2.5 text-sm font-semibold text-[var(--color-ink)] hover:border-[var(--color-primary-400)] hover:text-[var(--color-primary-600)] focus-ring">
                  View category <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cat.subServices.map((s) => (
                  <Link
                    key={s.id}
                    to={`/services/${cat.slug}`}
                    className="group flex flex-col justify-between rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] focus-ring"
                  >
                    <div>
                      <h3 className="font-display text-sm font-semibold text-[var(--color-ink)]">{s.name}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-ink-soft)]">{s.description}</p>
                    </div>
                    <p className="mt-4 text-sm font-bold text-[var(--color-primary-600)]">From {formatPrice(s.startingPrice)}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="py-16 text-center text-[var(--color-ink-soft)]">No services match “{query}”. Try a different search term.</p>}
        </Container>
      </Section>
    </div>
  );
}
