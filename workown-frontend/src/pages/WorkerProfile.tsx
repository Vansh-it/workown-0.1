import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Phone, MessageCircle, MapPin, ShieldCheck, BadgeCheck, Star, Clock3, ChevronRight, Languages } from "lucide-react";
import { Container, Avatar, Badge, Rating, Divider, IconCircle } from "../components/ui/Primitives";
import { Button } from "../components/ui/Button";
import { Tabs } from "../components/ui/Tabs";
import { WorkerCard } from "../components/cards/WorkerCard";
import { getWorker, formatPrice, WORKERS } from "../lib/data";
import { useToast } from "../lib/appState";

const sampleReviews = [
  { id: "r1", name: "Anjali Gupta", rating: 5, date: "2 weeks ago", text: "Extremely professional and on time. Fixed the issue in 20 minutes flat." },
  { id: "r2", name: "Rohit Malhotra", rating: 5, date: "1 month ago", text: "Highly recommend — fair pricing and great communication throughout." },
  { id: "r3", name: "Sana Sheikh", rating: 4, date: "2 months ago", text: "Good work overall, arrived slightly late but called ahead to let me know." },
];

export default function WorkerProfile() {
  const { id } = useParams();
  const worker = getWorker(id ?? "");
  const { push } = useToast();
  const [tab, setTab] = useState("services");

  if (!worker) return <Navigate to="/find-workers" replace />;

  const similar = WORKERS.filter((w) => w.categorySlug === worker.categorySlug && w.id !== worker.id).slice(0, 3);
  const ratingBreakdown = [
    { stars: 5, pct: 78 }, { stars: 4, pct: 14 }, { stars: 3, pct: 5 }, { stars: 2, pct: 2 }, { stars: 1, pct: 1 },
  ];

  return (
    <div className="pb-24 lg:pb-0">
      <div className="relative h-56 w-full overflow-hidden sm:h-72">
        <img src={worker.cover ?? worker.avatar} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-canvas)] via-black/10 to-black/20" />
      </div>

      <Container className="relative -mt-16 sm:-mt-20">
        <div className="rounded-[var(--radius-xl)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-lift)] sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-5">
              <Avatar src={worker.avatar} name={worker.name} size="xl" ring className="shadow-md" />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-bold text-[var(--color-ink)] sm:text-3xl">{worker.name}</h1>
                  {worker.verified && <Badge tone="verified"><BadgeCheck className="h-3.5 w-3.5" /> Verified</Badge>}
                </div>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--color-ink-soft)]">
                  <span>{worker.categoryName}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {worker.city} · {worker.distanceKm} km</span>
                  <Rating value={worker.rating} count={worker.reviewCount} size="md" />
                </p>
              </div>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <button onClick={() => push({ title: `Calling ${worker.name}…`, description: "Your number stays private.", variant: "info" })} className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:rgba(21,32,30,0.12)] text-[var(--color-ink-soft)] hover:border-[var(--color-primary-400)] hover:text-[var(--color-primary-600)] focus-ring">
                <Phone className="h-5 w-5" />
              </button>
              <button onClick={() => push({ title: `Opening chat with ${worker.name}` , variant: "info"})} className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:rgba(21,32,30,0.12)] text-[var(--color-ink-soft)] hover:border-[var(--color-primary-400)] hover:text-[var(--color-primary-600)] focus-ring">
                <MessageCircle className="h-5 w-5" />
              </button>
              <Button to={`/book/${worker.id}`} size="lg">Book — {formatPrice(worker.price)}</Button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <p className="leading-relaxed text-[var(--color-ink-soft)]">{worker.bio}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-[var(--color-canvas-dim)] px-4 py-2 text-sm text-[var(--color-ink)]">
                <Clock3 className="h-4 w-4 text-[var(--color-primary-500)]" /> {worker.experienceYears} yrs experience
              </div>
              <div className="flex items-center gap-2 rounded-full bg-[var(--color-canvas-dim)] px-4 py-2 text-sm text-[var(--color-ink)]">
                <ShieldCheck className="h-4 w-4 text-[var(--color-green-600)]" /> {worker.backgroundChecked ? "Background checked" : "Verification in progress"}
              </div>
              <div className="flex items-center gap-2 rounded-full bg-[var(--color-canvas-dim)] px-4 py-2 text-sm text-[var(--color-ink)]">
                <Languages className="h-4 w-4 text-[var(--color-primary-500)]" /> {worker.languages.join(", ")}
              </div>
            </div>

            <div className="mt-8">
              <Tabs tabs={[{ id: "services", label: "Services & Pricing" }, { id: "skills", label: "Skills" }, { id: "gallery", label: "Work Gallery" }, { id: "reviews", label: `Reviews (${worker.reviewCount})` }]} active={tab} onChange={setTab} />
            </div>

            {tab === "services" && (
              <div className="mt-6 divide-y divide-[color:rgba(21,32,30,0.08)] rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)]">
                {worker.services.map((s) => (
                  <div key={s.name} className="flex items-center justify-between p-4">
                    <p className="text-sm font-medium text-[var(--color-ink)]">{s.name}</p>
                    <p className="text-sm font-bold text-[var(--color-primary-600)]">{formatPrice(s.price)}</p>
                  </div>
                ))}
              </div>
            )}

            {tab === "skills" && (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {worker.skills.map((s) => (
                  <div key={s.name} className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-[var(--color-ink)]">{s.name}</p>
                      <span className="text-xs font-medium text-[var(--color-ink-faint)]">{s.years} yrs</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[color:rgba(21,32,30,0.08)]">
                      <div className="h-full rounded-full bg-[var(--color-primary-500)]" style={{ width: `${Math.min(100, s.years * 8)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "gallery" && (
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {worker.gallery.map((src, i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-[var(--radius-md)]">
                    <img src={src} alt={`${worker.name} work sample ${i + 1}`} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
                  </div>
                ))}
              </div>
            )}

            {tab === "reviews" && (
              <div className="mt-6">
                <div className="flex flex-col gap-6 rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6 sm:flex-row sm:items-center">
                  <div className="text-center sm:border-r sm:border-[color:rgba(21,32,30,0.08)] sm:pr-6">
                    <p className="font-display text-4xl font-bold text-[var(--color-ink)]">{worker.rating.toFixed(1)}</p>
                    <div className="mt-1 flex justify-center gap-0.5 text-[var(--color-amber-500)]">
                      {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.round(worker.rating) ? "fill-current" : "opacity-30"}`} />)}
                    </div>
                    <p className="mt-1 text-xs text-[var(--color-ink-faint)]">{worker.reviewCount} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {ratingBreakdown.map((r) => (
                      <div key={r.stars} className="flex items-center gap-2 text-xs text-[var(--color-ink-soft)]">
                        <span className="w-8">{r.stars}★</span>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[color:rgba(21,32,30,0.08)]">
                          <div className="h-full rounded-full bg-[var(--color-amber-500)]" style={{ width: `${r.pct}%` }} />
                        </div>
                        <span className="w-8 text-right">{r.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 space-y-5">
                  {sampleReviews.map((r) => (
                    <div key={r.id} className="border-b border-[color:rgba(21,32,30,0.08)] pb-5 last:border-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar name={r.name} size="sm" />
                          <div>
                            <p className="text-sm font-semibold text-[var(--color-ink)]">{r.name}</p>
                            <p className="text-xs text-[var(--color-ink-faint)]">{r.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5 text-[var(--color-amber-500)]">
                          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-current" : "opacity-30"}`} />)}
                        </div>
                      </div>
                      <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-ink-soft)]">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">Starting price</p>
              <p className="mt-1 font-display text-2xl font-bold text-[var(--color-ink)]">{formatPrice(worker.price)}</p>
              <Divider className="my-4" />
              <div className="space-y-2.5 text-sm text-[var(--color-ink-soft)]">
                <p className="flex items-center gap-2"><Clock3 className="h-4 w-4" /> {worker.responseTime}</p>
                <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> {worker.completedJobs.toLocaleString("en-IN")} jobs completed</p>
              </div>
              <Button to={`/book/${worker.id}`} className="mt-5 w-full" size="lg">Book now</Button>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6">
              <p className="font-display text-sm font-semibold text-[var(--color-ink)]">Service area</p>
              <div className="relative mt-3 h-36 overflow-hidden rounded-[var(--radius-md)] bg-[#E7EFEA]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <IconCircle icon={<MapPin className="h-5 w-5" />} />
                </div>
                <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-medium text-[var(--color-ink-soft)]">Within 10 km of {worker.city}</p>
              </div>
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">Similar professionals nearby</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {similar.map((w) => <WorkerCard key={w.id} worker={w} />)}
            </div>
          </div>
        )}
      </Container>

      {/* Sticky mobile booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)]/95 p-3 backdrop-blur-lg sm:hidden">
        <button onClick={() => push({ title: `Calling ${worker.name}…`, variant: "info" })} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[color:rgba(21,32,30,0.12)] text-[var(--color-ink-soft)]">
          <Phone className="h-5 w-5" />
        </button>
        <button onClick={() => push({ title: `Opening chat with ${worker.name}`, variant: "info" })} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[color:rgba(21,32,30,0.12)] text-[var(--color-ink-soft)]">
          <MessageCircle className="h-5 w-5" />
        </button>
        <Button to={`/book/${worker.id}`} className="flex-1" size="lg" iconRight={<ChevronRight className="h-4 w-4" />}>Book — {formatPrice(worker.price)}</Button>
      </div>
    </div>
  );
}
