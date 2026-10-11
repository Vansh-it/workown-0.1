import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowLeft, ArrowRight, Upload, ShieldCheck, Save, Clock3, CheckCircle2 } from "lucide-react";
import { Container, Section, Badge } from "../components/ui/Primitives";
import { Button } from "../components/ui/Button";
import { CATEGORIES } from "../lib/data";
import { useToast } from "../lib/appState";

const STEPS = ["Basics", "Skills & Experience", "Services & Rates", "Hours & Area", "Documents", "Review"];

export default function WorkerRegistration() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState(false);
  const { push } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", phone: "", city: "", category: CATEGORIES[0].slug,
    experience: "3", bio: "",
    rateUnit: "hour", rate: "349",
    hours: "9:00 AM – 7:00 PM", area: "10",
    consent: false,
  });

  useEffect(() => {
    setSaved(false);
    const id = setTimeout(() => setSaved(true), 600);
    return () => clearTimeout(id);
  }, [form]);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function next() { setStep((s) => Math.min(STEPS.length - 1, s + 1)); }
  function back() { setStep((s) => Math.max(0, s - 1)); }

  function submit() {
    setSubmitted(true);
    push({ title: "Application submitted!", description: "We'll review your details within 24–48 hours.", variant: "success" });
  }

  if (submitted) {
    return (
      <Section tone="canvas" className="flex min-h-[70vh] items-center">
        <Container className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[color:rgba(242,163,15,0.14)] text-[var(--color-amber-600)]">
            <Clock3 className="h-9 w-9" />
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold text-[var(--color-ink)] sm:text-3xl">Application status: Pending review</h1>
          <p className="mt-3 max-w-md text-[var(--color-ink-soft)]">
            Thanks, {form.name || "there"}! Our verification partner is reviewing your ID and details. This usually takes 24–48 hours — we'll notify you the moment you're verified.
          </p>
          <div className="mt-8 flex items-center gap-3 rounded-full border border-[color:rgba(21,32,30,0.1)] bg-[var(--color-surface)] px-5 py-3">
            <Badge tone="amber">Pending</Badge>
            <span className="text-sm text-[var(--color-ink-soft)]">Reference ID: WO-WRK-88213</span>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button onClick={() => navigate("/dashboard/worker")} iconRight={<ArrowRight className="h-4 w-4" />}>Go to worker dashboard</Button>
            <Button variant="secondary" onClick={() => navigate("/")}>Back to home</Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section tone="canvas" className="py-10">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-[var(--color-ink)] sm:text-3xl">Worker Registration</h1>
            <p className="mt-1 text-sm text-[var(--color-ink-soft)]">Step {step + 1} of {STEPS.length} · {STEPS[step]}</p>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-ink-faint)]">
            <Save className="h-3.5 w-3.5" /> {saved ? "Saved" : "Saving…"}
          </span>
        </div>

        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-[color:rgba(21,32,30,0.08)]">
          <div className="h-full rounded-full bg-[var(--color-primary-500)] transition-all duration-500" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[200px_1fr]">
          <div className="hidden flex-col gap-1 lg:flex">
            {STEPS.map((s, i) => (
              <button key={s} onClick={() => setStep(i)} className={`flex items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2.5 text-left text-sm font-medium transition-colors ${i === step ? "bg-[var(--color-primary-50)] text-[var(--color-primary-700)]" : i < step ? "text-[var(--color-ink)]" : "text-[var(--color-ink-faint)]"}`}>
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${i < step ? "bg-[var(--color-primary-500)] text-white" : i === step ? "border-2 border-[var(--color-primary-500)]" : "border border-[color:rgba(21,32,30,0.2)]"}`}>
                  {i < step ? <Check className="h-3 w-3" /> : ""}
                </span>
                {s}
              </button>
            ))}
          </div>

          <div className="rounded-[var(--radius-xl)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6 sm:p-8">
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Let's start with the basics</h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Full name"><input value={form.name} onChange={(e) => update("name", e.target.value)} className="input" placeholder="e.g. Ramesh Yadav" /></Field>
                  <Field label="Mobile number"><input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="input" placeholder="+91 98765 43210" /></Field>
                  <Field label="City"><input value={form.city} onChange={(e) => update("city", e.target.value)} className="input" placeholder="e.g. Delhi" /></Field>
                  <Field label="Primary category">
                    <select value={form.category} onChange={(e) => update("category", e.target.value)} className="input">
                      {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                    </select>
                  </Field>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Your skills & experience</h2>
                <Field label="Years of experience">
                  <input type="range" min={0} max={25} value={form.experience} onChange={(e) => update("experience", e.target.value)} className="w-full accent-[var(--color-primary-500)]" />
                  <p className="mt-1 text-sm font-semibold text-[var(--color-primary-600)]">{form.experience} years</p>
                </Field>
                <Field label="Tell customers about yourself">
                  <textarea value={form.bio} onChange={(e) => update("bio", e.target.value)} rows={4} className="input !h-auto py-3" placeholder="Describe your expertise, certifications and what makes your work stand out." />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Services & rates</h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Rate unit">
                    <select value={form.rateUnit} onChange={(e) => update("rateUnit", e.target.value)} className="input">
                      <option value="hour">Per hour</option>
                      <option value="job">Per job</option>
                      <option value="day">Per day</option>
                      <option value="month">Per month</option>
                    </select>
                  </Field>
                  <Field label="Rate (₹)"><input type="number" value={form.rate} onChange={(e) => update("rate", e.target.value)} className="input" /></Field>
                </div>
                <p className="rounded-[var(--radius-md)] bg-[var(--color-canvas-dim)] p-3.5 text-xs text-[var(--color-ink-soft)]">You can add specific services and detailed pricing after your profile is verified.</p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Working hours & service area</h2>
                <Field label="Working hours"><input value={form.hours} onChange={(e) => update("hours", e.target.value)} className="input" /></Field>
                <Field label="Service radius (km)">
                  <input type="range" min={1} max={30} value={form.area} onChange={(e) => update("area", e.target.value)} className="w-full accent-[var(--color-primary-500)]" />
                  <p className="mt-1 text-sm font-semibold text-[var(--color-primary-600)]">{form.area} km</p>
                </Field>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">ID & document upload</h2>
                {["Government ID (Aadhaar / PAN)", "Address proof", "Professional certificate (optional)"].map((doc) => (
                  <label key={doc} className="flex cursor-pointer items-center justify-between rounded-[var(--radius-md)] border-2 border-dashed border-[color:rgba(21,32,30,0.15)] p-4 hover:border-[var(--color-primary-400)]">
                    <span className="text-sm font-medium text-[var(--color-ink)]">{doc}</span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary-600)]"><Upload className="h-3.5 w-3.5" /> Upload</span>
                    <input type="file" className="hidden" />
                  </label>
                ))}
                <label className="flex items-start gap-3 rounded-[var(--radius-md)] bg-[var(--color-canvas-dim)] p-4">
                  <input type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-0.5 h-5 w-5 accent-[var(--color-primary-500)]" />
                  <span className="text-sm text-[var(--color-ink-soft)]">I consent to a background check being performed as part of WorkOwn's verification process.</span>
                </label>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-5">
                <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Review your application</h2>
                <div className="space-y-3 rounded-[var(--radius-md)] bg-[var(--color-canvas-dim)] p-5 text-sm">
                  {[
                    ["Name", form.name || "—"], ["Phone", form.phone || "—"], ["City", form.city || "—"],
                    ["Category", CATEGORIES.find((c) => c.slug === form.category)?.name ?? "—"],
                    ["Experience", `${form.experience} years`], ["Rate", `₹${form.rate} / ${form.rateUnit}`],
                    ["Service area", `${form.area} km radius`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between"><span className="text-[var(--color-ink-soft)]">{label}</span><span className="font-medium text-[var(--color-ink)]">{value}</span></div>
                  ))}
                </div>
                <p className="flex items-center gap-2 text-xs text-[var(--color-ink-faint)]"><ShieldCheck className="h-3.5 w-3.5" /> By submitting, you agree to WorkOwn's Terms of Service and Worker Code of Conduct.</p>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <Button variant="ghost" onClick={back} className={step === 0 ? "invisible" : ""} icon={<ArrowLeft className="h-4 w-4" />}>Back</Button>
              {step < STEPS.length - 1 ? (
                <Button onClick={next} iconRight={<ArrowRight className="h-4 w-4" />}>Continue</Button>
              ) : (
                <Button onClick={submit} icon={<CheckCircle2 className="h-4 w-4" />}>Submit application</Button>
              )}
            </div>
          </div>
        </div>
      </Container>
      <style>{`.input { height: 3rem; width: 100%; border-radius: var(--radius-md); border: 1px solid rgba(21,32,30,0.15); padding: 0 1rem; font-size: 0.875rem; outline: none; background: var(--color-surface); color: var(--color-ink); } .input:focus { border-color: var(--color-primary-500); }`}</style>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">{label}</span>
      {children}
    </label>
  );
}
