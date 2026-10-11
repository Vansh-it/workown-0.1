import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Phone, MessageCircle, Mail, Search, Send, ShieldCheck, LifeBuoy, HelpCircle, FileText, Lock } from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow } from "../components/ui/Primitives";
import { Button } from "../components/ui/Button";
import { Tabs } from "../components/ui/Tabs";
import { Accordion } from "../components/ui/Accordion";
import { FAQS } from "../lib/data";
import { useToast } from "../lib/appState";

const TOPICS = ["Booking issue", "Payment & refunds", "Account & profile", "Safety concern", "Something else"];
const QUICK_REPLIES = ["My worker hasn't arrived", "I need a refund", "How does pricing work?", "I want to report an issue"];

export default function Support() {
  const [params] = useSearchParams();
  const initialTab = params.get("tab") === "call" ? "call" : params.get("tab") === "chat" ? "chat" : "help";
  const [tab, setTab] = useState(initialTab);
  const { push } = useToast();

  const categories = Array.from(new Set(FAQS.map((f) => f.category)));
  const [query, setQuery] = useState("");
  const filteredFaqs = FAQS.filter((f) => f.question.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <Section tone="dim" className="pb-8 pt-12">
        <Container>
          <Eyebrow>We're here to help</Eyebrow>
          <h1 className="mt-5 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-[var(--color-ink)]">Support Center</h1>
          <p className="mt-3 max-w-xl text-[var(--color-ink-soft)]">Search our help articles, chat with our team, or give us a call — 7 days a week.</p>
          <div className="mt-6">
            <Tabs tabs={[{ id: "help", label: "Help Center" }, { id: "chat", label: "Chat Now" }, { id: "call", label: "Call Us" }]} active={tab} onChange={setTab} />
          </div>
        </Container>
      </Section>

      {tab === "help" && (
        <Section tone="canvas">
          <Container>
            <div className="mx-auto max-w-xl">
              <div className="flex items-center gap-3 rounded-full border border-[color:rgba(21,32,30,0.1)] bg-[var(--color-surface)] px-5 py-3.5 shadow-[var(--shadow-card)] focus-within:border-[var(--color-primary-400)]">
                <Search className="h-4 w-4 text-[var(--color-ink-faint)]" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search help articles…" className="h-6 w-full bg-transparent text-sm outline-none placeholder:text-[var(--color-ink-faint)]" />
              </div>
            </div>
            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-8">
              {categories.map((cat) => {
                const items = filteredFaqs.filter((f) => f.category === cat);
                if (!items.length) return null;
                return (
                  <div key={cat}>
                    <h2 className="font-display text-sm font-bold uppercase tracking-wide text-[var(--color-ink-faint)]">{cat}</h2>
                    <div className="mt-3">
                      <Accordion items={items.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
                    </div>
                  </div>
                );
              })}
              {filteredFaqs.length === 0 && <p className="text-center text-sm text-[var(--color-ink-soft)]">No articles match “{query}”.</p>}
            </div>
            <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3" id="contact">
              {[
                { icon: <LifeBuoy className="h-5 w-5" />, title: "Safety Information", desc: "Learn how we vet workers and protect every booking.", to: "/trust-safety" },
                { icon: <FileText className="h-5 w-5" />, title: "Legal & Policies", desc: "Privacy, Terms and Refund & Cancellation policy.", to: "/legal/privacy" },
                { icon: <HelpCircle className="h-5 w-5" />, title: "Still stuck?", desc: "Switch to Chat Now or Call Us above for live help.", to: "#" },
              ].map((c) => (
                <a key={c.title} href={c.to} className="rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-5 transition-shadow hover:shadow-[var(--shadow-card)]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-600)]">{c.icon}</span>
                  <h3 className="mt-3 font-display text-sm font-semibold text-[var(--color-ink)]">{c.title}</h3>
                  <p className="mt-1 text-xs text-[var(--color-ink-soft)]">{c.desc}</p>
                </a>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {tab === "chat" && <SupportChat onSent={() => push({ title: "Message sent", variant: "success" })} />}

      {tab === "call" && (
        <Section tone="canvas">
          <Container className="mx-auto max-w-xl text-center">
            <div className="rounded-[var(--radius-xl)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-10">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-600)]"><Phone className="h-7 w-7" /></span>
              <h2 className="mt-5 font-display text-xl font-semibold text-[var(--color-ink)]">Call our support line</h2>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">Available 7 days a week, 7 AM – 11 PM IST</p>
              <p className="mt-4 font-display text-3xl font-bold text-[var(--color-primary-600)]">1800-212-4000</p>
              <Button href="tel:18002124000" className="mt-6" size="lg">Call now</Button>
              <div className="mt-8 grid grid-cols-1 gap-3 text-left sm:grid-cols-2">
                <a href="mailto:support@workown.app" className="flex items-center gap-2.5 rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.1)] p-3.5 text-sm text-[var(--color-ink)] hover:border-[var(--color-primary-400)]">
                  <Mail className="h-4 w-4 text-[var(--color-primary-500)]" /> support@workown.app
                </a>
                <button onClick={() => setTab("chat")} className="flex items-center gap-2.5 rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.1)] p-3.5 text-sm text-[var(--color-ink)] hover:border-[var(--color-primary-400)]">
                  <MessageCircle className="h-4 w-4 text-[var(--color-primary-500)]" /> Switch to chat instead
                </button>
              </div>
            </div>
          </Container>
        </Section>
      )}
    </div>
  );
}

function SupportChat({ onSent }: { onSent: () => void }) {
  const [topic, setTopic] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ from: "me" | "agent"; text: string }[]>([
    { from: "agent", text: "Hi! I'm WorkOwn Support. What can I help you with today?" },
  ]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "me", text }]);
    setDraft("");
    onSent();
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "agent", text: "Thanks for the details! A support specialist will follow up shortly. In the meantime, you can also check our Help Center for instant answers." }]);
    }, 1400);
  }

  return (
    <Section tone="canvas">
      <Container className="mx-auto max-w-2xl">
        {!topic ? (
          <div>
            <SectionHeading eyebrow="Chat Now" title="What do you need help with?" align="center" />
            <div className="mx-auto mt-8 grid max-w-md grid-cols-1 gap-3">
              {TOPICS.map((t) => (
                <button key={t} onClick={() => { setTopic(t); setMessages((m) => [...m, { from: "agent", text: `Got it — let's talk about "${t}". Please describe what's going on.` }]); }} className="rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.1)] bg-[var(--color-surface)] p-4 text-left text-sm font-medium text-[var(--color-ink)] hover:border-[var(--color-primary-400)]">
                  {t}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3 border-b border-[color:rgba(21,32,30,0.08)] bg-[var(--color-navy-700)] p-4 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15"><LifeBuoy className="h-4 w-4" /></span>
              <div>
                <p className="text-sm font-semibold">WorkOwn Support</p>
                <p className="flex items-center gap-1 text-[11px] text-white/60"><Lock className="h-3 w-3" /> Secure, encrypted chat</p>
              </div>
            </div>
            <div ref={scrollRef} className="flex h-80 flex-col gap-3 overflow-y-auto bg-[var(--color-canvas-dim)] p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-[var(--radius-md)] px-4 py-2.5 text-sm ${m.from === "me" ? "rounded-br-sm bg-[var(--color-primary-500)] text-white" : "rounded-bl-sm bg-[var(--color-surface)] text-[var(--color-ink)]"}`}>{m.text}</div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-[var(--radius-md)] rounded-bl-sm bg-[var(--color-surface)] px-4 py-3">
                    {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-ink-faint)]" style={{ animationDelay: `${i * 0.12}s` }} />)}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 border-t border-[color:rgba(21,32,30,0.08)] p-3">
              {QUICK_REPLIES.map((q) => (
                <button key={q} onClick={() => send(q)} className="rounded-full border border-[color:rgba(21,32,30,0.12)] px-3 py-1.5 text-xs font-medium text-[var(--color-ink-soft)] hover:border-[var(--color-primary-400)]">{q}</button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(draft); }} className="flex items-center gap-2 border-t border-[color:rgba(21,32,30,0.08)] p-3">
              <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type your message…" className="h-10 flex-1 rounded-full bg-[var(--color-canvas-dim)] px-4 text-sm outline-none" />
              <button type="submit" aria-label="Send" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-600)]"><Send className="h-4 w-4" /></button>
            </form>
          </div>
        )}
        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-[var(--color-ink-faint)]"><ShieldCheck className="h-3.5 w-3.5" /> Your conversations are encrypted and saved securely to your account.</p>
      </Container>
    </Section>
  );
}
