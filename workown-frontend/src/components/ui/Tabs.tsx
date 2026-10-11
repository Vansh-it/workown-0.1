import { cn } from "../../utils/cn";

export function Tabs({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex items-center gap-1 rounded-full bg-[color:rgba(21,32,30,0.06)] p-1", className)} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-ring whitespace-nowrap",
            active === tab.id ? "bg-[var(--color-surface)] text-[var(--color-ink)] shadow-sm" : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
