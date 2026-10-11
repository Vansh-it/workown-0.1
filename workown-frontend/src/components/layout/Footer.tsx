import { useState } from "react";
import { Link } from "react-router-dom";
import { Globe, MessageCircle, Users, Heart, Mail, ArrowRight, Apple, PlayCircle } from "lucide-react";
import { Container } from "../ui/Primitives";
import { Button } from "../ui/Button";
import { useToast } from "../../lib/appState";
import { useI18n } from "../../lib/i18n";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "How It Works", to: "/how-it-works" },
      { label: "Trust & Safety", to: "/trust-safety" },
      { label: "Careers", to: "/careers" },
      { label: "Blog", to: "/blog" },
    ],
  },
  {
    title: "For Customers",
    links: [
      { label: "Browse Services", to: "/browse-services" },
      { label: "Find Workers", to: "/find-workers" },
      { label: "Safety Information", to: "/trust-safety" },
      { label: "Help Center", to: "/support" },
    ],
  },
  {
    title: "For Workers",
    links: [
      { label: "Become a Worker", to: "/become-a-worker" },
      { label: "Worker Registration", to: "/register-worker" },
      { label: "Worker Dashboard", to: "/dashboard/worker" },
      { label: "Skill Training", to: "/become-a-worker#training" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/legal/privacy" },
      { label: "Terms of Service", to: "/legal/terms" },
      { label: "Refund & Cancellation", to: "/legal/refunds" },
      { label: "Contact Us", to: "/support#contact" },
    ],
  },
];

export function Footer() {
  const { push } = useToast();
  const { t } = useI18n();
  const [email, setEmail] = useState("");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    push({
      title: "You're subscribed!",
      description: "We'll send useful tips and offers to " + email,
      variant: "success",
    });
    setEmail("");
  }

  return (
    <footer className="border-t border-[color:rgba(21,32,30,0.08)] bg-[var(--color-navy-800)] text-white">
      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_2fr] lg:gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[var(--color-primary-500)] text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21V11.6L16 8l7 3.6V21l-7 3.4L9 21Z" transform="translate(-5 -4)" />
                  <path d="M7.5 11.5l2.6 2.6 4.4-4.9" />
                </svg>
              </span>
              <span className="font-display text-lg font-bold">WorkOwn</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Skill meets success. Connecting India's households with verified, respected service professionals — one trusted booking at a time.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { Icon: Globe, label: "Website" },
                { Icon: MessageCircle, label: "Community" },
                { Icon: Users, label: "Careers" },
                { Icon: Heart, label: "Support" },
              ].map(({ Icon, label }) => (
                <Link
                  key={label}
                  to={label === "Careers" ? "/careers" : label === "Support" ? "/support" : "/about"}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-ring"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-bold uppercase tracking-wide text-white/40">{col.title}</p>
                <ul className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="text-sm text-white/75 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="my-8 h-px w-full bg-white/10 sm:my-10" />

        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md w-full">
            <p className="font-display text-base font-semibold sm:text-lg">{t("footer.newsletter")}</p>
            <p className="mt-1 text-sm text-white/60">{t("footer.newsletter.sub")}</p>
            <form className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center" onSubmit={handleSubscribe}>
              <div className="flex h-12 flex-1 items-center gap-2 rounded-full bg-white/10 px-4">
                <Mail className="h-4 w-4 shrink-0 text-white/50" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-full w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
                />
              </div>
              <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto" iconRight={<ArrowRight className="h-4 w-4" />}>
                {t("footer.subscribe")}
              </Button>
            </form>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10"
            >
              <Apple className="h-4 w-4" /> App Store
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10"
            >
              <PlayCircle className="h-4 w-4" /> Google Play
            </a>
          </div>
        </div>

        <div className="my-8 h-px w-full bg-white/10 sm:my-10" />

        <div className="flex flex-col items-start justify-between gap-4 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} WorkOwn Technologies Pvt. Ltd. {t("footer.rights")}</p>
          <div className="flex items-center gap-5">
            <Link to="/legal/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/legal/terms" className="hover:text-white">Terms</Link>
            <Link to="/legal/refunds" className="hover:text-white">Refunds</Link>
          </div>
        </div>
        <p className="mt-8 select-none font-display text-[18vw] font-extrabold leading-none tracking-tighter text-white/[0.04] sm:text-[11vw]">
          WorkOwn
        </p>
      </Container>
    </footer>
  );
}
