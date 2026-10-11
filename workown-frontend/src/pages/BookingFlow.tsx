import { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Repeat, Check, ArrowLeft, ArrowRight, CreditCard, Smartphone, Wallet, Banknote, CheckCircle2, Camera } from "lucide-react";
import { Container, Section, Avatar, Badge, Divider } from "../components/ui/Primitives";
import { Button } from "../components/ui/Button";
import { getWorker, formatPrice } from "../lib/data";
import { useToast } from "../lib/appState";

const STEPS = ["Service", "Schedule", "Address", "Review & Pay"];
const TIMESLOTS = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"];
const SAVED_ADDRESSES = [
  { id: "a1", label: "Home", detail: "A-204, Sunrise Apartments, Sector 50, Noida, UP 201301" },
  { id: "a2", label: "Office", detail: "4th Floor, Tech Park One, Sector 62, Noida, UP 201309" },
];

export default function BookingFlow() {
  const { workerId } = useParams();
  const worker = getWorker(workerId ?? "");
  const navigate = useNavigate();
  const { push } = useToast();

  const [step, setStep] = useState(0);
  const [serviceIdx, setServiceIdx] = useState(0);
  const [bookingType, setBookingType] = useState<"instant" | "request">("instant");
  const [recurrence, setRecurrence] = useState<"none" | "daily" | "weekly" | "monthly">("none");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(TIMESLOTS[1]);
  const [addressId, setAddressId] = useState(SAVED_ADDRESSES[0].id);
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState<"upi" | "card" | "wallet" | "cash">("upi");
  const [confirmed, setConfirmed] = useState(false);
  const [placing, setPlacing] = useState(false);

  if (!worker) return <Navigate to="/find-workers" replace />;
  const service = worker.services[serviceIdx] ?? worker.services[0];
  const platformFee = 19;
  const total = service.price.amount + platformFee;

  function next() { setStep((s) => Math.min(STEPS.length - 1, s + 1)); }
  function back() { setStep((s) => Math.max(0, s - 1)); }

  function placeBooking() {
    const workerName = worker?.name ?? "Your professional";
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setConfirmed(true);
      push({ title: "Booking confirmed!", description: `${workerName} has been notified.`, variant: "success" });
    }, 1200);
  }

  if (confirmed) {
    return (
      <Section tone="canvas" className="flex min-h-[70vh] items-center">
        <Container className="flex flex-col items-center text-center">
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14 }} className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-green-500)] text-white">
            <CheckCircle2 className="h-10 w-10" />
          </motion.div>
          <h1 className="mt-6 font-display text-2xl font-bold text-[var(--color-ink)] sm:text-3xl">Booking confirmed!</h1>
          <p className="mt-3 max-w-md text-[var(--color-ink-soft)]">
            {worker.name} will {bookingType === "instant" ? "arrive" : "respond"} for your {service.name.toLowerCase()} on {date || "the selected date"} at {time}. You'll get live tracking once they're on the way.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button onClick={() => navigate("/tracking/b1")} iconRight={<ArrowRight className="h-4 w-4" />}>Track this booking</Button>
            <Button variant="secondary" onClick={() => navigate("/dashboard")}>Go to dashboard</Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section tone="canvas" className="py-10">
      <Container>
        <div className="mb-8 flex items-center gap-3 rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-4">
          <Avatar src={worker.avatar} name={worker.name} />
          <div>
            <p className="font-display text-sm font-semibold text-[var(--color-ink)]">Booking {worker.name}</p>
            <p className="text-xs text-[var(--color-ink-soft)]">{worker.categoryName} · {worker.city}</p>
          </div>
          {worker.verified && <Badge tone="verified" className="ml-auto">Verified</Badge>}
        </div>

        <div className="mb-10 flex items-center">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <div className="flex items-center gap-2">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${i < step ? "bg-[var(--color-primary-500)] text-white" : i === step ? "bg-[var(--color-ink)] text-white" : "bg-[color:rgba(21,32,30,0.08)] text-[var(--color-ink-faint)]"}`}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`hidden text-sm font-medium sm:block ${i <= step ? "text-[var(--color-ink)]" : "text-[var(--color-ink-faint)]"}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`mx-3 h-0.5 flex-1 rounded-full ${i < step ? "bg-[var(--color-primary-500)]" : "bg-[color:rgba(21,32,30,0.1)]"}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
          <div className="rounded-[var(--radius-xl)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6 sm:p-8">
            {step === 0 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">Choose a service</h2>
                <div className="mt-5 space-y-3">
                  {worker.services.map((s, i) => (
                    <button key={s.name} onClick={() => setServiceIdx(i)} className={`flex w-full items-center justify-between rounded-[var(--radius-md)] border-2 p-4 text-left transition-colors ${serviceIdx === i ? "border-[var(--color-primary-500)] bg-[var(--color-primary-50)]" : "border-[color:rgba(21,32,30,0.1)]"}`}>
                      <span className="text-sm font-medium text-[var(--color-ink)]">{s.name}</span>
                      <span className="text-sm font-bold text-[var(--color-primary-600)]">{formatPrice(s.price)}</span>
                    </button>
                  ))}
                </div>
                <h3 className="mt-7 font-display text-sm font-semibold text-[var(--color-ink)]">Booking type</h3>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button onClick={() => setBookingType("instant")} className={`rounded-[var(--radius-md)] border-2 p-4 text-left ${bookingType === "instant" ? "border-[var(--color-primary-500)] bg-[var(--color-primary-50)]" : "border-[color:rgba(21,32,30,0.1)]"}`}>
                    <p className="text-sm font-semibold text-[var(--color-ink)]">Book instantly</p>
                    <p className="mt-1 text-xs text-[var(--color-ink-soft)]">Confirmed immediately based on availability.</p>
                  </button>
                  <button onClick={() => setBookingType("request")} className={`rounded-[var(--radius-md)] border-2 p-4 text-left ${bookingType === "request" ? "border-[var(--color-primary-500)] bg-[var(--color-primary-50)]" : "border-[color:rgba(21,32,30,0.1)]"}`}>
                    <p className="text-sm font-semibold text-[var(--color-ink)]">Send a request</p>
                    <p className="mt-1 text-xs text-[var(--color-ink-soft)]">Worker reviews and confirms within the hour.</p>
                  </button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">Pick date & time</h2>
                <label className="mt-5 block">
                  <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)]"><Calendar className="h-4 w-4" /> Date</span>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-12 w-full rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.15)] px-4 text-sm outline-none focus:border-[var(--color-primary-500)]" />
                </label>
                <div className="mt-5">
                  <span className="mb-2 flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)]"><Clock className="h-4 w-4" /> Time slot</span>
                  <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
                    {TIMESLOTS.map((t) => (
                      <button key={t} onClick={() => setTime(t)} className={`rounded-full border-2 px-2 py-2.5 text-xs font-semibold ${time === t ? "border-[var(--color-primary-500)] bg-[var(--color-primary-50)] text-[var(--color-primary-700)]" : "border-[color:rgba(21,32,30,0.1)] text-[var(--color-ink-soft)]"}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <span className="mb-2 flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)]"><Repeat className="h-4 w-4" /> Recurrence</span>
                  <div className="flex flex-wrap gap-2">
                    {(["none", "daily", "weekly", "monthly"] as const).map((r) => (
                      <button key={r} onClick={() => setRecurrence(r)} className={`rounded-full border-2 px-4 py-2 text-xs font-semibold capitalize ${recurrence === r ? "border-[var(--color-primary-500)] bg-[var(--color-primary-50)] text-[var(--color-primary-700)]" : "border-[color:rgba(21,32,30,0.1)] text-[var(--color-ink-soft)]"}`}>{r === "none" ? "One-time" : r}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">Service address</h2>
                <div className="mt-5 space-y-3">
                  {SAVED_ADDRESSES.map((a) => (
                    <button key={a.id} onClick={() => setAddressId(a.id)} className={`flex w-full items-start gap-3 rounded-[var(--radius-md)] border-2 p-4 text-left ${addressId === a.id ? "border-[var(--color-primary-500)] bg-[var(--color-primary-50)]" : "border-[color:rgba(21,32,30,0.1)]"}`}>
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary-500)]" />
                      <span>
                        <span className="block text-sm font-semibold text-[var(--color-ink)]">{a.label}</span>
                        <span className="block text-xs text-[var(--color-ink-soft)]">{a.detail}</span>
                      </span>
                    </button>
                  ))}
                </div>
                <div className="relative mt-4 h-32 overflow-hidden rounded-[var(--radius-md)] bg-[#E7EFEA]">
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-[var(--color-ink-soft)]">Map pin preview</div>
                </div>
                <label className="mt-5 block">
                  <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)]"><Camera className="h-4 w-4" /> Notes & photos (optional)</span>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="E.g. the leak is under the kitchen sink" className="w-full rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.15)] p-3.5 text-sm outline-none focus:border-[var(--color-primary-500)]" />
                </label>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">Review & pay</h2>
                <div className="mt-5 space-y-3 rounded-[var(--radius-md)] bg-[var(--color-canvas-dim)] p-4 text-sm">
                  <div className="flex justify-between"><span className="text-[var(--color-ink-soft)]">Service</span><span className="font-medium text-[var(--color-ink)]">{service.name}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--color-ink-soft)]">Date & time</span><span className="font-medium text-[var(--color-ink)]">{date || "Today"}, {time}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--color-ink-soft)]">Recurrence</span><span className="font-medium capitalize text-[var(--color-ink)]">{recurrence === "none" ? "One-time" : recurrence}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--color-ink-soft)]">Address</span><span className="text-right font-medium text-[var(--color-ink)]">{SAVED_ADDRESSES.find((a) => a.id === addressId)?.label}</span></div>
                </div>
                <h3 className="mt-6 font-display text-sm font-semibold text-[var(--color-ink)]">Payment method</h3>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[{ id: "upi", label: "UPI", icon: Smartphone }, { id: "card", label: "Card", icon: CreditCard }, { id: "wallet", label: "Wallet", icon: Wallet }, { id: "cash", label: "Cash", icon: Banknote }].map((p) => (
                    <button key={p.id} onClick={() => setPayment(p.id as typeof payment)} className={`flex flex-col items-center gap-2 rounded-[var(--radius-md)] border-2 p-4 ${payment === p.id ? "border-[var(--color-primary-500)] bg-[var(--color-primary-50)]" : "border-[color:rgba(21,32,30,0.1)]"}`}>
                      <p.icon className="h-5 w-5 text-[var(--color-primary-600)]" />
                      <span className="text-xs font-semibold text-[var(--color-ink)]">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <Button variant="ghost" onClick={back} className={step === 0 ? "invisible" : ""} icon={<ArrowLeft className="h-4 w-4" />}>Back</Button>
              {step < STEPS.length - 1 ? (
                <Button onClick={next} iconRight={<ArrowRight className="h-4 w-4" />}>Continue</Button>
              ) : (
                <Button onClick={placeBooking} loading={placing} iconRight={!placing ? <Check className="h-4 w-4" /> : undefined}>
                  {bookingType === "instant" ? "Confirm & Pay" : "Send Request"}
                </Button>
              )}
            </div>
          </div>

          <aside className="h-fit rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6">
            <h3 className="font-display text-sm font-semibold text-[var(--color-ink)]">Price summary</h3>
            <div className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between text-[var(--color-ink-soft)]"><span>{service.name}</span><span>{formatPrice(service.price)}</span></div>
              <div className="flex justify-between text-[var(--color-ink-soft)]"><span>Platform fee</span><span>₹{platformFee}</span></div>
            </div>
            <Divider className="my-4" />
            <div className="flex justify-between font-display text-base font-bold text-[var(--color-ink)]">
              <span>Estimated total</span><span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <p className="mt-3 text-xs text-[var(--color-ink-faint)]">Final amount may vary slightly based on actual work done and parts used, always confirmed with you first.</p>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
