import { useState } from "react";
import { CreditCard, Smartphone, Wallet, Banknote, ShieldCheck, Download, RefreshCcw } from "lucide-react";
import { Container, Section, SectionHeading, Divider, Badge } from "../components/ui/Primitives";
import { Button } from "../components/ui/Button";
import { BOOKINGS, formatPrice } from "../lib/data";

const INVOICES = [
  { id: "INV-20481", service: "Leak Repair", worker: "Ramesh Yadav", date: "12 Mar 2025", amount: "₹368", status: "Paid" },
  { id: "INV-20391", service: "Home Cleaning", worker: "Kavita Devi", date: "4 Mar 2025", amount: "₹318", status: "Paid" },
  { id: "INV-20287", service: "Switchboard Repair", worker: "Suresh Kumar", date: "22 Feb 2025", amount: "₹218", status: "Refunded" },
];

export default function Payments() {
  const [method, setMethod] = useState<"upi" | "card" | "wallet" | "cash">("upi");
  const booking = BOOKINGS[1];

  return (
    <Section tone="canvas" className="py-10">
      <Container>
        <SectionHeading eyebrow="Secure checkout" title="Payments" sub="All transactions are encrypted and PCI-DSS compliant. You're only charged after confirming." />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <div className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6">
              <h2 className="font-display text-base font-semibold text-[var(--color-ink)]">Choose payment method</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[{ id: "upi", label: "UPI", icon: Smartphone }, { id: "card", label: "Card", icon: CreditCard }, { id: "wallet", label: "Wallet", icon: Wallet }, { id: "cash", label: "Cash", icon: Banknote }].map((p) => (
                  <button key={p.id} onClick={() => setMethod(p.id as typeof method)} className={`flex flex-col items-center gap-2 rounded-[var(--radius-md)] border-2 p-4 transition-colors ${method === p.id ? "border-[var(--color-primary-500)] bg-[var(--color-primary-50)]" : "border-[color:rgba(21,32,30,0.1)]"}`}>
                    <p.icon className="h-5 w-5 text-[var(--color-primary-600)]" />
                    <span className="text-xs font-semibold text-[var(--color-ink)]">{p.label}</span>
                  </button>
                ))}
              </div>
              {method === "upi" && (
                <label className="mt-5 block">
                  <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">UPI ID</span>
                  <input placeholder="yourname@upi" className="h-12 w-full rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.15)] px-4 text-sm outline-none focus:border-[var(--color-primary-500)]" />
                </label>
              )}
              {method === "card" && (
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <input placeholder="Card number" className="col-span-2 h-12 rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.15)] px-4 text-sm outline-none focus:border-[var(--color-primary-500)]" />
                  <input placeholder="MM/YY" className="h-12 rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.15)] px-4 text-sm outline-none focus:border-[var(--color-primary-500)]" />
                  <input placeholder="CVV" className="h-12 rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.15)] px-4 text-sm outline-none focus:border-[var(--color-primary-500)]" />
                </div>
              )}
              {method === "cash" && <p className="mt-4 text-sm text-[var(--color-ink-soft)]">Pay your worker directly in cash once the job is completed.</p>}
              <p className="mt-5 flex items-center gap-2 text-xs text-[var(--color-ink-faint)]"><ShieldCheck className="h-3.5 w-3.5" /> Your payment details are encrypted and never shared with workers.</p>
            </div>

            <div className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base font-semibold text-[var(--color-ink)]">Invoices & receipts</h2>
                <RefreshCcw className="h-4 w-4 text-[var(--color-ink-faint)]" />
              </div>
              <div className="mt-4 divide-y divide-[color:rgba(21,32,30,0.08)]">
                {INVOICES.map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between gap-3 py-3.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[var(--color-ink)]">{inv.service} · {inv.worker}</p>
                      <p className="text-xs text-[var(--color-ink-faint)]">{inv.id} · {inv.date}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <Badge tone={inv.status === "Paid" ? "verified" : "coral"}>{inv.status}</Badge>
                      <span className="text-sm font-semibold text-[var(--color-ink)]">{inv.amount}</span>
                      <button aria-label="Download invoice" className="text-[var(--color-ink-faint)] hover:text-[var(--color-primary-600)]"><Download className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit space-y-5">
            <div className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6">
              <h3 className="font-display text-sm font-semibold text-[var(--color-ink)]">Order summary</h3>
              <p className="mt-3 text-sm text-[var(--color-ink-soft)]">{booking.service} with {booking.workerName}</p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-[var(--color-ink-soft)]"><span>Service</span><span>{formatPrice(booking.price)}</span></div>
                <div className="flex justify-between text-[var(--color-ink-soft)]"><span>Platform fee</span><span>₹19</span></div>
                <div className="flex justify-between text-[var(--color-ink-soft)]"><span>Service credit</span><span className="text-[var(--color-green-600)]">−₹50</span></div>
              </div>
              <Divider className="my-4" />
              <div className="flex justify-between font-display text-base font-bold text-[var(--color-ink)]"><span>Total</span><span>₹568</span></div>
              <Button className="mt-5 w-full" size="lg">Pay ₹568</Button>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-dashed border-[color:rgba(21,32,30,0.15)] p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">Service credits</p>
              <p className="mt-1 font-display text-2xl font-bold text-[var(--color-primary-600)]">₹150</p>
              <p className="mt-1 text-xs text-[var(--color-ink-soft)]">Earned from a re-matched booking. Auto-applied at checkout.</p>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
