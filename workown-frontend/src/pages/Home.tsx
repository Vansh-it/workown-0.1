import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Search, ShieldCheck, MapPin, Star, BadgeCheck, PlayCircle,
  Fingerprint, LocateFixed, Lock, Apple, PlayCircle as GooglePlay, ChevronRight,
} from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow, Badge, Rating, Avatar, IconCircle } from "../components/ui/Primitives";
import { Button } from "../components/ui/Button";
import { Tabs } from "../components/ui/Tabs";
import { Accordion } from "../components/ui/Accordion";
import { CategoryTile } from "../components/cards/CategoryTile";
import { WorkerCard } from "../components/cards/WorkerCard";
import { LiveMap } from "../components/cards/LiveMap";
import { CATEGORIES, WORKERS, STATS, TESTIMONIALS, FAQS, img, avatars } from "../lib/data";
import { useI18n } from "../lib/i18n";
import { useToast } from "../lib/appState";
import type { Worker } from "../lib/types";

const HOW_IT_WORKS = {
  customer: [
    { title: "Tell us what you need", desc: "Search or browse 13+ categories and describe the job in seconds." },
    { title: "Compare & choose", desc: "See verified profiles with ratings, pricing and real availability." },
    { title: "Track your worker live", desc: "Watch their ETA on the map from confirmation to arrival." },
    { title: "Pay & review", desc: "Pay securely in-app and rate your experience to help others." },
  ],
  worker: [
    { title: "Create your profile", desc: "Add your skills, service area, rates and working hours." },
    { title: "Get verified", desc: "Complete ID and background checks to earn the trust badge." },
    { title: "Accept bookings", desc: "Get matched with nearby customers and accept jobs you want." },
    { title: "Get paid & grow", desc: "Receive secure payments and build your reputation with reviews." },
  ],
};

export default function Home() {
  const { t } = useI18n();
  const [howTab, setHowTab] = useState<"customer" | "worker">("customer");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { push } = useToast();
  function handleCall(w: Worker) {
    push({ title: `Calling ${w.name}…`, description: "Your number stays private.", variant: "info" });
  }
  function handleChat(w: Worker) {
    push({ title: `Opening chat with ${w.name}`, variant: "info" });
  }
  const topWorkers = WORKERS.slice(0, 6);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/find-workers${query ? `?q=${encodeURIComponent(query)}` : ""}`);
  }

  return (
    <div>
      {/* ---------------- HERO ---------------- */}
      <Section tone="canvas" className="overflow-hidden pb-0 pt-10 sm:pt-14">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-10">
            {/* Text column */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
              <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.04] text-[var(--color-ink)]">
                {t("hero.title1")}
                <br />
                <span className="text-[var(--color-primary-500)]">{t("hero.title2")}</span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--color-ink-soft)] sm:text-lg">{t("hero.sub")}</p>

              <form onSubmit={handleSearch} className="mt-7 flex max-w-md items-center gap-1.5 rounded-full border border-[color:rgba(21,32,30,0.1)] bg-[var(--color-surface)] p-1.5 shadow-[var(--shadow-card)] focus-within:border-[var(--color-primary-400)]">
                <Search className="ml-3 h-4 w-4 shrink-0 text-[var(--color-ink-faint)]" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("hero.search.placeholder")}
                  className="h-11 w-full min-w-0 bg-transparent text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink-faint)]"
                />
                <button type="submit" aria-label="Search" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-ink)] text-white transition-transform hover:scale-105 active:scale-95 focus-ring">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button to="/find-workers" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>{t("hero.cta.find")}</Button>
                <Button to="/become-a-worker" variant="secondary" size="lg">{t("hero.cta.join")}</Button>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[avatars.man1, avatars.woman1, avatars.man2, avatars.woman2].map((a, i) => (
                    <Avatar key={i} src={a} name="Customer" size="sm" ring />
                  ))}
                </div>
                <p className="text-sm text-[var(--color-ink-soft)]">
                  <span className="font-bold text-[var(--color-ink)]">50,000+</span> trust WorkOwn every month
                </p>
              </div>
            </motion.div>

            {/* Bento image grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="grid h-[480px] grid-cols-2 gap-4 sm:h-[520px]"
            >
              <Link to="/find-workers" className="group relative col-span-2 row-span-2 overflow-hidden rounded-[var(--radius-xl)] sm:col-span-1 focus-ring">
                <img src={img.carpenterHero} alt="A skilled WorkOwn carpenter at work in a bright workshop" className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-2 rounded-full border border-white/25 bg-white/15 p-1.5 pl-4 backdrop-blur-md">
                  <span className="text-sm font-semibold text-white">Explore all services</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[var(--color-ink)]">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[var(--color-ink)] backdrop-blur">
                  <BadgeCheck className="h-3.5 w-3.5 text-[var(--color-green-600)]" /> Verified pros
                </div>
              </Link>

              <Link to="/services/plumbing" className="group relative overflow-hidden rounded-[var(--radius-xl)] focus-ring">
                <img src={img.plumber1} alt="A plumber installing a pipe fitting" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <div className="absolute inset-x-3 bottom-3 flex items-center gap-2">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-primary-600)]">
                    <ArrowRight className="h-4 w-4 -rotate-45" />
                  </span>
                  <span className="text-sm font-bold leading-tight text-white">Book a<br />Plumber</span>
                </div>
              </Link>

              <Link to="/services/cleaning" className="group relative overflow-hidden rounded-[var(--radius-xl)] focus-ring">
                <img src={img.cleaner1} alt="A home cleaning professional at work" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <div className="absolute inset-x-3 bottom-3 flex items-center gap-2">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-primary-600)]">
                    <ArrowRight className="h-4 w-4 -rotate-45" />
                  </span>
                  <span className="text-sm font-bold leading-tight text-white">Monthly<br />Home Help</span>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Stat pill band */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-8 rounded-[var(--radius-xl)] bg-[var(--color-navy-700)] px-6 py-8 text-white sm:grid-cols-4 sm:gap-y-6 sm:px-8 sm:py-7 md:mt-12"
          >
            {STATS.map((s) => (
              <div key={s.label} className="text-center sm:border-l sm:border-white/15 sm:first:border-l-0">
                <p className="font-display text-2xl font-bold sm:text-3xl">
                  {s.value}
                  <span className="text-[var(--color-primary-300)]">{s.suffix}</span>
                </p>
                <p className="mt-1 text-xs text-white/65 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------- CATEGORIES ---------------- */}
      <Section tone="canvas" className="pt-10 sm:pt-12 lg:pt-14">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="What do you need?" title={t("section.categories")} sub={t("section.categories.sub")} />
            <Button to="/browse-services" variant="secondary" iconRight={<ArrowRight className="h-4 w-4" />} className="shrink-0">View all</Button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.slice(0, 8).map((c) => (
              <CategoryTile key={c.id} category={c} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <Section tone="dim">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <SectionHeading eyebrow="Simple by design" title={t("section.how")} align="center" sub="Whether you're booking help or offering your skills, WorkOwn keeps it simple." />
            <Tabs tabs={[{ id: "customer", label: "For Customers" }, { id: "worker", label: "For Workers" }]} active={howTab} onChange={(id) => setHowTab(id as "customer" | "worker")} />
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {HOW_IT_WORKS[howTab].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6"
              >
                <span className="font-display text-4xl font-bold text-[var(--color-primary-100)]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-[var(--color-ink)]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{step.desc}</p>
                {i < HOW_IT_WORKS[howTab].length - 1 && (
                  <ChevronRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-[var(--color-ink-faint)] lg:block" />
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------- TOP RATED WORKERS ---------------- */}
      <Section tone="canvas">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Loved by customers" title={t("section.topworkers")} sub="Hand-picked professionals with outstanding reviews near you." />
            <Button to="/find-workers" variant="secondary" iconRight={<ArrowRight className="h-4 w-4" />} className="shrink-0">Browse all workers</Button>
          </div>
          <div className="relative mt-8 sm:mt-10 -mx-5 px-5 sm:mx-0 sm:px-0">
            <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-4 sm:gap-5">
              {topWorkers.map((w) => (
                <div key={w.id} className="w-[260px] shrink-0 snap-start sm:w-[300px] lg:w-[320px]">
                  <WorkerCard worker={w} onCall={handleCall} onChat={handleChat} />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- DOWNLOAD BANNER ---------------- */}
      <Section tone="canvas" className="pt-4 sm:pt-6">
        <Container>
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-primary-500)] px-6 py-10 text-center sm:px-12 sm:py-14 lg:px-16 lg:py-16">
            <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-white/10" />
            <h2 className="relative font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-white">Ready to get started?</h2>
            <p className="relative mx-auto mt-3 max-w-xl text-white/85">Join thousands who book trusted help in minutes, or start earning on your own schedule today.</p>
            <div className="relative mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-7">
              <Button to="/find-workers" variant="dark" size="lg">{t("hero.cta.find")}</Button>
              <Button to="/become-a-worker" variant="ghost-light" size="lg">{t("hero.cta.join")}</Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- LIVE TRACKING TEASER ---------------- */}
      <Section tone="dim">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>Peace of mind</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight text-[var(--color-ink)]">
                Know exactly when your worker will arrive.
              </h2>
              <p className="mt-4 max-w-md text-[var(--color-ink-soft)]">
                Once your booking is confirmed, track your professional in real time on the map — complete with live ETA, route, and an in-app SOS button for extra safety.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  { icon: <LocateFixed className="h-4 w-4" />, text: "Live GPS tracking from confirmation to arrival" },
                  { icon: <Fingerprint className="h-4 w-4" />, text: "Every worker background-checked and ID verified" },
                  { icon: <Lock className="h-4 w-4" />, text: "Calls and chats stay private with masked numbers" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3 text-sm text-[var(--color-ink)]">
                    <IconCircle icon={item.icon} size="sm" /> {item.text}
                  </li>
                ))}
              </ul>
              <Button to="/how-it-works" variant="secondary" className="mt-7" iconRight={<ArrowRight className="h-4 w-4" />}>See how tracking works</Button>
            </div>
            <LiveMap className="h-80 sm:h-96" eta={8} />
          </div>
        </Container>
      </Section>

      {/* ---------------- WORKER STORIES ---------------- */}
      <Section tone="canvas">
        <Container>
          <SectionHeading eyebrow="Real journeys" title={t("section.stories")} sub="Hear directly from professionals who've grown their business with WorkOwn." />
          <div className="no-scrollbar mt-8 flex gap-4 overflow-x-auto pb-4 sm:mt-10 sm:gap-5">
            {[
              { name: "Suresh Kumar", role: "Electrician, Gurugram", img: img.electrician1 },
              { name: "Kavita Devi", role: "House Cleaner, Noida", img: img.cleaner2 },
              { name: "Manoj Verma", role: "Carpenter, Delhi", img: img.carpenter2 },
            ].map((s) => (
              <div key={s.name} className="group relative h-72 w-56 shrink-0 overflow-hidden rounded-[var(--radius-lg)] sm:w-64">
                <img src={s.img} alt={`${s.name}, ${s.role}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <button aria-label={`Play ${s.name}'s story`} className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--color-primary-600)] transition-transform group-hover:scale-110 focus-ring">
                  <PlayCircle className="h-7 w-7" />
                </button>
                <div className="absolute inset-x-3 bottom-3">
                  <p className="font-display text-sm font-bold text-white">{s.name}</p>
                  <p className="text-xs text-white/75">{s.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <Section tone="navy">
        <Container>
          <SectionHeading eyebrow="Trusted nationwide" title={t("section.testimonials")} light sub="Stories from the people who book and the people who work, every day." />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {TESTIMONIALS.slice(0, 3).map((item) => (
              <div key={item.id} className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
                <div className="flex items-center gap-1 text-[var(--color-amber-400)]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < item.rating ? "fill-current" : "opacity-30"}`} />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/85">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <Avatar src={item.avatar} name={item.name} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-white/55">{item.role === "worker" ? "WorkOwn Professional" : "Customer"} · {item.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------- SAFETY ---------------- */}
      <Section tone="canvas">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <Eyebrow>{t("section.safety")}</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight text-[var(--color-ink)]">
                Every worker verified. Every booking protected.
              </h2>
              <p className="mt-4 max-w-md text-[var(--color-ink-soft)]">
                We take trust seriously — from ID checks to encrypted conversations, we've built WorkOwn to protect both sides of every booking.
              </p>
              <Link to="/trust-safety" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary-600)] hover:underline">
                Learn about our safety standards <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <ShieldCheck className="h-5 w-5" />, title: "ID & background checks", desc: "Every worker is verified before going live." },
                { icon: <MapPin className="h-5 w-5" />, title: "Live location sharing", desc: "Know exactly where your worker is, always." },
                { icon: <Lock className="h-5 w-5" />, title: "Masked communication", desc: "Calls & chats never reveal your number." },
                { icon: <BadgeCheck className="h-5 w-5" />, title: "Verified reviews only", desc: "Ratings come from real completed bookings." },
              ].map((f) => (
                <div key={f.title} className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-5">
                  <IconCircle icon={f.icon} size="sm" />
                  <h3 className="mt-3 font-display text-sm font-semibold text-[var(--color-ink)]">{f.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--color-ink-soft)]">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- FAQ PREVIEW ---------------- */}
      <Section tone="dim">
        <Container>
          <div className="mx-auto max-w-2xl">
            <SectionHeading eyebrow="Questions?" title={t("section.faq")} align="center" />
            <div className="mt-10">
              <Accordion items={FAQS.slice(0, 4).map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
            </div>
            <div className="mt-6 text-center">
              <Button to="/how-it-works#faq" variant="secondary" iconRight={<ArrowRight className="h-4 w-4" />}>See all FAQs</Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- APP DOWNLOAD CTA ---------------- */}
      <Section tone="navy" className="overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>Take WorkOwn anywhere</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-tight text-white">
                Book trusted help from your pocket.
              </h2>
              <p className="mt-4 max-w-md text-white/70">
                Get the WorkOwn app for faster bookings, live tracking notifications, and exclusive offers.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-white/70">
                <Rating value={4.8} />
                <span>· 50,000+ downloads</span>
                <span className="text-[10px] uppercase tracking-wide text-white/40">(placeholder)</span>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#" className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 focus-ring">
                  <Apple className="h-4 w-4" /> App Store
                </a>
                <a href="#" className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 focus-ring">
                  <GooglePlay className="h-4 w-4" /> Google Play
                </a>
              </div>
            </div>
            <div className="relative mx-auto flex h-80 w-full max-w-xs items-center justify-center sm:h-96">
              <div className="relative h-full w-[230px] rounded-[2.5rem] border-[6px] border-[var(--color-navy-500)] bg-[var(--color-navy-600)] p-2 shadow-[var(--shadow-lift)] sm:w-[260px]">
                <div className="h-full w-full overflow-hidden rounded-[2rem] bg-[var(--color-canvas)] p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-xs font-bold text-[var(--color-ink)]">Good evening 👋</p>
                    <Badge tone="verified">Live</Badge>
                  </div>
                  <div className="mt-3 h-24 rounded-[var(--radius-md)] bg-[var(--color-primary-500)] p-3">
                    <p className="text-[10px] font-semibold text-white/80">Your plumber is on the way</p>
                    <p className="mt-1 font-display text-lg font-bold text-white">8 min away</p>
                  </div>
                  <div className="mt-3 space-y-2">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex items-center gap-2 rounded-[var(--radius-sm)] border border-[color:rgba(21,32,30,0.08)] p-2">
                        <div className="h-7 w-7 rounded-full bg-[var(--color-primary-100)]" />
                        <div className="flex-1 space-y-1">
                          <div className="h-1.5 w-3/4 rounded-full bg-[color:rgba(21,32,30,0.12)]" />
                          <div className="h-1.5 w-1/2 rounded-full bg-[color:rgba(21,32,30,0.08)]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
