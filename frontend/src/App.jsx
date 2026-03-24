import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  injectSchema,
  organizationSchema,
  homePageSchema,
  faqPageSchema,
  breadcrumbSchema,
  homePageLandingSchema,
  homePageHeroOfferSchema,
  homePageProductsSchema,
  homePageFeaturesSchema,
  homePageTrustSchema,
  homePageWhyAccessibilitySchema,
  homePageGettingStartedSchema,
  homePageCtaSchema,
} from "./utils/schemaMarkup";
import AccessibilityWidget from "./components/AccessibilityWidget";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import AuditSection from "./components/AuditSection";
import WhyAccessibilitySection from "./components/WhyAccessibilitySection";
import WidgetSection from "./components/WidgetSection";
import TrustedBySection from "./components/TrustedBySection";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import { CookieConsent, AccessibilityReportModal } from "./components/Modals";
import UnifiedSectionNav from "./components/UnifiedSectionNav";

// Pages
import PricingPage from "./pages/PricingPage";
import ProductsPage from "./pages/ProductsPage";
import IndustriesPage from "./pages/IndustriesPage";
import IndustryDetailPage from "./pages/IndustryDetailPage";
import InstallationsPage from "./pages/InstallationsPage";
import InstallationDetailPage from "./pages/InstallationDetailPage";
import WidgetPage from "./pages/WidgetPage";
import AuditPage from "./pages/AuditPage";
import FreeCheckerPage from "./pages/FreeCheckerPage";
import ManagedAccessibilityPage from "./pages/ManagedAccessibilityPage";
import AccessibilityMonitorPage from "./pages/AccessibilityMonitorPage";
import ComparePage from "./pages/ComparePage";
import DocsPage from "./pages/DocsPage";
import AboutPage from "./pages/AboutPage";
import BlogsPage from "./pages/BlogsPage";
import BlogPostPage from "./pages/BlogPostPage";
import AgencyPage from "./pages/AgencyPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";

const HomePage = () => {
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const [showReportModal, setShowReportModal] = useState(false);
  const [heroScanUrl, setHeroScanUrl] = useState("");

  // Inject page-level schemas for SEO
  useEffect(() => {
    // Basic schemas
    const cleanupHome = injectSchema(homePageSchema, "homepage-schema");
    const cleanupFaq = injectSchema(faqPageSchema, "faq-schema");
    const cleanupBreadcrumb = injectSchema(
      breadcrumbSchema,
      "breadcrumb-schema",
    );

    // Comprehensive homepage schemas
    const cleanupLanding = injectSchema(
      homePageLandingSchema,
      "homepage-landing-schema",
    );
    const cleanupOffer = injectSchema(
      homePageHeroOfferSchema,
      "homepage-offer-schema",
    );
    const cleanupProducts = injectSchema(
      homePageProductsSchema,
      "homepage-products-schema",
    );
    const cleanupFeatures = injectSchema(
      homePageFeaturesSchema,
      "homepage-features-schema",
    );
    const cleanupTrust = injectSchema(
      homePageTrustSchema,
      "homepage-trust-schema",
    );
    const cleanupWhy = injectSchema(
      homePageWhyAccessibilitySchema,
      "homepage-why-schema",
    );
    const cleanupGetting = injectSchema(
      homePageGettingStartedSchema,
      "homepage-getting-started-schema",
    );
    const cleanupCta = injectSchema(homePageCtaSchema, "homepage-cta-schema");

    return () => {
      cleanupHome();
      cleanupFaq();
      cleanupBreadcrumb();
      cleanupLanding();
      cleanupOffer();
      cleanupProducts();
      cleanupFeatures();
      cleanupTrust();
      cleanupWhy();
      cleanupGetting();
      cleanupCta();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection
          onScanRequest={(url) => setHeroScanUrl(url + "?t=" + Date.now())}
        />
        <FeaturesSection />
        <AuditSection externalUrl={heroScanUrl} />
        <WhyAccessibilitySection />
        <WidgetSection />
        <UnifiedSectionNav />
        <FaqSection />
        <TrustedBySection />
      </main>
      <Footer />

      {showCookieConsent && (
        <CookieConsent onClose={() => setShowCookieConsent(false)} />
      )}
      <AccessibilityReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
    </div>
  );
};

function App() {
  // Inject main organization schema on app init
  useEffect(() => {
    const cleanup = injectSchema(organizationSchema, "organization-schema");
    return cleanup;
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AccessibilityWidget />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/widget" element={<WidgetPage />} />
        <Route path="/products/audit" element={<AuditPage />} />
        <Route path="/products/checker" element={<FreeCheckerPage />} />
        <Route
          path="/products/managed"
          element={<ManagedAccessibilityPage />}
        />
        <Route
          path="/products/monitor"
          element={<AccessibilityMonitorPage />}
        />
        <Route path="/products/compare" element={<ComparePage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/industries/:industry" element={<IndustryDetailPage />} />
        <Route path="/installation" element={<InstallationsPage />} />
        <Route
          path="/installation/:platform"
          element={<InstallationDetailPage />}
        />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<BlogPostPage />} />
        <Route path="/agency" element={<AgencyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
