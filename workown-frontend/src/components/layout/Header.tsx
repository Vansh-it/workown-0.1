import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search, Menu, X, ChevronDown, Phone, MessageCircle, Globe,
  LayoutDashboard, MessagesSquare, LogOut, CalendarCheck2, HelpCircle,
} from "lucide-react";
import { Button } from "../ui/Button";
import { useAuth, useUI } from "../../lib/appState";
import { useI18n } from "../../lib/i18n";
import { Avatar } from "../ui/Primitives";
import { SearchSheet } from "./SearchSheet";
import { cn } from "../../utils/cn";

const navLinks = [
  { to: "/", key: "nav.home" as const },
  { to: "/browse-services", key: "nav.browse" as const },
  { to: "/how-it-works", key: "nav.how" as const },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isAuthed, role, name, logout } = useAuth();
  const { openAuth } = useUI();
  const { lang, setLang, t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setHelpOpen(false);
        setUserMenuOpen(false);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setHelpOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[100] transition-all duration-300",
          scrolled
            ? "border-b border-[color:rgba(21,32,30,0.08)] bg-[var(--color-canvas)]/90 backdrop-blur-lg shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center gap-3 px-4 sm:h-[72px] sm:gap-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 rounded-md focus-ring"
            aria-label="WorkOwn home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[var(--color-primary-500)] text-white sm:h-9 sm:w-9">
              <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21V11.6L16 8l7 3.6V21l-7 3.4L9 21Z" transform="translate(-5 -4)" />
                <path d="M7.5 11.5l2.6 2.6 4.4-4.9" />
              </svg>
            </span>
            <span className="font-display text-base font-bold tracking-tight text-[var(--color-ink)] sm:text-lg">
              WorkOwn
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-3.5 py-2 text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors focus-ring whitespace-nowrap inline-flex items-center",
                    isActive
                      ? "text-[var(--color-primary-600)]"
                      : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                  )
                }
              >
                <span className="whitespace-nowrap">{t(link.key)}</span>
              </NavLink>
            ))}
          </nav>

          {/* Desktop search bar */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden flex-1 items-center gap-2 rounded-full border border-[color:rgba(21,32,30,0.12)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-ink-faint)] transition-colors hover:border-[var(--color-primary-300)] focus-ring md:flex md:max-w-[240px] lg:max-w-[280px]"
          >
            <Search className="h-4 w-4 shrink-0" />
            <span className="truncate">{t("nav.search")}</span>
            <kbd className="ml-auto hidden rounded-md border border-[color:rgba(21,32,30,0.15)] px-1.5 py-0.5 text-[10px] font-semibold lg:inline">
              ⌘K
            </kbd>
          </button>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            {/* Mobile search icon */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-ink-soft)] hover:bg-[color:rgba(21,32,30,0.06)] focus-ring md:hidden"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Language toggle – always visible on sm+ */}
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              aria-label="Switch language"
              className="hidden items-center gap-1 rounded-full px-2.5 py-2 text-xs font-bold text-[var(--color-ink-soft)] hover:bg-[color:rgba(21,32,30,0.06)] focus-ring sm:flex"
            >
              <Globe className="h-4 w-4" /> {lang === "en" ? "EN" : "हिं"}
            </button>

            {/* Become a Worker – desktop removed as requested */}

            {/* Help dropdown – desktop */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setHelpOpen((v) => !v)}
                onBlur={() => setTimeout(() => setHelpOpen(false), 180)}
                className="flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-semibold text-[var(--color-ink-soft)] hover:bg-[color:rgba(21,32,30,0.06)] focus-ring"
                aria-expanded={helpOpen}
              >
                {t("nav.help")} <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", helpOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {helpOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-1.5 shadow-[var(--shadow-lift)]"
                  >
                    <Link
                      to="/support?tab=call"
                      className="flex items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium hover:bg-[var(--color-canvas-dim)]"
                    >
                      <Phone className="h-4 w-4 text-[var(--color-primary-600)]" /> {t("nav.callus")}
                    </Link>
                    <Link
                      to="/support?tab=chat"
                      className="flex items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium hover:bg-[var(--color-canvas-dim)]"
                    >
                      <MessageCircle className="h-4 w-4 text-[var(--color-primary-600)]" /> {t("nav.chatnow")}
                    </Link>
                    <Link
                      to="/support"
                      className="flex items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium hover:bg-[var(--color-canvas-dim)]"
                    >
                      <HelpCircle className="h-4 w-4 text-[var(--color-primary-600)]" /> {t("nav.helpCenter")}
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auth / User menu – desktop */}
            {!isAuthed ? (
              <div className="hidden items-center gap-2 lg:flex">
                <Button variant="ghost" size="sm" onClick={() => openAuth("signin")}>
                  {t("nav.signin")}
                </Button>
                <Button variant="dark" size="sm" onClick={() => openAuth("signup")}>
                  {t("nav.getstarted")}
                </Button>
              </div>
            ) : (
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  onBlur={() => setTimeout(() => setUserMenuOpen(false), 180)}
                  className="flex items-center gap-2 rounded-full border border-[color:rgba(21,32,30,0.1)] py-1 pl-1 pr-3 hover:bg-[var(--color-canvas-dim)] focus-ring"
                  aria-expanded={userMenuOpen}
                >
                  <Avatar name={name} size="sm" />
                  <span className="text-sm font-semibold">{name.split(" ")[0]}</span>
                  <ChevronDown className={cn("h-3.5 w-3.5 text-[var(--color-ink-faint)] transition-transform", userMenuOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-1.5 shadow-[var(--shadow-lift)]"
                    >
                      <Link
                        to={role === "worker" ? "/dashboard/worker" : "/dashboard"}
                        className="flex items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium hover:bg-[var(--color-canvas-dim)]"
                      >
                        <LayoutDashboard className="h-4 w-4 text-[var(--color-primary-600)]" /> {t("nav.dashboard")}
                      </Link>
                      <Link
                        to="/messages"
                        className="flex items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium hover:bg-[var(--color-canvas-dim)]"
                      >
                        <MessagesSquare className="h-4 w-4 text-[var(--color-primary-600)]" /> {t("nav.messages")}
                      </Link>
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium hover:bg-[var(--color-canvas-dim)]"
                      >
                        <CalendarCheck2 className="h-4 w-4 text-[var(--color-primary-600)]" /> {t("nav.bookings")}
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                        className="flex w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2.5 text-left text-sm font-medium text-[var(--color-coral-600)] hover:bg-[var(--color-coral-50)]"
                      >
                        <LogOut className="h-4 w-4" /> {t("nav.logout")}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[color:rgba(21,32,30,0.06)] focus-ring lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <SearchSheet open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[160] flex flex-col bg-[var(--color-canvas)] lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-4 sm:h-[72px] sm:px-5">
              <span className="font-display text-lg font-bold">WorkOwn</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[color:rgba(21,32,30,0.06)] focus-ring"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 pb-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-[color:rgba(21,32,30,0.08)] py-4 font-display text-2xl font-semibold text-[var(--color-ink)]"
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
              {/* Become a worker removed from mobile menu */}
              <Link
                to="/support"
                onClick={() => setMobileOpen(false)}
                className="block border-b border-[color:rgba(21,32,30,0.08)] py-4 font-display text-2xl font-semibold text-[var(--color-ink)]"
              >
                {t("nav.help")}
              </Link>
              <Link
                to="/find-workers"
                onClick={() => setMobileOpen(false)}
                className="block border-b border-[color:rgba(21,32,30,0.08)] py-4 font-display text-2xl font-semibold text-[var(--color-ink)]"
              >
                {t("nav.findWorkers")}
              </Link>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setLang(lang === "en" ? "hi" : "en")}
                  className="flex items-center gap-1.5 rounded-full border border-[color:rgba(21,32,30,0.12)] px-4 py-2.5 text-sm font-bold"
                >
                  <Globe className="h-4 w-4" /> {lang === "en" ? "English" : "हिंदी"}
                </button>
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-8">
                {!isAuthed ? (
                  <>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full"
                      onClick={() => {
                        setMobileOpen(false);
                        openAuth("signin");
                      }}
                    >
                      {t("nav.signin")}
                    </Button>
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={() => {
                        setMobileOpen(false);
                        openAuth("signup");
                      }}
                    >
                      {t("nav.getstarted")}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full"
                      to={role === "worker" ? "/dashboard/worker" : "/dashboard"}
                      onClick={() => setMobileOpen(false)}
                    >
                      {t("nav.dashboard")}
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full"
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                        navigate("/");
                      }}
                    >
                      {t("nav.logout")}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
