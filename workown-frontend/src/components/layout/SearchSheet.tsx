import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, TrendingUp } from "lucide-react";
import { Sheet } from "../ui/Sheet";
import { CATEGORIES } from "../../lib/data";
import { CategoryIcon } from "../cards/CategoryIcon";

export function SearchSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = query
    ? CATEGORIES.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.subServices.some((s) => s.name.toLowerCase().includes(query.toLowerCase())))
    : CATEGORIES.slice(0, 6);

  function go(slug: string) {
    onClose();
    setQuery("");
    navigate(`/services/${slug}`);
  }

  function goFindWorkers() {
    onClose();
    navigate(`/find-workers${query ? `?q=${encodeURIComponent(query)}` : ""}`);
    setQuery("");
  }

  return (
    <Sheet open={open} onClose={onClose} side="center" className="max-w-xl">
      <div className="p-2">
        <div className="flex items-center gap-3 border-b border-[color:rgba(21,32,30,0.08)] px-4 py-4">
          <Search className="h-5 w-5 shrink-0 text-[var(--color-ink-faint)]" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && goFindWorkers()}
            placeholder="Search services, categories or workers…"
            className="h-6 w-full bg-transparent pr-8 text-base text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink-faint)]"
          />
          <kbd className="hidden rounded-md border border-[color:rgba(21,32,30,0.15)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--color-ink-faint)] sm:block">ESC</kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          <p className="flex items-center gap-1.5 px-3 pb-2 pt-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">
            <TrendingUp className="h-3.5 w-3.5" /> {query ? "Matching categories" : "Popular categories"}
          </p>
          {results.map((c) => (
            <button
              key={c.id}
              onClick={() => go(c.slug)}
              className="flex w-full items-center gap-3 rounded-[var(--radius-sm)] px-3 py-3 text-left text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-canvas-dim)] focus-ring"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-600)]">
                <CategoryIcon name={c.icon} className="h-4 w-4" />
              </span>
              {c.name}
              <span className="ml-auto text-xs font-normal text-[var(--color-ink-faint)]">{c.workerCount.toLocaleString("en-IN")}+ workers</span>
            </button>
          ))}
          {results.length === 0 && <p className="px-3 py-6 text-center text-sm text-[var(--color-ink-faint)]">No matches. Try “plumber” or “tutor”.</p>}
          <button
            onClick={goFindWorkers}
            className="mt-2 flex w-full items-center justify-center rounded-full bg-[var(--color-primary-500)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--color-primary-600)] focus-ring"
          >
            Search all workers {query && `for "${query}"`}
          </button>
        </div>
      </div>
    </Sheet>
  );
}
