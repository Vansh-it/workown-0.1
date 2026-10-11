import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "lucide-react";
import { cn } from "../../utils/cn";

// A lightweight, dependency-free stylised map used for tracking teasers and the
// live tracking page. Avoids pulling in a full tile-based map library (and the
// network/API-key requirements that come with one) while still conveying the
// real product experience with an animated route, moving worker pin and ETA.
export function LiveMap({ className, eta = 8 }: { className?: string; eta?: number }) {
  const [progress, setProgress] = useState(0.08);
  const [minutesLeft, setMinutesLeft] = useState(eta);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => (p >= 0.92 ? 0.08 : p + 0.02));
    }, 180);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setMinutesLeft((m) => (m <= 1 ? eta : m - 1));
    }, 3000);
    return () => clearInterval(id);
  }, [eta]);

  // Simple cubic path from worker to customer
  const path = "M 40 220 C 120 180, 150 90, 230 100 S 320 180, 360 60";

  return (
    <div className={cn("relative overflow-hidden rounded-[var(--radius-lg)] bg-[#DCE7E2]", className)}>
      <svg viewBox="0 0 400 260" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#C7D6CF" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="260" fill="#E7EFEA" />
        <rect width="400" height="260" fill="url(#grid)" />
        <path d="M0 150 Q 120 110 220 150 T 400 140" stroke="#CBD9D1" strokeWidth="14" fill="none" />
        <path d="M70 0 Q 110 130 90 260" stroke="#CBD9D1" strokeWidth="10" fill="none" />
        <path id="route" d={path} stroke="#0E7C6B" strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" fill="none" />

        {/* Customer pin */}
        <g transform="translate(360, 60)">
          <circle r="16" fill="#0B6558" opacity="0.15">
            <animate attributeName="r" values="12;22;12" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle r="7" fill="#0E7C6B" stroke="white" strokeWidth="2.5" />
        </g>

        {/* Start marker */}
        <g transform="translate(40, 220)">
          <circle r="6" fill="#E76F51" stroke="white" strokeWidth="2" />
        </g>
      </svg>

      {/* Animated worker marker following the path via offsetDistance isn't well supported everywhere,
          so we approximate using a motion div positioned with keyframes along key path points. */}
      <motion.div
        className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-navy-700)] text-white shadow-lg ring-4 ring-white"
        style={{
          left: `${10 + progress * 80}%`,
          top: `${85 - progress * 65}%`,
        }}
        transition={{ duration: 0.18, ease: "linear" }}
      >
        <Navigation className="h-4 w-4 -rotate-45" />
      </motion.div>

      <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[var(--color-ink)] shadow-sm backdrop-blur">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-green-500)]" /> Live
      </div>
      <div className="absolute bottom-3 right-3 rounded-[var(--radius-sm)] bg-white/95 px-3.5 py-2 text-right shadow-sm backdrop-blur">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">Arriving in</p>
        <p className="font-display text-lg font-bold leading-none text-[var(--color-ink)]">{minutesLeft} min</p>
      </div>
    </div>
  );
}
