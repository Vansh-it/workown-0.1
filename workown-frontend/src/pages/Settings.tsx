import { useState } from "react";
import { User, MapPin, CreditCard, Bell, Globe, Shield, Moon, Sun, Plus, Trash2 } from "lucide-react";
import { Container, Section, Avatar, Divider } from "../components/ui/Primitives";
import { Button } from "../components/ui/Button";
import { useAuth, useToast } from "../lib/appState";
import { useI18n } from "../lib/i18n";

const ADDRESSES = [
  { id: "a1", label: "Home", detail: "A-204, Sunrise Apartments, Sector 50, Noida, UP 201301" },
  { id: "a2", label: "Office", detail: "4th Floor, Tech Park One, Sector 62, Noida, UP 201309" },
];

export default function Settings() {
  const { name } = useAuth();
  const { push } = useToast();
  const { lang, setLang } = useI18n();
  const [tab, setTab] = useState("profile");
  const [dark, setDark] = useState(document.documentElement.classList.contains("dark"));

  function toggleDark() {
    document.documentElement.classList.toggle("dark");
    setDark((d) => !d);
  }

  return (
    <Section tone="canvas" className="py-8 sm:py-10">
      <Container>
        <h1 className="font-display text-2xl font-bold text-[var(--color-ink)] sm:text-3xl">Settings</h1>
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
          <div className="flex gap-1 overflow-x-auto lg:flex-col">
            {[
              { id: "profile", label: "Profile", icon: User },
              { id: "addresses", label: "Addresses", icon: MapPin },
              { id: "payments", label: "Payment Methods", icon: CreditCard },
              { id: "notifications", label: "Notification Preferences", icon: Bell },
              { id: "privacy", label: "Privacy & Security", icon: Shield },
              { id: "app", label: "App Preferences", icon: Globe },
            ].map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-[var(--radius-sm)] px-3.5 py-2.5 text-left text-sm font-medium transition-colors ${tab === t.id ? "bg-[var(--color-primary-50)] text-[var(--color-primary-700)]" : "text-[var(--color-ink-soft)] hover:bg-[var(--color-canvas-dim)]"}`}>
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </div>

          <div className="rounded-[var(--radius-xl)] border border-[color:rgba(21,32,30,0.08)] bg-[var(--color-surface)] p-6 sm:p-8">
            {tab === "profile" && (
              <div>
                <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Profile information</h2>
                <div className="mt-5 flex items-center gap-4">
                  <Avatar name={name} size="xl" />
                  <Button variant="secondary" size="sm">Change photo</Button>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="block"><span className="mb-1.5 block text-sm font-medium">Full name</span><input defaultValue={name} className="input" /></label>
                  <label className="block"><span className="mb-1.5 block text-sm font-medium">Phone</span><input defaultValue="+91 98765 43210" className="input" /></label>
                  <label className="block"><span className="mb-1.5 block text-sm font-medium">Email</span><input defaultValue="aarav.mehta@example.com" className="input" /></label>
                  <label className="block"><span className="mb-1.5 block text-sm font-medium">City</span><input defaultValue="Noida" className="input" /></label>
                </div>
                <Button className="mt-6" onClick={() => push({ title: "Profile updated", variant: "success" })}>Save changes</Button>
              </div>
            )}

            {tab === "addresses" && (
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Saved addresses</h2>
                  <Button size="sm" variant="secondary" icon={<Plus className="h-4 w-4" />}>Add new</Button>
                </div>
                <div className="mt-5 space-y-3">
                  {ADDRESSES.map((a) => (
                    <div key={a.id} className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.1)] p-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-4 w-4 text-[var(--color-primary-500)]" />
                        <div><p className="text-sm font-semibold text-[var(--color-ink)]">{a.label}</p><p className="text-xs text-[var(--color-ink-soft)]">{a.detail}</p></div>
                      </div>
                      <button aria-label="Delete address" className="text-[var(--color-ink-faint)] hover:text-[var(--color-coral-600)]"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "payments" && (
              <div>
                <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Payment methods</h2>
                <div className="mt-5 flex items-center justify-between rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.1)] p-4">
                  <div className="flex items-center gap-3"><CreditCard className="h-5 w-5 text-[var(--color-primary-500)]" /><span className="text-sm font-medium">UPI — aarav@okhdfc</span></div>
                  <span className="text-xs font-semibold text-[var(--color-green-600)]">Default</span>
                </div>
                <Button variant="secondary" size="sm" className="mt-4" icon={<Plus className="h-4 w-4" />}>Add payment method</Button>
              </div>
            )}

            {tab === "notifications" && (
              <div>
                <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Notification preferences</h2>
                <div className="mt-5 space-y-3">
                  {["Booking updates", "Promotions & offers", "Chat messages", "Worker arrival alerts"].map((n, i) => (
                    <label key={n} className="flex items-center justify-between rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.1)] p-4">
                      <span className="text-sm text-[var(--color-ink)]">{n}</span>
                      <input type="checkbox" defaultChecked={i !== 1} className="h-5 w-5 accent-[var(--color-primary-500)]" />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {tab === "privacy" && (
              <div>
                <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Privacy & security</h2>
                <div className="mt-5 space-y-3">
                  <label className="flex items-center justify-between rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.1)] p-4">
                    <span className="text-sm text-[var(--color-ink)]">Mask my phone number in calls</span>
                    <input type="checkbox" defaultChecked className="h-5 w-5 accent-[var(--color-primary-500)]" />
                  </label>
                  <label className="flex items-center justify-between rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.1)] p-4">
                    <span className="text-sm text-[var(--color-ink)]">Share location only during active bookings</span>
                    <input type="checkbox" defaultChecked className="h-5 w-5 accent-[var(--color-primary-500)]" />
                  </label>
                </div>
                <Divider className="my-6" />
                <Button variant="secondary">Change password</Button>
              </div>
            )}

            {tab === "app" && (
              <div>
                <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">App preferences</h2>
                <div className="mt-5 flex items-center justify-between rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.1)] p-4">
                  <span className="flex items-center gap-2.5 text-sm text-[var(--color-ink)]"><Globe className="h-4 w-4" /> Language</span>
                  <div className="flex gap-1 rounded-full bg-[color:rgba(21,32,30,0.06)] p-1">
                    <button onClick={() => setLang("en")} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${lang === "en" ? "bg-white shadow-sm" : "text-[var(--color-ink-soft)]"}`}>English</button>
                    <button onClick={() => setLang("hi")} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${lang === "hi" ? "bg-white shadow-sm" : "text-[var(--color-ink-soft)]"}`}>हिंदी</button>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between rounded-[var(--radius-md)] border border-[color:rgba(21,32,30,0.1)] p-4">
                  <span className="flex items-center gap-2.5 text-sm text-[var(--color-ink)]">{dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />} Theme</span>
                  <button onClick={toggleDark} className="relative h-7 w-12 rounded-full bg-[color:rgba(21,32,30,0.15)] transition-colors data-[on=true]:bg-[var(--color-primary-500)]" data-on={dark}>
                    <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${dark ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
      <style>{`.input { height: 3rem; width: 100%; border-radius: var(--radius-md); border: 1px solid rgba(21,32,30,0.15); padding: 0 1rem; font-size: 0.875rem; outline: none; background: var(--color-surface); color: var(--color-ink); } .input:focus { border-color: var(--color-primary-500); }`}</style>
    </Section>
  );
}
