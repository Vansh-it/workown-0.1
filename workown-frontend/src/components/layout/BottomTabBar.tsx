import { NavLink } from "react-router-dom";
import { Home, Search, CalendarCheck2, MessagesSquare, User } from "lucide-react";
import { useAuth } from "../../lib/appState";
import { useI18n } from "../../lib/i18n";
import { cn } from "../../utils/cn";

export function BottomTabBar() {
  const { isAuthed, role } = useAuth();
  const { t } = useI18n();
  if (!isAuthed) return null;

  const tabs = [
    { to: "/", icon: Home, label: t("tab.home"), end: true },
    { to: "/find-workers", icon: Search, label: t("tab.search"), end: false },
    { to: role === "worker" ? "/dashboard/worker" : "/dashboard", icon: CalendarCheck2, label: t("tab.bookings"), end: false },
    { to: "/messages", icon: MessagesSquare, label: t("tab.messages"), end: false },
    { to: "/settings", icon: User, label: t("tab.profile"), end: false },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[110] flex items-stretch border-t border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg sm:hidden"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0px)" }}
    >
      {tabs.map((tab) => (
        <NavLink
          key={tab.label}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            cn(
              "flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium focus-ring min-h-[56px]",
              isActive ? "text-[var(--color-primary-600)]" : "text-[var(--color-ink-faint)]"
            )
          }
        >
          {({ isActive }) => (
            <>
              <tab.icon className={cn("h-5 w-5", isActive && "fill-[var(--color-primary-100)]")} />
              <span className="leading-tight">{tab.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
