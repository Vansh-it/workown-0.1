import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "../../lib/types";
import { CategoryIcon } from "./CategoryIcon";
import { formatPrice } from "../../lib/data";
import { cn } from "../../utils/cn";

const toneMap = {
  primary: "bg-[var(--color-primary-50)] text-[var(--color-primary-600)] group-hover:bg-[var(--color-primary-500)]",
  coral: "bg-[var(--color-coral-50)] text-[var(--color-coral-600)] group-hover:bg-[var(--color-coral-500)]",
  navy: "bg-[color:rgba(38,70,83,0.1)] text-[var(--color-navy-500)] group-hover:bg-[var(--color-navy-500)]",
  amber: "bg-[color:rgba(242,163,15,0.14)] text-[var(--color-amber-600)] group-hover:bg-[var(--color-amber-500)]",
};

export function CategoryTile({ category }: { category: Category }) {
  return (
    <Link
      to={`/services/${category.slug}`}
      className="group relative flex flex-col gap-4 rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[var(--shadow-lift)] focus-ring"
    >
      <div className="flex items-start justify-between">
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300 group-hover:text-white", toneMap[category.color])}>
          <CategoryIcon name={category.icon} className="h-6 w-6" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-[var(--color-ink-faint)] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
      </div>
      <div>
        <h3 className="font-display text-base font-semibold text-[var(--color-ink)]">{category.name}</h3>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{category.tagline}</p>
      </div>
      <div className="mt-auto flex items-center justify-between text-xs text-[var(--color-ink-faint)]">
        <span>{category.workerCount.toLocaleString("en-IN")}+ workers</span>
        <span className="font-semibold text-[var(--color-ink)]">From {formatPrice(category.avgPrice)}</span>
      </div>
    </Link>
  );
}
