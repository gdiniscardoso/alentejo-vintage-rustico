import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { I18nProvider } from "@/lib/i18n";
import Fairs from "@/pages/feiras";
import Index from "@/pages/index";
import Order from "@/pages/encomendar";
import NotFound from "@/pages/not-found";
import Portfolio from "@/pages/portfolio";
import About from "@/pages/sobre";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <I18nProvider>
        <ScrollToTop />
        <SiteHeader />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/feiras" element={<Fairs />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/encomendar" element={<Order />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <SiteFooter />
      </I18nProvider>
    </ErrorBoundary>
  );
}
