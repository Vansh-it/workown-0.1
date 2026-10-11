import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { I18nProvider } from "./lib/i18n";
import { AuthProvider, ToastProvider, UIProvider, useAuth } from "./lib/appState";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { AuthModal } from "./components/layout/AuthModal";
import { SupportLauncher } from "./components/layout/SupportLauncher";
import { BottomTabBar } from "./components/layout/BottomTabBar";

import Home from "./pages/Home";
import BrowseServices from "./pages/BrowseServices";
import CategoryPage from "./pages/CategoryPage";
import FindWorkers from "./pages/FindWorkers";
import WorkerProfile from "./pages/WorkerProfile";
import BookingFlow from "./pages/BookingFlow";
import Tracking from "./pages/Tracking";
import Payments from "./pages/Payments";
import CustomerDashboard from "./pages/CustomerDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import Messages from "./pages/Messages";
import BecomeWorker from "./pages/BecomeWorker";
import WorkerRegistration from "./pages/WorkerRegistration";
import HowItWorks from "./pages/HowItWorks";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import About from "./pages/About";
import TrustSafety from "./pages/TrustSafety";
import Legal from "./pages/Legal";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  const { isAuthed } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-canvas)]">
      <Header />
      <main className={`flex-1 ${isAuthed ? "pb-20 sm:pb-0" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse-services" element={<BrowseServices />} />
          <Route path="/services/:slug" element={<CategoryPage />} />
          <Route path="/find-workers" element={<FindWorkers />} />
          <Route path="/workers/:id" element={<WorkerProfile />} />
          <Route path="/book/:workerId" element={<BookingFlow />} />
          <Route path="/tracking/:bookingId" element={<Tracking />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/dashboard/worker" element={<WorkerDashboard />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/become-a-worker" element={<BecomeWorker />} />
          <Route path="/register-worker" element={<WorkerRegistration />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/support" element={<Support />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/about" element={<About />} />
          <Route path="/trust-safety" element={<TrustSafety />} />
          <Route path="/legal/:type" element={<Legal />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <AuthModal />
      <SupportLauncher />
      <BottomTabBar />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <AuthProvider>
          <ToastProvider>
            <UIProvider>
              <ScrollToTop />
              <Layout />
            </UIProvider>
          </ToastProvider>
        </AuthProvider>
      </I18nProvider>
    </BrowserRouter>
  );
}
