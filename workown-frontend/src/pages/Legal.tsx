import { useParams, Navigate, Link } from "react-router-dom";
import { Container, Section, Eyebrow } from "../components/ui/Primitives";
import { cn } from "../utils/cn";

const CONTENT: Record<string, { title: string; updated: string; sections: { id: string; heading: string; body: string[] }[] }> = {
  privacy: {
    title: "Privacy Policy",
    updated: "Last updated: 1 January 2026",
    sections: [
      { id: "collection", heading: "Information we collect", body: ["We collect information you provide directly, such as your name, phone number, email and address, along with location data while a booking is active, to connect you with the right professional and keep both sides safe."] },
      { id: "use", heading: "How we use your information", body: ["We use your data to facilitate bookings, process payments, personalise recommendations, improve safety, and communicate updates about your account and bookings."] },
      { id: "sharing", heading: "Sharing with workers", body: ["Your phone number is never shared directly with workers. All calls and messages are routed through masked numbers and encrypted in-app chat."] },
      { id: "retention", heading: "Data retention", body: ["We retain booking and chat history for as long as your account is active, and as required by applicable law, after which it is securely deleted or anonymised."] },
      { id: "rights", heading: "Your rights", body: ["You can access, correct or request deletion of your personal data at any time from Settings, or by contacting our support team."] },
    ],
  },
  terms: {
    title: "Terms of Service",
    updated: "Last updated: 1 January 2026",
    sections: [
      { id: "eligibility", heading: "Eligibility", body: ["You must be at least 18 years old and able to form a legally binding contract to use WorkOwn as a customer or worker."] },
      { id: "bookings", heading: "Bookings & conduct", body: ["Customers agree to provide accurate booking details. Workers agree to arrive as scheduled and perform services professionally and safely."] },
      { id: "payments", heading: "Payments", body: ["All payments for services booked through WorkOwn must be made via the app's supported payment methods, except where cash is explicitly permitted."] },
      { id: "liability", heading: "Limitation of liability", body: ["WorkOwn facilitates connections between customers and independent workers and is not itself the service provider. Liability is limited as described in the full agreement."] },
      { id: "termination", heading: "Termination", body: ["We may suspend or terminate accounts that violate our community guidelines, safety policies, or applicable law."] },
    ],
  },
  refunds: {
    title: "Refund & Cancellation Policy",
    updated: "Last updated: 1 January 2026",
    sections: [
      { id: "cancellation", heading: "Cancelling a booking", body: ["Customers can cancel a booking free of charge up to 2 hours before the scheduled time. Later cancellations may incur a small convenience fee."] },
      { id: "worker-cancel", heading: "If a worker cancels", body: ["If a worker cancels, we automatically attempt to re-match you with an available alternative and credit your account with a service credit for the inconvenience."] },
      { id: "refunds", heading: "Refund eligibility", body: ["Refunds are issued for jobs not completed as described, duplicate charges, or service quality issues validated by our support team."] },
      { id: "timeline", heading: "Refund timeline", body: ["Approved refunds are processed within 5–7 business days to your original payment method, or instantly as WorkOwn service credits."] },
    ],
  },
};

export default function Legal() {
  const { type } = useParams();
  const doc = CONTENT[type ?? ""];
  if (!doc) return <Navigate to="/legal/privacy" replace />;

  return (
    <Section tone="canvas" className="py-10 sm:py-14">
      <Container>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-4 font-display text-3xl font-bold text-[var(--color-ink)]">{doc.title}</h1>
        <p className="mt-1 text-sm text-[var(--color-ink-faint)]">{doc.updated}</p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
          <nav className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              <p className="px-3 text-xs font-bold uppercase tracking-wide text-[var(--color-ink-faint)]">On this page</p>
              {doc.sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="block rounded-[var(--radius-sm)] px-3 py-2 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-canvas-dim)] hover:text-[var(--color-ink)]">{s.heading}</a>
              ))}
              <div className="mt-4 space-y-1 border-t border-[color:rgba(21,32,30,0.08)] pt-4">
                {(["privacy", "terms", "refunds"] as const).map((t) => (
                  <Link key={t} to={`/legal/${t}`} className={cn("block rounded-[var(--radius-sm)] px-3 py-2 text-sm", t === type ? "bg-[var(--color-primary-50)] font-semibold text-[var(--color-primary-700)]" : "text-[var(--color-ink-soft)] hover:bg-[var(--color-canvas-dim)]")}>
                    {CONTENT[t].title}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="max-w-2xl space-y-10">
            {doc.sections.map((s) => (
              <div key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">{s.heading}</h2>
                {s.body.map((p, i) => <p key={i} className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">{p}</p>)}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
