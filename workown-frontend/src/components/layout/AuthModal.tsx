import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrench, Users, Phone, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { Sheet } from "../ui/Sheet";
import { Button } from "../ui/Button";
import { Tabs } from "../ui/Tabs";
import { useAuth, useUI, useToast } from "../../lib/appState";
import { cn } from "../../utils/cn";

type RoleChoice = "customer" | "worker";
type Step = "role" | "details" | "otp";

export function AuthModal() {
  const { authOpen, authTab, closeAuth, openAuth } = useUI();
  const { login } = useAuth();
  const { push } = useToast();
  const navigate = useNavigate();

  const [role, setRole] = useState<RoleChoice>("customer");
  const [step, setStep] = useState<Step>("role");
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  function reset() {
    setStep("role");
    setValue("");
    setOtp(["", "", "", ""]);
  }

  function handleClose() {
    closeAuth();
    reset();
  }

  function handleContinue() {
    if (step === "role") setStep("details");
    else if (step === "details") setStep("otp");
    else {
      login(role, role === "worker" ? "Suresh Kumar" : "Aarav Mehta");
      push({ title: "Welcome to WorkOwn!", description: authTab === "signup" ? "Your account has been created." : "You're signed in.", variant: "success" });
      handleClose();
      navigate(role === "worker" ? "/dashboard/worker" : "/dashboard");
    }
  }

  return (
    <Sheet open={authOpen} onClose={handleClose} title={authTab === "signin" ? "Sign in" : "Create your account"}>
      <div className="p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-[var(--color-ink)]">
            {step === "role" ? "Join WorkOwn" : step === "details" ? "Verify it's you" : "Enter OTP"}
          </h2>
        </div>

        <Tabs
          className="mb-6"
          tabs={[{ id: "signin", label: "Sign In" }, { id: "signup", label: "Sign Up" }]}
          active={authTab}
          onChange={(id) => openAuth(id as "signin" | "signup")}
        />

        {step === "role" && (
          <div className="space-y-5">
            <p className="text-sm text-[var(--color-ink-soft)]">Tell us why you're here, so we can tailor your experience.</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                onClick={() => setRole("customer")}
                className={cn(
                  "flex flex-col items-start gap-3 rounded-[var(--radius-lg)] border-2 p-5 text-left transition-all focus-ring",
                  role === "customer" ? "border-[var(--color-primary-500)] bg-[var(--color-primary-50)]" : "border-[color:rgba(21,32,30,0.1)] hover:border-[var(--color-primary-300)]"
                )}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary-500)] text-white">
                  <Users className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display font-semibold text-[var(--color-ink)]">I need a service</span>
                  <span className="mt-1 block text-xs text-[var(--color-ink-soft)]">Book trusted workers near you</span>
                </span>
              </button>
              <button
                onClick={() => setRole("worker")}
                className={cn(
                  "flex flex-col items-start gap-3 rounded-[var(--radius-lg)] border-2 p-5 text-left transition-all focus-ring",
                  role === "worker" ? "border-[var(--color-coral-500)] bg-[var(--color-coral-50)]" : "border-[color:rgba(21,32,30,0.1)] hover:border-[var(--color-coral-300)]"
                )}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-coral-500)] text-white">
                  <Wrench className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display font-semibold text-[var(--color-ink)]">I want to work</span>
                  <span className="mt-1 block text-xs text-[var(--color-ink-soft)]">Earn money with your skills</span>
                </span>
              </button>
            </div>
            <Button onClick={handleContinue} className="w-full" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
              Continue
            </Button>
          </div>
        )}

        {step === "details" && (
          <div className="space-y-5">
            <div className="inline-flex items-center gap-1 rounded-full bg-[color:rgba(21,32,30,0.06)] p-1">
              <button onClick={() => setMethod("phone")} className={cn("rounded-full px-4 py-2 text-sm font-semibold transition-colors", method === "phone" ? "bg-white shadow-sm" : "text-[var(--color-ink-soft)]")}>
                <Phone className="mr-1.5 inline h-3.5 w-3.5" /> Phone
              </button>
              <button onClick={() => setMethod("email")} className={cn("rounded-full px-4 py-2 text-sm font-semibold transition-colors", method === "email" ? "bg-white shadow-sm" : "text-[var(--color-ink-soft)]")}>
                <Mail className="mr-1.5 inline h-3.5 w-3.5" /> Email
              </button>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">{method === "phone" ? "Mobile number" : "Email address"}</span>
              <div className="flex items-center rounded-full border border-[color:rgba(21,32,30,0.15)] bg-[var(--color-canvas)] px-4 focus-within:border-[var(--color-primary-500)]">
                {method === "phone" && <span className="mr-2 text-sm font-medium text-[var(--color-ink-soft)]">+91</span>}
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  type={method === "phone" ? "tel" : "email"}
                  placeholder={method === "phone" ? "98765 43210" : "you@example.com"}
                  className="h-12 w-full bg-transparent text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink-faint)]"
                />
              </div>
            </label>
            <Button onClick={handleContinue} className="w-full" size="lg">Send OTP</Button>
            <p className="flex items-center justify-center gap-1.5 text-xs text-[var(--color-ink-faint)]">
              <ShieldCheck className="h-3.5 w-3.5" /> We never share your contact details with workers.
            </p>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-5">
            <p className="text-sm text-[var(--color-ink-soft)]">Enter the 4-digit code sent to {method === "phone" ? `+91 ${value || "98765 43210"}` : value || "your email"}.</p>
            <div className="flex justify-between gap-3">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  value={digit}
                  maxLength={1}
                  inputMode="numeric"
                  aria-label={`OTP digit ${i + 1}`}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "");
                    const next = [...otp];
                    next[i] = v;
                    setOtp(next);
                    if (v && i < 3) (document.getElementById(`otp-${i + 1}`) as HTMLInputElement | null)?.focus();
                  }}
                  id={`otp-${i}`}
                  className="h-14 w-14 rounded-[var(--radius-sm)] border border-[color:rgba(21,32,30,0.15)] text-center text-xl font-bold text-[var(--color-ink)] outline-none focus:border-[var(--color-primary-500)]"
                />
              ))}
            </div>
            <Button onClick={handleContinue} className="w-full" size="lg">Verify & Continue</Button>
            <button className="w-full text-center text-sm font-semibold text-[var(--color-primary-600)] hover:underline">Resend code</button>
          </div>
        )}
      </div>
    </Sheet>
  );
}
