import { useNavigate } from "react-router-dom";
import { Headset, Phone, MessageCircle, LifeBuoy, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUI } from "../../lib/appState";
import { useAuth } from "../../lib/appState";

export function SupportLauncher() {
  const { supportOpen, setSupportOpen } = useUI();
  const navigate = useNavigate();
  const { isAuthed } = useAuth();
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div className={`fixed right-4 z-[120] sm:right-6 ${isAuthed ? "bottom-24 sm:bottom-6" : "bottom-6"}`}>
        <AnimatePresence>
          {supportOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-16 right-0 w-72 overflow-hidden rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] shadow-[var(--shadow-lift)]"
            >
              <div className="flex items-center justify-between bg-[var(--color-navy-700)] px-4 py-3.5 text-white">
                <p className="font-display text-sm font-semibold">Need a hand?</p>
                <button onClick={() => setSupportOpen(false)} aria-label="Close" className="rounded-full p-1 hover:bg-white/10">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-col p-2">
                <button
                  onClick={() => { setSupportOpen(false); navigate("/support?tab=call"); }}
                  className="flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-3 text-left text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-canvas-dim)] focus-ring"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-600)]"><Phone className="h-4 w-4" /></span>
                  Call Us — 1800-212-4000
                </button>
                <button
                  onClick={() => { setSupportOpen(false); navigate("/support?tab=chat"); }}
                  className="flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-3 text-left text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-canvas-dim)] focus-ring"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-coral-50)] text-[var(--color-coral-600)]"><MessageCircle className="h-4 w-4" /></span>
                  Chat Now
                </button>
                <button
                  onClick={() => { setSupportOpen(false); navigate("/support"); }}
                  className="flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-3 text-left text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-canvas-dim)] focus-ring"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:rgba(38,70,83,0.1)] text-[var(--color-navy-500)]"><LifeBuoy className="h-4 w-4" /></span>
                  Help Center
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setSupportOpen(!supportOpen)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label="Open support menu"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-navy-700)] text-white shadow-[var(--shadow-lift)] transition-transform hover:scale-105 active:scale-95 focus-ring"
        >
          {supportOpen ? <X className="h-5 w-5" /> : <Headset className="h-5 w-5" />}
        </button>
        <AnimatePresence>
          {hovered && !supportOpen && (
            <motion.span
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[var(--color-ink)] px-3 py-1.5 text-xs font-medium text-white"
            >
              Need help?
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
