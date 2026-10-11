import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, LayoutGrid, List, Map as MapIcon, X, Search, ChevronDown } from "lucide-react";
import { Container, Section, Chip, Skeleton, EmptyState, Badge } from "../components/ui/Primitives";
import { Button } from "../components/ui/Button";
import { Sheet } from "../components/ui/Sheet";
import { WorkerCard } from "../components/cards/WorkerCard";
import { LiveMap } from "../components/cards/LiveMap";
import { CATEGORIES, WORKERS } from "../lib/data";
import { useToast } from "../lib/appState";
import type { Worker } from "../lib/types";

type SortKey = "recommended" | "rating" | "price-low" | "price-high" | "distance";

function FilterPanel({
  selectedCategories, toggleCategory, maxPrice, setMaxPrice, minRating, setMinRating, verifiedOnly, setVerifiedOnly,
}: {
  selectedCategories: string[];
  toggleCategory: (slug: string) => void;
  maxPrice: number;
  setMaxPrice: (v: number) => void;
  minRating: number;
  setMinRating: (v: number) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (v: boolean) => void;
}) {
  return (
    <div className="space-y-7">
      <div>
        <h3 className="font-display text-sm font-semibold text-[var(--color-ink)]">Category</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {CATEGORIES.slice(0, 10).map((c) => (
            <Chip key={c.id} active={selectedCategories.includes(c.slug)} onClick={() => toggleCategory(c.slug)}>{c.name}</Chip>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm font-semibold text-[var(--color-ink)]">Max price</h3>
          <span className="text-sm font-semibold text-[var(--color-primary-600)]">₹{maxPrice.toLocaleString("en-IN")}</span>
        </div>
        <input type="range" min={100} max={3000} step={50} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="mt-3 w-full accent-[var(--color-primary-500)]" />
        <p className="mt-1 text-xs text-[var(--color-ink-faint)]">Shown per hour / job / day as listed by each worker.</p>
      </div>
      <div>
        <h3 className="font-display text-sm font-semibold text-[var(--color-ink)]">Minimum rating</h3>
        <div className="mt-3 flex gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <Chip key={r} active={minRating === r} onClick={() => setMinRating(r)}>{r === 0 ? "Any" : `${r}+`}</Chip>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-display text-sm font-semibold text-[var(--color-ink)]">Availability & trust</h3>
        <label className="mt-3 flex items-center justify-between rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.1)] p-3.5">
          <span className="text-sm text-[var(--color-ink)]">Verified workers only</span>
          <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} className="h-5 w-5 accent-[var(--color-primary-500)]" />
        </label>
      </div>
    </div>
  );
}

export default function FindWorkers() {
  const [params] = useSearchParams();
  const { push } = useToast();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [view, setView] = useState<"grid" | "list" | "map">("grid");
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(id);
  }, []);

  function toggleCategory(slug: string) {
    setSelectedCategories((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }

  const filtered = useMemo(() => {
    let list = WORKERS.filter((w) => {
      if (query && !(`${w.name} ${w.categoryName}`.toLowerCase().includes(query.toLowerCase()))) return false;
      if (selectedCategories.length && !selectedCategories.includes(w.categorySlug)) return false;
      if (w.price.amount > maxPrice) return false;
      if (w.rating < minRating) return false;
      if (verifiedOnly && !w.verified) return false;
      return true;
    });
    const sorters: Record<SortKey, (a: Worker, b: Worker) => number> = {
      recommended: (a, b) => b.rating - a.rating,
      rating: (a, b) => b.rating - a.rating,
      "price-low": (a, b) => a.price.amount - b.price.amount,
      "price-high": (a, b) => b.price.amount - a.price.amount,
      distance: (a, b) => a.distanceKm - b.distanceKm,
    };
    return [...list].sort(sorters[sort]);
  }, [query, selectedCategories, maxPrice, minRating, verifiedOnly, sort]);

  const visible = filtered.slice(0, visibleCount);
  const activeFilterCount = selectedCategories.length + (minRating > 0 ? 1 : 0) + (verifiedOnly ? 1 : 0) + (maxPrice < 3000 ? 1 : 0);

  function handleCall(w: Worker) {
    push({ title: `Calling ${w.name}…`, description: "Your number stays private — calls route through WorkOwn.", variant: "info" });
  }
  function handleChat(w: Worker) {
    push({ title: `Opening chat with ${w.name}`, variant: "info" });
  }

  return (
    <div>
      <Section tone="dim" className="pb-8 pt-10">
        <Container>
          <h1 className="font-display text-2xl font-bold text-[var(--color-ink)] sm:text-3xl">Find Skilled Workers</h1>
          <p className="mt-2 text-[var(--color-ink-soft)]">Verified professionals near you, ready to help today.</p>
          <div className="mt-6 flex max-w-xl items-center gap-3 rounded-full border border-[color:rgba(21,32,30,0.1)] bg-[var(--color-surface)] px-5 py-3.5 shadow-[var(--shadow-card)] focus-within:border-[var(--color-primary-400)]">
            <Search className="h-4 w-4 text-[var(--color-ink-faint)]" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, skill or category" className="h-6 w-full bg-transparent text-sm outline-none placeholder:text-[var(--color-ink-faint)]" />
          </div>
        </Container>
      </Section>

      <Section tone="canvas" className="pt-8">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6">
                <h2 className="font-display text-base font-semibold text-[var(--color-ink)]">Filters</h2>
                <div className="mt-5">
                  <FilterPanel {...{ selectedCategories, toggleCategory, maxPrice, setMaxPrice, minRating, setMinRating, verifiedOnly, setVerifiedOnly }} />
                </div>
              </div>
            </aside>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button onClick={() => setFilterSheetOpen(true)} className="flex items-center gap-2 rounded-full border border-[color:rgba(21,32,30,0.12)] bg-[var(--color-surface)] px-4 py-2.5 text-sm font-semibold focus-ring lg:hidden">
                    <SlidersHorizontal className="h-4 w-4" /> Filters {activeFilterCount > 0 && <Badge tone="primary">{activeFilterCount}</Badge>}
                  </button>
                  <p className="text-sm text-[var(--color-ink-soft)]">
                    <span className="font-semibold text-[var(--color-ink)]">{filtered.length}</span> workers found
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value as SortKey)}
                      className="appearance-none rounded-full border border-[color:rgba(21,32,30,0.12)] bg-[var(--color-surface)] py-2.5 pl-4 pr-9 text-sm font-medium outline-none focus:border-[var(--color-primary-400)]"
                    >
                      <option value="recommended">Recommended</option>
                      <option value="rating">Top rated</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="distance">Nearest</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--color-ink-faint)]" />
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-[color:rgba(21,32,30,0.06)] p-1">
                    {[{ id: "grid", icon: LayoutGrid }, { id: "list", icon: List }, { id: "map", icon: MapIcon }].map((v) => (
                      <button key={v.id} onClick={() => setView(v.id as typeof view)} aria-label={`${v.id} view`} className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${view === v.id ? "bg-white shadow-sm text-[var(--color-ink)]" : "text-[var(--color-ink-faint)]"}`}>
                        <v.icon className="h-4 w-4" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {activeFilterCount > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {selectedCategories.map((slug) => (
                    <Chip key={slug} active onClick={() => toggleCategory(slug)}>
                      {CATEGORIES.find((c) => c.slug === slug)?.name} <X className="h-3 w-3" />
                    </Chip>
                  ))}
                  {verifiedOnly && <Chip active onClick={() => setVerifiedOnly(false)}>Verified only <X className="h-3 w-3" /></Chip>}
                  {minRating > 0 && <Chip active onClick={() => setMinRating(0)}>{minRating}+ rating <X className="h-3 w-3" /></Chip>}
                  <button onClick={() => { setSelectedCategories([]); setVerifiedOnly(false); setMinRating(0); setMaxPrice(3000); }} className="text-xs font-semibold text-[var(--color-coral-600)] hover:underline">
                    Clear all
                  </button>
                </div>
              )}

              <div className="mt-6">
                {loading ? (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="space-y-3 rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] p-4">
                        <Skeleton className="aspect-[4/3] w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : filtered.length === 0 ? (
                  <EmptyState
                    icon={<Search className="h-6 w-6" />}
                    title="No workers match your filters"
                    description="Try widening your price range, clearing a filter, or searching a different category."
                    action={<Button variant="secondary" onClick={() => { setSelectedCategories([]); setVerifiedOnly(false); setMinRating(0); setMaxPrice(3000); setQuery(""); }}>Reset filters</Button>}
                  />
                ) : view === "map" ? (
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1fr]">
                    <LiveMap className="h-[420px] lg:h-[560px]" eta={12} />
                    <div className="no-scrollbar flex max-h-[560px] flex-col gap-4 overflow-y-auto pr-1">
                      {visible.map((w) => (
                        <WorkerCard key={w.id} worker={w} variant="list" onCall={handleCall} onChat={handleChat} />
                      ))}
                    </div>
                  </div>
                ) : view === "list" ? (
                  <div className="flex flex-col gap-4">
                    {visible.map((w) => (
                      <WorkerCard key={w.id} worker={w} variant="list" onCall={handleCall} onChat={handleChat} />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {visible.map((w) => (
                      <WorkerCard key={w.id} worker={w} onCall={handleCall} onChat={handleChat} />
                    ))}
                  </div>
                )}

                {!loading && filtered.length > visible.length && (
                  <div className="mt-8 flex justify-center">
                    <Button variant="secondary" onClick={() => setVisibleCount((v) => v + 6)}>Load more workers</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Sheet open={filterSheetOpen} onClose={() => setFilterSheetOpen(false)} side="bottom-sheet" title="Filters">
        <div className="px-5 pb-6 pt-2">
          <FilterPanel {...{ selectedCategories, toggleCategory, maxPrice, setMaxPrice, minRating, setMinRating, verifiedOnly, setVerifiedOnly }} />
          <Button className="mt-6 w-full" size="lg" onClick={() => setFilterSheetOpen(false)}>Show {filtered.length} results</Button>
        </div>
      </Sheet>
    </div>
  );
}
