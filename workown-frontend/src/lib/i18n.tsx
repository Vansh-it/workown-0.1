import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "hi";

const dict = {
  en: {
    "nav.home": "Home",
    "nav.browse": "Browse Services",
    "nav.how": "How It Works",
    "nav.becomeWorker": "Become a Worker",
    "nav.findWorkers": "Find Workers",
    "nav.search": "Search services or workers…",
    "nav.signin": "Sign in",
    "nav.getstarted": "Get Started",
    "nav.help": "Help",
    "nav.helpCenter": "Help Center",
    "nav.callus": "Call Us",
    "nav.chatnow": "Chat Now",
    "nav.dashboard": "Dashboard",
    "nav.messages": "Messages",
    "nav.bookings": "Bookings",
    "nav.logout": "Log out",
    "hero.eyebrow": "Verified professionals · 85+ cities",
    "hero.title1": "Skilled hands,",
    "hero.title2": "ready when you are.",
    "hero.sub": "Book trusted, background-checked workers for everyday and monthly services — with transparent pricing and live tracking.",
    "hero.cta.find": "Find Workers",
    "hero.cta.join": "Join as a Worker",
    "hero.search.placeholder": "What service do you need?",
    "section.categories": "Browse Service Categories",
    "section.categories.sub": "From a dripping tap to a full home makeover — find the right professional in seconds.",
    "section.how": "How It Works",
    "section.topworkers": "Top Rated Workers",
    "section.testimonials": "What People Say",
    "section.faq": "Frequently Asked Questions",
    "section.safety": "Safety & Verification",
    "section.stories": "Worker Stories",
    "footer.rights": "All rights reserved.",
    "footer.newsletter": "Get service tips & offers",
    "footer.newsletter.sub": "No spam — just useful updates once in a while.",
    "footer.subscribe": "Subscribe",
    "tab.home": "Home",
    "tab.search": "Search",
    "tab.bookings": "Bookings",
    "tab.messages": "Messages",
    "tab.profile": "Profile",
  },
  hi: {
    "nav.home": "होम",
    "nav.browse": "सेवाएं देखें",
    "nav.how": "यह कैसे काम करता है",
    "nav.becomeWorker": "वर्कर बनें",
    "nav.findWorkers": "वर्कर खोजें",
    "nav.search": "सेवा या वर्कर खोजें…",
    "nav.signin": "साइन इन",
    "nav.getstarted": "शुरू करें",
    "nav.help": "सहायता",
    "nav.helpCenter": "सहायता केंद्र",
    "nav.callus": "कॉल करें",
    "nav.chatnow": "चैट करें",
    "nav.dashboard": "डैशबोर्ड",
    "nav.messages": "संदेश",
    "nav.bookings": "बुकिंग",
    "nav.logout": "लॉग आउट",
    "hero.eyebrow": "सत्यापित पेशेवर · 85+ शहर",
    "hero.title1": "कुशल हाथ,",
    "hero.title2": "आपकी सेवा के लिए तैयार।",
    "hero.sub": "विश्वसनीय, पृष्ठभूमि-जांचे गए वर्कर्स को बुक करें — साफ़ कीमत और लाइव ट्रैकिंग के साथ।",
    "hero.cta.find": "वर्कर खोजें",
    "hero.cta.join": "वर्कर के रूप में जुड़ें",
    "hero.search.placeholder": "आपको कौन सी सेवा चाहिए?",
    "section.categories": "सेवा श्रेणियाँ देखें",
    "section.categories.sub": "टपकते नल से लेकर पूरे घर के नवीनीकरण तक — सेकंडों में सही पेशेवर खोजें।",
    "section.how": "यह कैसे काम करता है",
    "section.topworkers": "शीर्ष रेटेड वर्कर",
    "section.testimonials": "लोग क्या कहते हैं",
    "section.faq": "अक्सर पूछे जाने वाले प्रश्न",
    "section.safety": "सुरक्षा और सत्यापन",
    "section.stories": "वर्कर कहानियाँ",
    "footer.rights": "सर्वाधिकार सुरक्षित।",
    "footer.newsletter": "सेवा टिप्स और ऑफ़र पाएं",
    "footer.newsletter.sub": "कोई स्पैम नहीं — कभी-कभी उपयोगी अपडेट।",
    "footer.subscribe": "सब्सक्राइब करें",
    "tab.home": "होम",
    "tab.search": "खोज",
    "tab.bookings": "बुकिंग",
    "tab.messages": "संदेश",
    "tab.profile": "प्रोफ़ाइल",
  },
} as const;

type Key = keyof typeof dict.en;

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: Key) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("workown_lang") as Lang) || "en");

  useEffect(() => {
    localStorage.setItem("workown_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t: (key: Key) => dict[lang][key] ?? dict.en[key] ?? key,
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
