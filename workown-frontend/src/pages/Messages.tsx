import { useState } from "react";
import { Search, Phone, Info, Paperclip, Send, ShieldCheck, ArrowLeft } from "lucide-react";
import { Container, Section, Avatar } from "../components/ui/Primitives";
import { THREADS, MESSAGES } from "../lib/data";
import { cn } from "../utils/cn";

export default function Messages() {
  const [activeId, setActiveId] = useState(THREADS[0].id);
  const [draft, setDraft] = useState("");
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false);
  const active = THREADS.find((t) => t.id === activeId)!;
  const messages = MESSAGES[activeId] ?? [];

  return (
    <Section tone="canvas" className="py-6 sm:py-10">
      <Container>
        <h1 className="mb-6 font-display text-2xl font-bold text-[var(--color-ink)] sm:text-3xl">Messages</h1>
        <div className="grid h-[620px] grid-cols-1 overflow-hidden rounded-[var(--radius-xl)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] sm:grid-cols-[320px_1fr]">
          {/* Thread list */}
          <div className={cn("flex flex-col border-r border-[color:rgba(21,32,30,0.08)]", mobileThreadOpen && "hidden sm:flex")}>
            <div className="flex items-center gap-2 border-b border-[color:rgba(21,32,30,0.08)] p-4">
              <Search className="h-4 w-4 text-[var(--color-ink-faint)]" />
              <input placeholder="Search messages" className="h-6 w-full bg-transparent text-sm outline-none placeholder:text-[var(--color-ink-faint)]" />
            </div>
            <div className="flex-1 overflow-y-auto">
              {THREADS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setActiveId(t.id); setMobileThreadOpen(true); }}
                  className={cn("flex w-full items-center gap-3 border-b border-[color:rgba(21,32,30,0.06)] p-4 text-left transition-colors hover:bg-[var(--color-canvas-dim)]", activeId === t.id && "bg-[var(--color-primary-50)]")}
                >
                  <div className="relative shrink-0">
                    <Avatar src={t.avatar} name={t.name} />
                    {t.online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[var(--color-green-500)] ring-2 ring-[var(--color-surface)]" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-[var(--color-ink)]">{t.name}</p>
                      <span className="shrink-0 text-[11px] text-[var(--color-ink-faint)]">{t.lastTime}</span>
                    </div>
                    <p className="truncate text-xs text-[var(--color-ink-soft)]">{t.lastMessage}</p>
                  </div>
                  {t.unread > 0 && <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-coral-500)] text-[10px] font-bold text-white">{t.unread}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Thread view */}
          <div className={cn("flex flex-col", !mobileThreadOpen && "hidden sm:flex")}>
            <div className="flex items-center gap-3 border-b border-[color:rgba(21,32,30,0.08)] p-4">
              <button onClick={() => setMobileThreadOpen(false)} className="text-[var(--color-ink-soft)] sm:hidden"><ArrowLeft className="h-5 w-5" /></button>
              <Avatar src={active.avatar} name={active.name} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[var(--color-ink)]">{active.name}</p>
                <p className="text-xs text-[var(--color-ink-faint)]">{active.role}{active.online ? " · Online" : ""}</p>
              </div>
              <button aria-label="Call" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[var(--color-canvas-dim)]"><Phone className="h-4 w-4 text-[var(--color-ink-soft)]" /></button>
              <button aria-label="Info" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[var(--color-canvas-dim)]"><Info className="h-4 w-4 text-[var(--color-ink-soft)]" /></button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-[var(--color-canvas-dim)] p-4">
              <div className="mx-auto flex max-w-xs items-center gap-1.5 rounded-full bg-[var(--color-surface)] px-3 py-1.5 text-[10px] font-medium text-[var(--color-ink-faint)]">
                <ShieldCheck className="h-3 w-3" /> Messages are encrypted and numbers stay private
              </div>
              {messages.length === 0 ? (
                <p className="pt-10 text-center text-sm text-[var(--color-ink-faint)]">No messages yet. Say hello!</p>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
                    <div className={cn("max-w-[75%] rounded-[var(--radius-md)] px-4 py-2.5 text-sm shadow-sm", m.from === "me" ? "rounded-br-sm bg-[var(--color-primary-500)] text-white" : "rounded-bl-sm bg-[var(--color-surface)] text-[var(--color-ink)]")}>
                      {m.text}
                      <p className={cn("mt-1 text-[10px]", m.from === "me" ? "text-white/70" : "text-[var(--color-ink-faint)]")}>{m.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); setDraft(""); }}
              className="flex items-center gap-2 border-t border-[color:rgba(21,32,30,0.08)] p-3"
            >
              <button type="button" aria-label="Attach file" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[var(--color-ink-soft)] hover:bg-[var(--color-canvas-dim)]"><Paperclip className="h-4 w-4" /></button>
              <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a message…" className="h-10 flex-1 rounded-full bg-[var(--color-canvas-dim)] px-4 text-sm outline-none" />
              <button type="submit" aria-label="Send message" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-600)]"><Send className="h-4 w-4" /></button>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
}
