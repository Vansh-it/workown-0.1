import type { ReactNode, HTMLAttributes } from "react";
import { Star, BadgeCheck } from "lucide-react";
import { cn } from "../../utils/cn";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({
  className,
  children,
  id,
  tone = "canvas",
}: {
  className?: string;
  children: ReactNode;
  id?: string;
  tone?: "canvas" | "surface" | "navy" | "dim";
}) {
  const toneClass = {
    canvas: "bg-[var(--color-canvas)]",
    surface: "bg-[var(--color-surface)]",
    navy: "bg-[var(--color-navy-700)] text-white",
    dim: "bg-[var(--color-canvas-dim)]",
  }[tone];
  return (
    <section id={id} className={cn("py-12 sm:py-16 lg:py-20", toneClass, className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[color:rgba(21,32,30,0.1)] bg-[var(--color-surface)] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-primary-600)]",
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
  light,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <h2 className={cn("font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.08]", light ? "text-white" : "text-[var(--color-ink)]")}>
        {title}
      </h2>
      {sub && <p className={cn("mt-4 text-[15px] sm:text-base leading-relaxed", light ? "text-white/70" : "text-[var(--color-ink-soft)]")}>{sub}</p>}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "verified" | "amber" | "coral" | "primary" | "navy";
  className?: string;
}) {
  const tones = {
    neutral: "bg-[color:rgba(21,32,30,0.06)] text-[var(--color-ink-soft)]",
    verified: "bg-[color:rgba(30,158,90,0.12)] text-[var(--color-green-600)]",
    amber: "bg-[color:rgba(242,163,15,0.14)] text-[var(--color-amber-600)]",
    coral: "bg-[var(--color-coral-50)] text-[var(--color-coral-600)]",
    primary: "bg-[var(--color-primary-50)] text-[var(--color-primary-600)]",
    navy: "bg-[color:rgba(38,70,83,0.1)] text-[var(--color-navy-500)]",
  };
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold", tones[tone], className)}>
      {children}
    </span>
  );
}

export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <Badge tone="verified" className={className}>
      <BadgeCheck className="h-3.5 w-3.5" /> Verified
    </Badge>
  );
}

export function Rating({ value, count, size = "sm" }: { value: number; count?: number; size?: "sm" | "md" }) {
  return (
    <span className={cn("inline-flex items-center gap-1 font-semibold text-[var(--color-ink)]", size === "md" ? "text-sm" : "text-[13px]")}>
      <Star className={cn("fill-[var(--color-amber-500)] text-[var(--color-amber-500)]", size === "md" ? "h-4 w-4" : "h-3.5 w-3.5")} />
      {value.toFixed(1)}
      {count !== undefined && <span className="font-normal text-[var(--color-ink-faint)]">({count.toLocaleString("en-IN")})</span>}
    </span>
  );
}

export function Chip({
  children,
  active,
  onClick,
  className,
  icon,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-2 text-sm font-medium transition-colors focus-ring",
        active
          ? "border-[var(--color-primary-500)] bg-[var(--color-primary-500)] text-white"
          : "border-[color:rgba(21,32,30,0.12)] bg-[var(--color-surface)] text-[var(--color-ink-soft)] hover:border-[var(--color-primary-300)] hover:text-[var(--color-ink)]",
        className
      )}
    >
      {icon}
      {children}
    </button>
  );
}

export function IconCircle({
  icon,
  tone = "primary",
  size = "md",
  className,
}: {
  icon: ReactNode;
  tone?: "primary" | "coral" | "navy" | "amber" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const tones = {
    primary: "bg-[var(--color-primary-50)] text-[var(--color-primary-600)]",
    coral: "bg-[var(--color-coral-50)] text-[var(--color-coral-600)]",
    navy: "bg-[color:rgba(38,70,83,0.1)] text-[var(--color-navy-500)]",
    amber: "bg-[color:rgba(242,163,15,0.14)] text-[var(--color-amber-600)]",
    white: "bg-white/15 text-white",
  };
  const sizes = { sm: "h-9 w-9", md: "h-12 w-12", lg: "h-16 w-16" };
  return <div className={cn("flex shrink-0 items-center justify-center rounded-full", tones[tone], sizes[size], className)}>{icon}</div>;
}

export function Avatar({
  src,
  name,
  size = "md",
  className,
  ring,
}: {
  src?: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  ring?: boolean;
}) {
  const sizes = { xs: "h-7 w-7 text-[10px]", sm: "h-9 w-9 text-xs", md: "h-12 w-12 text-sm", lg: "h-16 w-16 text-base", xl: "h-24 w-24 text-xl" };
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-primary-100)] font-bold text-[var(--color-primary-700)]",
        ring && "ring-4 ring-white",
        sizes[size],
        className
      )}
    >
      {src ? <img src={src} alt={name} className="h-full w-full object-cover" loading="lazy" /> : initials}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-[var(--radius-md)] bg-[color:rgba(21,32,30,0.08)]", className)} />;
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-[color:rgba(21,32,30,0.08)]", className)} />;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-[var(--radius-xl)] border border-dashed border-[color:rgba(21,32,30,0.15)] bg-[var(--color-surface)] px-8 py-16 text-center">
      <IconCircle icon={icon} size="lg" />
      <div className="max-w-sm space-y-1.5">
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <p className="text-sm text-[var(--color-ink-soft)]">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function Card({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[color:rgba(21,32,30,0.07)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
