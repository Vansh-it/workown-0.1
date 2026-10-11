import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "../utils/cn";

// ---------------- Auth (demo-only, no real backend) ----------------
export type Role = "customer" | "worker" | null;

interface AuthState {
  isAuthed: boolean;
  role: Role;
  name: string;
  login: (role: Exclude<Role, null>, name?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [role, setRole] = useState<Role>(null);
  const [name, setName] = useState("Aarav Mehta");

  const login = useCallback((r: Exclude<Role, null>, n?: string) => {
    setRole(r);
    setIsAuthed(true);
    if (n) setName(n);
  }, []);
  const logout = useCallback(() => {
    setIsAuthed(false);
    setRole(null);
  }, []);

  const value = useMemo(() => ({ isAuthed, role, name, login, logout }), [isAuthed, role, name, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// ---------------- Toasts ----------------
interface Toast {
  id: number;
  title: string;
  description?: string;
  variant?: "success" | "info" | "warning";
}

interface ToastContextValue {
  toasts: Toast[];
  push: (t: Omit<Toast, "id">) => void;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (t: Omit<Toast, "id">) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { ...t, id }]);
      window.setTimeout(() => dismiss(id), 4200);
    },
    [dismiss]
  );

  const value = useMemo(() => ({ toasts, push, dismiss }), [toasts, push, dismiss]);

  const icons = { success: CheckCircle2, info: Info, warning: AlertTriangle };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[200] flex flex-col items-center gap-2 p-4 sm:items-end sm:bottom-6 sm:right-6 sm:p-0">
        {toasts.map((t) => {
          const Icon = icons[t.variant ?? "info"];
          return (
            <div
              key={t.id}
              role="status"
              className={cn(
                "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-lift)]",
                "animate-[toast-in_.35s_cubic-bezier(.22,1,.36,1)]"
              )}
            >
              <div
                className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  t.variant === "success" && "bg-[color:rgba(30,158,90,0.12)] text-[var(--color-green-600)]",
                  t.variant === "warning" && "bg-[color:rgba(231,111,81,0.12)] text-[var(--color-coral-600)]",
                  (!t.variant || t.variant === "info") && "bg-[var(--color-primary-50)] text-[var(--color-primary-600)]"
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[var(--color-ink)]">{t.title}</p>
                {t.description && <p className="mt-0.5 text-xs text-[var(--color-ink-soft)]">{t.description}</p>}
              </div>
              <button onClick={() => dismiss(t.id)} className="text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] focus-ring rounded">
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
      <style>{`@keyframes toast-in { from { opacity: 0; transform: translateY(8px) scale(.98);} to { opacity:1; transform: translateY(0) scale(1);} }`}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

// ---------------- Global UI (modals / sheets) ----------------
interface UIState {
  authOpen: boolean;
  authTab: "signin" | "signup";
  openAuth: (tab?: "signin" | "signup") => void;
  closeAuth: () => void;
  supportOpen: boolean;
  setSupportOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
}

const UIContext = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const [supportOpen, setSupportOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const openAuth = useCallback((tab: "signin" | "signup" = "signin") => {
    setAuthTab(tab);
    setAuthOpen(true);
  }, []);
  const closeAuth = useCallback(() => setAuthOpen(false), []);

  const value = useMemo(
    () => ({ authOpen, authTab, openAuth, closeAuth, supportOpen, setSupportOpen, searchOpen, setSearchOpen }),
    [authOpen, authTab, openAuth, closeAuth, supportOpen, searchOpen]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
