import { useState } from "react";
import { Bell, CalendarCheck2, CreditCard, MessageCircle, Megaphone, Check } from "lucide-react";
import { Container, Section, EmptyState } from "../components/ui/Primitives";
import { Button } from "../components/ui/Button";

const NOTIFS = [
  { id: "n1", icon: CalendarCheck2, title: "Ramesh is on the way", desc: "Your plumber will arrive in approximately 8 minutes.", time: "2 min ago", unread: true, tone: "primary" },
  { id: "n2", icon: MessageCircle, title: "New message from Priya Sharma", desc: "Can we shift tomorrow's session to 6 PM?", time: "1 hr ago", unread: true, tone: "coral" },
  { id: "n3", icon: CreditCard, title: "Payment successful", desc: "₹299 paid to Kavita Devi for Home Cleaning.", time: "Yesterday", unread: false, tone: "verified" },
  { id: "n4", icon: Megaphone, title: "20% off your next booking", desc: "Use code WORKOWN20 on your next service this week.", time: "2 days ago", unread: false, tone: "amber" },
  { id: "n5", icon: CalendarCheck2, title: "Booking completed", desc: "Your switchboard repair with Suresh Kumar is complete. Leave a review?", time: "4 days ago", unread: false, tone: "primary" },
];

const toneClass: Record<string, string> = {
  primary: "bg-[var(--color-primary-50)] text-[var(--color-primary-600)]",
  coral: "bg-[var(--color-coral-50)] text-[var(--color-coral-600)]",
  verified: "bg-[color:rgba(30,158,90,0.12)] text-[var(--color-green-600)]",
  amber: "bg-[color:rgba(242,163,15,0.14)] text-[var(--color-amber-600)]",
};

export default function Notifications() {
  const [items, setItems] = useState(NOTIFS);

  return (
    <Section tone="canvas" className="py-8 sm:py-10">
      <Container className="max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-[var(--color-ink)] sm:text-3xl">Notifications</h1>
          <Button variant="secondary" size="sm" icon={<Check className="h-4 w-4" />} onClick={() => setItems((prev) => prev.map((i) => ({ ...i, unread: false })))}>
            Mark all read
          </Button>
        </div>

        <div className="mt-6 space-y-3">
          {items.map((n) => (
            <button
              key={n.id}
              onClick={() => setItems((prev) => prev.map((i) => (i.id === n.id ? { ...i, unread: false } : i)))}
              className={`flex w-full items-start gap-4 rounded-[var(--radius-lg)] border p-4 text-left transition-colors ${n.unread ? "border-[var(--color-primary-200)] bg-[var(--color-primary-50)]" : "border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)]"}`}
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${toneClass[n.tone]}`}>
                <n.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-[var(--color-ink)]">{n.title}</p>
                  <span className="shrink-0 text-[11px] text-[var(--color-ink-faint)]">{n.time}</span>
                </div>
                <p className="mt-0.5 text-xs text-[var(--color-ink-soft)]">{n.desc}</p>
              </div>
              {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-primary-500)]" />}
            </button>
          ))}
          {items.length === 0 && <EmptyState icon={<Bell className="h-6 w-6" />} title="You're all caught up" description="New notifications will appear here." />}
        </div>
      </Container>
    </Section>
  );
}
