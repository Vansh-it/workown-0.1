import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 ease-[cubic-bezier(.22,1,.36,1)] focus-ring disabled:opacity-50 disabled:pointer-events-none select-none";

const variants = {
  primary:
    "bg-[var(--color-primary-500)] text-white shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_6px_16px_-6px_rgba(11,110,100,0.55)] hover:bg-[var(--color-primary-600)] active:bg-[var(--color-primary-700)] active:scale-[0.98]",
  secondary:
    "bg-[var(--color-surface)] text-[var(--color-ink)] border border-[color:rgba(21,32,30,0.12)] hover:border-[color:rgba(21,32,30,0.24)] hover:bg-[var(--color-canvas-dim)] active:scale-[0.98]",
  coral:
    "bg-[var(--color-coral-500)] text-white shadow-[0_6px_16px_-6px_rgba(231,111,81,0.6)] hover:bg-[var(--color-coral-600)] active:scale-[0.98]",
  dark: "bg-[var(--color-navy-700)] text-white hover:bg-[var(--color-navy-800)] active:scale-[0.98]",
  ghost: "bg-transparent text-[var(--color-ink)] hover:bg-[color:rgba(21,32,30,0.06)] active:scale-[0.98]",
  "ghost-light": "bg-white/10 text-white border border-white/25 backdrop-blur-md hover:bg-white/20 active:scale-[0.98]",
  outline:
    "bg-transparent text-[var(--color-primary-600)] border border-[var(--color-primary-300)] hover:bg-[var(--color-primary-50)] active:scale-[0.98]",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
  icon: "h-11 w-11",
};

interface CommonProps {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined };
type ButtonAsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; href?: undefined };
type ButtonAsAnchor = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: undefined };

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, icon, iconRight, children, className, ...props }, ref) => {
    const classes = cn(base, variants[variant], sizes[size], "text-[length:inherit]", className);

    if ("to" in props && props.to) {
      const { to, ...rest } = props as ButtonAsLink;
      return (
        <Link ref={ref as never} to={to} className={classes} {...rest}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
          {children}
          {iconRight}
        </Link>
      );
    }
    if ("href" in props && props.href) {
      const { href, ...rest } = props as ButtonAsAnchor;
      return (
        <a ref={ref as never} href={href} className={classes} {...rest}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
          {children}
          {iconRight}
        </a>
      );
    }
    const { ...rest } = props as ButtonAsButton;
    return (
      <button ref={ref as never} className={classes} disabled={loading || rest.disabled} {...rest}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
        {children}
        {iconRight}
      </button>
    );
  }
);
Button.displayName = "Button";
