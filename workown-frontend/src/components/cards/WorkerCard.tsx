import { Link } from "react-router-dom";
import { Phone, MessageCircle, MapPin, Clock3 } from "lucide-react";
import type { Worker } from "../../lib/types";
import { formatPrice } from "../../lib/data";
import { Avatar, Badge, Rating } from "../ui/Primitives";
import { Button } from "../ui/Button";
import { cn } from "../../utils/cn";

const availabilityLabel: Record<Worker["availability"], { text: string; tone: "verified" | "amber" | "neutral" }> = {
  "available-now": { text: "Available now", tone: "verified" },
  today: { text: "Available today", tone: "amber" },
  "this-week": { text: "Available this week", tone: "neutral" },
  busy: { text: "Currently busy", tone: "neutral" },
};

export function WorkerCard({
  worker,
  variant = "grid",
  onChat,
  onCall,
}: {
  worker: Worker;
  variant?: "grid" | "list" | "compact";
  onChat?: (w: Worker) => void;
  onCall?: (w: Worker) => void;
}) {
  const avail = availabilityLabel[worker.availability];

  if (variant === "compact") {
    return (
      <Link
        to={`/workers/${worker.id}`}
        className="group flex items-center gap-3 rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-3 transition-shadow hover:shadow-[var(--shadow-card)] focus-ring"
      >
        <Avatar src={worker.avatar} name={worker.name} size="md" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[var(--color-ink)]">{worker.name}</p>
          <p className="truncate text-xs text-[var(--color-ink-soft)]">{worker.categoryName} · {worker.city}</p>
        </div>
        <Rating value={worker.rating} />
      </Link>
    );
  }

  if (variant === "list") {
    return (
      <div className="group flex flex-col gap-4 rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-4 transition-shadow hover:shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:p-5">
        <Link to={`/workers/${worker.id}`} className="flex flex-1 items-center gap-4 min-w-0 focus-ring rounded-[var(--radius-md)]">
          <div className="relative shrink-0">
            <Avatar src={worker.avatar} name={worker.name} size="lg" />
            {worker.verified && (
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-green-500)] ring-2 ring-[var(--color-surface)]">
                <svg viewBox="0 0 24 24" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth={3}><path d="M5 13l4 4L19 7" /></svg>
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3 className="font-display text-base font-semibold text-[var(--color-ink)]">{worker.name}</h3>
              <Rating value={worker.rating} count={worker.reviewCount} />
            </div>
            <p className="mt-0.5 text-sm text-[var(--color-ink-soft)]">{worker.categoryName} · {worker.city} · {worker.distanceKm} km away</p>
            <p className="mt-1.5 line-clamp-1 text-sm text-[var(--color-ink-faint)]">{worker.bio}</p>
          </div>
        </Link>
        <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center sm:gap-2">
          <div className="text-right">
            <p className="font-display text-lg font-bold text-[var(--color-ink)]">{formatPrice(worker.price)}</p>
            <Badge tone={avail.tone} className="mt-1">{avail.text}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onCall?.(worker)} aria-label={`Call ${worker.name}`} className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:rgba(21,32,30,0.12)] text-[var(--color-ink-soft)] hover:border-[var(--color-primary-400)] hover:text-[var(--color-primary-600)] focus-ring">
              <Phone className="h-4 w-4" />
            </button>
            <button onClick={() => onChat?.(worker)} aria-label={`Chat with ${worker.name}`} className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:rgba(21,32,30,0.12)] text-[var(--color-ink-soft)] hover:border-[var(--color-primary-400)] hover:text-[var(--color-primary-600)] focus-ring">
              <MessageCircle className="h-4 w-4" />
            </button>
            <Button to={`/book/${worker.id}`} size="sm">Book</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <Link to={`/workers/${worker.id}`} className="relative block aspect-[4/3] overflow-hidden focus-ring">
        <img
          src={worker.cover || worker.avatar}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
        <div className="absolute left-3 top-3 flex items-center gap-1.5">
          {worker.verified && (
            <span className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[var(--color-green-600)] backdrop-blur">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3}><path d="M5 13l4 4L19 7" /></svg>
              Verified
            </span>
          )}
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[var(--color-ink)] backdrop-blur">
          {formatPrice(worker.price)}
        </div>
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar src={worker.avatar} name={worker.name} size="sm" ring />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">{worker.name}</p>
              <p className="truncate text-[11px] text-white/80">{worker.categoryName}</p>
            </div>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <Rating value={worker.rating} count={worker.reviewCount} />
          <span className={cn("inline-flex items-center gap-1 text-xs font-medium", avail.tone === "verified" ? "text-[var(--color-green-600)]" : avail.tone === "amber" ? "text-[var(--color-amber-600)]" : "text-[var(--color-ink-faint)]")}>
            <span className={cn("h-1.5 w-1.5 rounded-full", avail.tone === "verified" ? "bg-[var(--color-green-500)]" : avail.tone === "amber" ? "bg-[var(--color-amber-500)]" : "bg-[var(--color-ink-faint)]")} />
            {avail.text}
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{worker.bio}</p>

        <div className="flex flex-wrap gap-1.5">
          {worker.skills.slice(0, 2).map((s) => (
            <Badge key={s.name} tone="primary">{s.name}</Badge>
          ))}
          {worker.skills.length > 2 && <Badge tone="neutral">+{worker.skills.length - 2}</Badge>}
        </div>

        <div className="mt-auto flex items-center gap-1.5 text-xs text-[var(--color-ink-faint)]">
          <MapPin className="h-3.5 w-3.5" /> {worker.city} · {worker.distanceKm} km
          <span className="mx-1">·</span>
          <Clock3 className="h-3.5 w-3.5" /> {worker.responseTime}
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Button to={`/book/${worker.id}`} size="sm" className="flex-1">Book</Button>
          <button onClick={() => onCall?.(worker)} aria-label={`Call ${worker.name}`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:rgba(21,32,30,0.12)] text-[var(--color-ink-soft)] hover:border-[var(--color-primary-400)] hover:text-[var(--color-primary-600)] focus-ring">
            <Phone className="h-4 w-4" />
          </button>
          <button onClick={() => onChat?.(worker)} aria-label={`Chat with ${worker.name}`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:rgba(21,32,30,0.12)] text-[var(--color-ink-soft)] hover:border-[var(--color-primary-400)] hover:text-[var(--color-primary-600)] focus-ring">
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
