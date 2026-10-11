import { useState } from "react";
import { Wallet, Star, CheckCircle2, XCircle, CalendarDays, TrendingUp, BookOpen, Settings as SettingsIcon, Clock3 } from "lucide-react";
import { Container, Section, Avatar, Badge } from "../components/ui/Primitives";
import { Button } from "../components/ui/Button";
import { Tabs } from "../components/ui/Tabs";
import { avatars } from "../lib/data";
import { useAuth, useToast } from "../lib/appState";

const REQUESTS = [
  { id: "req1", name: "Anita Rao", service: "Pipe Fitting", time: "Today, 4:30 PM", address: "Sector 62, Noida", price: "₹499", avatar: avatars.woman1 },
  { id: "req2", name: "Vikram Nair", service: "Leak Repair", time: "Tomorrow, 10:00 AM", address: "Sector 50, Noida", price: "₹249", avatar: avatars.man3 },
];

const EARNINGS = [
  { label: "Mon", value: 40 }, { label: "Tue", value: 65 }, { label: "Wed", value: 50 }, { label: "Thu", value: 80 },
  { label: "Fri", value: 95 }, { label: "Sat", value: 70 }, { label: "Sun", value: 55 },
];

export default function WorkerDashboard() {
  const { name } = useAuth();
  const { push } = useToast();
  const [available, setAvailable] = useState(true);
  const [tab, setTab] = useState("requests");
  const [requests, setRequests] = useState(REQUESTS);

  function respond(id: string, accept: boolean) {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    push({ title: accept ? "Booking accepted" : "Booking declined", variant: accept ? "success" : "info" });
  }

  const profileStrength = 82;

  return (
    <Section tone="canvas" className="py-8 sm:py-10">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <Avatar name={name} size="lg" />
            <div>
              <h1 className="font-display text-xl font-bold text-[var(--color-ink)] sm:text-2xl">{name}</h1>
              <p className="text-sm text-[var(--color-ink-soft)]">Electrician · Gurugram</p>
            </div>
          </div>
          <button onClick={() => setAvailable((v) => !v)} className={`flex items-center gap-2.5 rounded-full border-2 px-4 py-2.5 text-sm font-semibold transition-colors ${available ? "border-[var(--color-green-500)] bg-[color:rgba(30,158,90,0.08)] text-[var(--color-green-600)]" : "border-[color:rgba(21,32,30,0.15)] text-[var(--color-ink-soft)]"}`}>
            <span className={`h-2.5 w-2.5 rounded-full ${available ? "bg-[var(--color-green-500)]" : "bg-[var(--color-ink-faint)]"}`} />
            {available ? "Available for jobs" : "Offline"}
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "This week's earnings", value: "₹12,450", icon: Wallet },
            { label: "Completed jobs", value: "1,420", icon: CheckCircle2 },
            { label: "Rating", value: "4.8 ★", icon: Star },
            { label: "Response time", value: "15 min", icon: Clock3 },
          ].map((s) => (
            <div key={s.label} className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-5">
              <s.icon className="h-5 w-5 text-[var(--color-primary-500)]" />
              <p className="mt-3 font-display text-xl font-bold text-[var(--color-ink)] sm:text-2xl">{s.value}</p>
              <p className="text-xs text-[var(--color-ink-soft)]">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <Tabs tabs={[{ id: "requests", label: `Requests (${requests.length})` }, { id: "earnings", label: "Earnings" }, { id: "schedule", label: "Schedule" }]} active={tab} onChange={setTab} />

            {tab === "requests" && (
              <div className="mt-5 space-y-4">
                {requests.map((r) => (
                  <div key={r.id} className="flex flex-col gap-4 rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-5 sm:flex-row sm:items-center">
                    <Avatar src={r.avatar} name={r.name} size="lg" />
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-sm font-semibold text-[var(--color-ink)]">{r.service} · {r.price}</p>
                      <p className="mt-1 text-xs text-[var(--color-ink-soft)]">{r.name} · {r.time}</p>
                      <p className="mt-1 text-xs text-[var(--color-ink-faint)]">{r.address}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <Button size="sm" variant="secondary" icon={<XCircle className="h-4 w-4" />} onClick={() => respond(r.id, false)}>Decline</Button>
                      <Button size="sm" icon={<CheckCircle2 className="h-4 w-4" />} onClick={() => respond(r.id, true)}>Accept</Button>
                    </div>
                  </div>
                ))}
                {requests.length === 0 && <p className="rounded-[var(--radius-lg)] border border-dashed border-[color:rgba(21,32,30,0.15)] p-10 text-center text-sm text-[var(--color-ink-soft)]">No pending requests. New bookings will show up here instantly.</p>}
              </div>
            )}

            {tab === "earnings" && (
              <div className="mt-5 rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6">
                <div className="flex items-center justify-between">
                  <p className="font-display text-sm font-semibold text-[var(--color-ink)]">This week</p>
                  <span className="flex items-center gap-1 text-xs font-semibold text-[var(--color-green-600)]"><TrendingUp className="h-3.5 w-3.5" /> +18% vs last week</span>
                </div>
                <div className="mt-6 flex h-40 items-end gap-3">
                  {EARNINGS.map((e) => (
                    <div key={e.label} className="flex flex-1 flex-col items-center gap-2">
                      <div className="w-full rounded-t-[8px] bg-[var(--color-primary-500)]" style={{ height: `${e.value}%` }} />
                      <span className="text-[10px] font-medium text-[var(--color-ink-faint)]">{e.label}</span>
                    </div>
                  ))}
                </div>
                <Button to="/payments" variant="secondary" className="mt-6">View payout history</Button>
              </div>
            )}

            {tab === "schedule" && (
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-7">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
                  <div key={d} className="rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-3 text-center">
                    <p className="text-xs font-semibold text-[var(--color-ink-faint)]">{d}</p>
                    <p className="mt-2 font-display text-lg font-bold text-[var(--color-ink)]">{i < 5 ? "2 jobs" : "Off"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-semibold text-[var(--color-ink)]">Profile strength</h3>
                <span className="text-sm font-bold text-[var(--color-primary-600)]">{profileStrength}%</span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[color:rgba(21,32,30,0.08)]">
                <div className="h-full rounded-full bg-[var(--color-primary-500)]" style={{ width: `${profileStrength}%` }} />
              </div>
              <p className="mt-2 text-xs text-[var(--color-ink-soft)]">Add 2 more gallery photos to reach 100%.</p>
              <Button variant="secondary" size="sm" className="mt-3 w-full" icon={<SettingsIcon className="h-4 w-4" />}>Edit profile</Button>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-5">
              <h3 className="font-display text-sm font-semibold text-[var(--color-ink)]">Free skill training</h3>
              <div className="mt-3 space-y-2.5">
                {["Smart Home Wiring Basics", "Customer Communication 101", "Handling Payments Safely"].map((t) => (
                  <div key={t} className="flex items-center gap-2.5 rounded-[var(--radius-sm)] bg-[var(--color-canvas-dim)] p-3 text-sm text-[var(--color-ink)]">
                    <BookOpen className="h-4 w-4 shrink-0 text-[var(--color-primary-500)]" /> {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-5">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-[var(--color-ink)]"><CalendarDays className="h-4 w-4 text-[var(--color-primary-500)]" /> Service area</h3>
              <p className="mt-2 text-xs text-[var(--color-ink-soft)]">Gurugram, Sectors 14–62 · 10 km radius</p>
              <Badge tone="primary" className="mt-3">Edit availability & rates</Badge>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
