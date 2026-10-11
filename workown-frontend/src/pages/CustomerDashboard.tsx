import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Heart, CreditCard, Bell, LifeBuoy, ArrowRight, Repeat, Star } from "lucide-react";
import { Container, Section, Avatar, Badge, EmptyState } from "../components/ui/Primitives";
import { Button } from "../components/ui/Button";
import { Tabs } from "../components/ui/Tabs";
import { BOOKINGS, WORKERS, formatPrice } from "../lib/data";
import { useAuth } from "../lib/appState";

const statusTone: Record<string, "primary" | "amber" | "verified" | "neutral"> = {
  requested: "neutral", confirmed: "primary", "on-the-way": "amber", arrived: "amber", "in-progress": "amber", completed: "verified", cancelled: "neutral",
};

export default function CustomerDashboard() {
  const { name } = useAuth();
  const [tab, setTab] = useState("upcoming");
  const upcoming = BOOKINGS.filter((b) => !["completed", "cancelled"].includes(b.status));
  const past = BOOKINGS.filter((b) => ["completed", "cancelled"].includes(b.status));
  const saved = WORKERS.slice(0, 3);

  return (
    <Section tone="canvas" className="py-8 sm:py-10">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-display text-2xl font-bold text-[var(--color-ink)] sm:text-3xl">Welcome back, {name.split(" ")[0]}</h1>
            <p className="mt-1 text-sm text-[var(--color-ink-soft)]">Here's what's happening with your bookings.</p>
          </div>
          <Button to="/find-workers" iconRight={<ArrowRight className="h-4 w-4" />}>Book a new service</Button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Upcoming", value: upcoming.length, icon: Calendar },
            { label: "Completed jobs", value: 18, icon: Star },
            { label: "Saved workers", value: saved.length, icon: Heart },
            { label: "Service credits", value: "₹150", icon: CreditCard },
          ].map((s) => (
            <div key={s.label} className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-5">
              <s.icon className="h-5 w-5 text-[var(--color-primary-500)]" />
              <p className="mt-3 font-display text-2xl font-bold text-[var(--color-ink)]">{s.value}</p>
              <p className="text-xs text-[var(--color-ink-soft)]">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <Tabs tabs={[{ id: "upcoming", label: "Upcoming" }, { id: "past", label: "Past Bookings" }]} active={tab} onChange={setTab} />
            <div className="mt-5 space-y-4">
              {(tab === "upcoming" ? upcoming : past).map((b) => (
                <div key={b.id} className="flex flex-col gap-4 rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-5 sm:flex-row sm:items-center">
                  <Avatar src={b.workerAvatar} name={b.workerName} size="lg" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-display text-sm font-semibold text-[var(--color-ink)]">{b.service}</p>
                      <Badge tone={statusTone[b.status]}>{b.status.replace("-", " ")}</Badge>
                      {b.recurrence && b.recurrence !== "none" && <Badge tone="neutral"><Repeat className="h-3 w-3" /> {b.recurrence}</Badge>}
                    </div>
                    <p className="mt-1 text-xs text-[var(--color-ink-soft)]">{b.workerName} · {b.date}, {b.time}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-[var(--color-ink-faint)]"><MapPin className="h-3 w-3" /> {b.address}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <p className="font-display text-sm font-bold text-[var(--color-ink)]">{formatPrice(b.price)}</p>
                    {tab === "upcoming" ? (
                      <Button to={b.status === "on-the-way" ? "/tracking/b1" : "#"} size="sm" variant="secondary">Track</Button>
                    ) : (
                      <Button size="sm" variant="secondary">Rebook</Button>
                    )}
                  </div>
                </div>
              ))}
              {(tab === "upcoming" ? upcoming : past).length === 0 && (
                <EmptyState icon={<Calendar className="h-6 w-6" />} title="Nothing here yet" description="Your bookings will show up in this tab." action={<Button to="/find-workers">Book a service</Button>} />
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-5">
              <h3 className="font-display text-sm font-semibold text-[var(--color-ink)]">Saved workers</h3>
              <div className="mt-3 space-y-3">
                {saved.map((w) => (
                  <Link key={w.id} to={`/workers/${w.id}`} className="flex items-center gap-3 rounded-[var(--radius-md)] p-2 hover:bg-[var(--color-canvas-dim)] focus-ring">
                    <Avatar src={w.avatar} name={w.name} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[var(--color-ink)]">{w.name}</p>
                      <p className="truncate text-xs text-[var(--color-ink-faint)]">{w.categoryName}</p>
                    </div>
                    <Heart className="h-4 w-4 shrink-0 fill-[var(--color-coral-500)] text-[var(--color-coral-500)]" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-5">
              <h3 className="font-display text-sm font-semibold text-[var(--color-ink)]">Quick links</h3>
              <div className="mt-3 space-y-1">
                {[{ label: "Addresses", icon: MapPin, to: "/settings" }, { label: "Payments & Credits", icon: CreditCard, to: "/payments" }, { label: "Notifications", icon: Bell, to: "/notifications" }, { label: "Support", icon: LifeBuoy, to: "/support" }].map((l) => (
                  <Link key={l.label} to={l.to} className="flex items-center gap-2.5 rounded-[var(--radius-sm)] px-2 py-2.5 text-sm text-[var(--color-ink)] hover:bg-[var(--color-canvas-dim)]">
                    <l.icon className="h-4 w-4 text-[var(--color-primary-500)]" /> {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
