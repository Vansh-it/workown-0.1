import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: "right" | "bottom-sheet" | "center";
  className?: string;
  title?: string;
}

export function Sheet({ open, onClose, children, side = "center", className, title }: SheetProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[150] flex" role="dialog" aria-modal="true" aria-label={title}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-[var(--color-navy-900)]/50 backdrop-blur-[2px]"
          />
          {side === "center" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative m-auto max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-[var(--radius-xl)] bg-[var(--color-surface)] p-0 shadow-[var(--shadow-lift)]",
                className
              )}
            >
              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[color:rgba(21,32,30,0.06)] text-[var(--color-ink)] hover:bg-[color:rgba(21,32,30,0.12)] focus-ring"
              >
                <X className="h-4 w-4" />
              </button>
              {children}
            </motion.div>
          )}
          {side === "right" && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className={cn("relative ml-auto flex h-full w-full max-w-md flex-col overflow-y-auto bg-[var(--color-surface)] shadow-[var(--shadow-lift)]", className)}
            >
              <div className="flex items-center justify-between border-b border-[color:rgba(21,32,30,0.08)] px-5 py-4">
                <h3 className="font-display text-lg font-semibold">{title}</h3>
                <button onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[color:rgba(21,32,30,0.06)] focus-ring">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">{children}</div>
            </motion.div>
          )}
          {side === "bottom-sheet" && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative mt-auto max-h-[88vh] w-full overflow-y-auto rounded-t-[var(--radius-xl)] bg-[var(--color-surface)] pb-[env(safe-area-inset-bottom)] shadow-[var(--shadow-lift)]",
                className
              )}
            >
              <div className="sticky top-0 z-10 flex justify-center bg-[var(--color-surface)] pt-3">
                <div className="h-1.5 w-12 rounded-full bg-[color:rgba(21,32,30,0.15)]" />
              </div>
              {title && (
                <div className="flex items-center justify-between px-5 pb-2 pt-2">
                  <h3 className="font-display text-lg font-semibold">{title}</h3>
                  <button onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[color:rgba(21,32,30,0.06)] focus-ring">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              {children}
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
