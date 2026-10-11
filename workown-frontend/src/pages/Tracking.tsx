import { useState } from "react";
import { Phone, MessageCircle, ShieldAlert, Share2, Check, Copy } from "lucide-react";
import { Container, Section, Avatar, Badge } from "../components/ui/Primitives";
import { Button } from "../components/ui/Button";
import { LiveMap } from "../components/cards/LiveMap";
import { getWorker } from "../lib/data";
import { useToast } from "../lib/appState";

const STATUS_STEPS = ["Confirmed", "On the way", "Arrived", "In progress", "Completed"];
const STEPS_LAST = STATUS_STEPS.length - 1;

export default function Tracking() {
  const worker = getWorker("w1")!;
  const { push } = useToast();
  const [statusIdx, setStatusIdx] = useState(1);
  const [sosOpen, setSosOpen] = useState(false);

  return (
    <Section tone="canvas" className="py-8 sm:py-10">
      <Container>
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-display text-2xl font-bold text-[var(--color-ink)] sm:text-3xl">Live Tracking</h1>
            <p className="mt-1 text-sm text-[var(--color-ink-soft)]">Booking #WO-20481 · Leak Repair</p>
          </div>
          <button
            onClick={() => { navigator.clipboard?.writeText(window.location.href); push({ title: "Trip link copied", description: "Share it with family to let them follow along.", variant: "success" }); }}
            className="flex items-center gap-2 rounded-full border border-[color:rgba(21,32,30,0.12)] px-4 py-2.5 text-sm font-semibold hover:border-[var(--color-primary-400)] focus-ring"
          >
            <Share2 className="h-4 w-4" /> Share trip
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-5">
            <LiveMap className="h-[360px] sm:h-[440px]" eta={8} />

            <div className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-5">
              <div className="flex items-center justify-between">
                {STATUS_STEPS.map((s, i) => (
                  <div key={s} className="flex flex-1 flex-col items-center text-center last:flex-none">
                    <div className="flex w-full items-center">
                      {i !== 0 && <div className={`h-0.5 flex-1 ${i <= statusIdx ? "bg-[var(--color-primary-500)]" : "bg-[color:rgba(21,32,30,0.1)]"}`} />}
                      <div className={`mx-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${i <= statusIdx ? "bg-[var(--color-primary-500)] text-white" : "bg-[color:rgba(21,32,30,0.08)] text-[var(--color-ink-faint)]"}`}>
                        {i < statusIdx ? <Check className="h-3.5 w-3.5" /> : i + 1}
                      </div>
                      {i !== STEPS_LAST && <div className={`h-0.5 flex-1 ${i < statusIdx ? "bg-[var(--color-primary-500)]" : "bg-[color:rgba(21,32,30,0.1)]"}`} />}
                    </div>
                    <span className={`mt-2 hidden text-[11px] font-medium sm:block ${i <= statusIdx ? "text-[var(--color-ink)]" : "text-[var(--color-ink-faint)]"}`}>{s}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setStatusIdx((i) => Math.min(STATUS_STEPS.length - 1, i + 1))} className="mt-4 text-xs font-semibold text-[var(--color-primary-600)] hover:underline">
                (Demo) Advance status →
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6">
              <div className="flex items-center gap-4">
                <Avatar src={worker.avatar} name={worker.name} size="lg" />
                <div>
                  <p className="font-display text-base font-semibold text-[var(--color-ink)]">{worker.name}</p>
                  <p className="text-xs text-[var(--color-ink-soft)]">{worker.categoryName} · {worker.city}</p>
                </div>
                <Badge tone="verified" className="ml-auto">Verified</Badge>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <button onClick={() => push({ title: `Calling ${worker.name}…`, variant: "info" })} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[color:rgba(21,32,30,0.12)] py-2.5 text-sm font-semibold hover:border-[var(--color-primary-400)] focus-ring">
                  <Phone className="h-4 w-4" /> Call
                </button>
                <button onClick={() => push({ title: `Opening chat with ${worker.name}`, variant: "info" })} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[color:rgba(21,32,30,0.12)] py-2.5 text-sm font-semibold hover:border-[var(--color-primary-400)] focus-ring">
                  <MessageCircle className="h-4 w-4" /> Chat
                </button>
              </div>
            </div>

            <div className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6">
              <p className="font-display text-sm font-semibold text-[var(--color-ink)]">Booking details</p>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-[var(--color-ink-soft)]">Service</dt><dd className="font-medium text-[var(--color-ink)]">Leak Repair</dd></div>
                <div className="flex justify-between"><dt className="text-[var(--color-ink-soft)]">Address</dt><dd className="text-right font-medium text-[var(--color-ink)]">A-204, Sunrise Apartments</dd></div>
                <div className="flex justify-between"><dt className="text-[var(--color-ink-soft)]">Estimated price</dt><dd className="font-medium text-[var(--color-ink)]">₹349</dd></div>
              </dl>
              <div className="mt-4 flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-canvas-dim)] px-3 py-2.5 text-xs text-[var(--color-ink-soft)]">
                <Copy className="h-3.5 w-3.5 shrink-0" /> Masked number: +91 9XXX-XXX-210
              </div>
            </div>

            <button onClick={() => setSosOpen(true)} className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-coral-50)] py-3.5 text-sm font-bold text-[var(--color-coral-600)] hover:bg-[var(--color-coral-100)] focus-ring">
              <ShieldAlert className="h-4 w-4" /> SOS — Safety Emergency
            </button>
          </div>
        </div>
      </Container>

      {sosOpen && (
        <div className="fixed inset-0 z-[180] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-sm rounded-[var(--radius-lg)] bg-[var(--color-surface)] p-6 text-center shadow-[var(--shadow-lift)]">
            <ShieldAlert className="mx-auto h-10 w-10 text-[var(--color-coral-500)]" />
            <h3 className="mt-4 font-display text-lg font-semibold">Emergency assistance</h3>
            <p className="mt-2 text-sm text-[var(--color-ink-soft)]">We'll immediately alert WorkOwn's safety team and share your live location with them.</p>
            <div className="mt-6 flex flex-col gap-2.5">
              <Button variant="coral" onClick={() => { setSosOpen(false); push({ title: "Safety team alerted", description: "Someone will call you within 60 seconds.", variant: "warning" }); }}>Alert safety team now</Button>
              <Button variant="ghost" onClick={() => setSosOpen(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
