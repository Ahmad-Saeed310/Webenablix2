import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AccessibilityWidget from './components/AccessibilityWidget';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import AuditSection from './components/AuditSection';
import WhyAccessibilitySection from './components/WhyAccessibilitySection';
import WidgetSection from './components/WidgetSection';
import TrustedBySection from './components/TrustedBySection';
import Footer from './components/Footer';
import { CookieConsent, AccessibilityReportModal } from './components/Modals';

// Pages
import PricingPage from './pages/PricingPage';
import ProductsPage from './pages/ProductsPage';
import IndustriesPage from './pages/IndustriesPage';
import InstallationsPage from './pages/InstallationsPage';
import WidgetPage from './pages/WidgetPage';
import AuditPage from './pages/AuditPage';
import FreeCheckerPage from './pages/FreeCheckerPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import BlogsPage from './pages/BlogsPage';
import BlogPostPage from './pages/BlogPostPage';
import AccessibilityMonitorPage from './pages/AccessibilityMonitorPage';
import ManagedAccessibilityPage from './pages/ManagedAccessibilityPage';
import ComparePage from './pages/ComparePage';
import IndustryDetailPage from './pages/IndustryDetailPage';
import InstallationDetailPage from './pages/InstallationDetailPage';
import DocsPage from './pages/DocsPage';
import AboutPage from './pages/AboutPage';
import AgencyPage from './pages/AgencyPage';

const HomePage = () => {
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AuditSection />
        <WhyAccessibilitySection />
        <WidgetSection />
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

const SimplePage = ({ title }) => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <main className="py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600">We're building something amazing. Check back soon!</p>
      </div>
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AccessibilityWidget />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/widget" element={<WidgetPage />} />
        <Route path="/products/audit" element={<AuditPage />} />
        <Route path="/products/checker" element={<FreeCheckerPage />} />
        <Route path="/products/managed" element={<ManagedAccessibilityPage />} />
        <Route path="/products/monitor" element={<AccessibilityMonitorPage />} />
        <Route path="/products/compare" element={<ComparePage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/industries/:industry" element={<IndustryDetailPage />} />
        <Route path="/installation" element={<InstallationsPage />} />
        <Route path="/installation/:platform" element={<InstallationDetailPage />} />
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
