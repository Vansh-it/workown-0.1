import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

export function Accordion({ items }: { items: { id: string; question: string; answer: ReactNode }[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  return (
    <div className="divide-y divide-[color:rgba(21,32,30,0.08)] rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)]">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpen(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus-ring"
            >
              <span className="font-display text-[15px] font-semibold text-[var(--color-ink)] sm:text-base">{item.question}</span>
              <ChevronDown className={cn("h-5 w-5 shrink-0 text-[var(--color-ink-faint)] transition-transform duration-300", isOpen && "rotate-180 text-[var(--color-primary-500)]")} />
            </button>
            <div
              className={cn("grid overflow-hidden transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)]", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
            >
              <div className="overflow-hidden px-5 pb-5 text-sm leading-relaxed text-[var(--color-ink-soft)]">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
